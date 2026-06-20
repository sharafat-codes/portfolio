---
title: "Idempotent Payment Webhooks: Getting Fulfillment Right"
description: "Card payments retry, fire out of order, and deliver duplicates. Here's the pattern I use to make Stripe fulfillment reliable and exactly-once."
date: "2026-05-28"
category: "Payments"
tags: ["Stripe", "Webhooks", "Architecture", "Laravel"]
author: "Sharafat Ali"
featured: true
accent: "#15c9a3"
---

Payments are where bugs cost real money. The naive version — "charge the card, then grant access in the same request" — falls apart the moment the network blips. The card succeeds, your response times out, the customer retries, and now they've paid twice or received nothing. The fix is to treat the **webhook as the source of truth** and make fulfillment idempotent.

## Why the redirect can't be trusted

After Stripe Checkout, the browser is redirected back to your success URL. It's tempting to fulfill the order there. Don't. The user can close the tab, lose connection, or never load that page — and the payment still went through. Worse, the success page can fire multiple times.

The webhook, by contrast, is delivered by Stripe's infrastructure with retries until you acknowledge it. It is the only signal guaranteed to arrive.

## The exactly-once pattern

Every webhook handler must answer one question before doing any work: *have I already processed this event?* Store the event ID and short-circuit if you've seen it.

```php
public function handle(Request $request): Response
{
    $event = $this->verifySignature($request); // reject forgeries first

    // Idempotency guard — unique index on stripe_event_id
    $already = WebhookEvent::firstOrCreate(
        ['stripe_event_id' => $event->id],
        ['type' => $event->type]
    );

    if (! $already->wasRecentlyCreated) {
        return response('Already processed', 200);
    }

    match ($event->type) {
        'checkout.session.completed' => $this->fulfill($event),
        default => null,
    };

    return response('OK', 200);
}
```

The unique index on `stripe_event_id` does the heavy lifting: even if two duplicate webhooks race each other, only one `INSERT` wins. The loser sees `wasRecentlyCreated === false` and exits.

## Fulfillment must also be idempotent

The guard above protects against duplicate *events*. But you should assume fulfillment itself can run twice — defense in depth. Grant entitlements with an upsert keyed on the order, never a blind insert:

```php
private function fulfill(Event $event): void
{
    $session = $event->data->object;

    Entitlement::updateOrCreate(
        ['order_id' => $session->metadata->order_id],
        ['status' => 'granted', 'granted_at' => now()]
    );
}
```

Now "grant access" is a no-op the second time. The customer can never be double-charged-access, and you can replay any event safely during an incident.

## Verify the signature, always

Before any of this, reject requests that aren't really from Stripe. A webhook endpoint is a public URL; without signature verification, anyone can POST a fake `payment succeeded` event and walk away with your product.

```php
$event = Webhook::constructEvent(
    $request->getContent(),
    $request->header('Stripe-Signature'),
    config('services.stripe.webhook_secret')
);
```

## The checklist

- Fulfill on the **webhook**, never the redirect.
- **Verify the signature** before doing anything.
- Guard on a **unique event ID** so duplicates short-circuit.
- Make fulfillment an **upsert**, not an insert.
- Return **2xx quickly** and push slow work to a queue, so Stripe doesn't retry on timeout.

Get these five right and payments stop being the scary part of the system. They become the boring, reliable part — which is exactly what you want when money is involved.
