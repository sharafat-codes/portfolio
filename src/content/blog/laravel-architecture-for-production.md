---
title: "Laravel Architecture That Survives Production"
description: "Controllers, services, actions, and where business logic actually belongs. A pragmatic structure for Laravel apps that grow."
date: "2026-05-12"
category: "Backend"
tags: ["Laravel", "PHP", "Architecture", "Clean Code"]
author: "Sharafat Ali"
featured: true
accent: "#7c6cf6"
---

Most Laravel apps don't fail because of the framework. They fail because business logic ends up smeared across fat controllers, models, and event listeners until nobody can answer "where does *this* happen?" Here's the structure I reach for to keep that from happening.

## Keep controllers thin

A controller has one job: translate an HTTP request into a call to your domain, then translate the result back into a response. It should not contain business rules.

```php
public function store(CreateOrderRequest $request, CreateOrder $createOrder)
{
    $order = $createOrder->handle(
        OrderData::from($request->validated())
    );

    return redirect()->route('orders.show', $order);
}
```

Validation lives in a `FormRequest`. The actual work lives in `CreateOrder`. The controller just wires them together.

## Single-purpose actions

An **action** is a class that does one thing. `CreateOrder`, `RefundPayment`, `PublishQuiz`. They're trivial to find, trivial to test, and reusable from controllers, jobs, and commands alike.

```php
class CreateOrder
{
    public function __construct(private PaymentGateway $gateway) {}

    public function handle(OrderData $data): Order
    {
        return DB::transaction(function () use ($data) {
            $order = Order::create($data->toModel());
            $this->gateway->charge($order);
            return $order;
        });
    }
}
```

Wrapping the side effects in a transaction means a failed charge rolls back the order — no orphaned records.

## Let policies own authorization

Authorization is a business rule, not a UI concern. Hiding a button is not security. Put the rule in a policy and enforce it on the server:

```php
public function update(User $user, Order $order): bool
{
    return $user->id === $order->user_id || $user->isAdmin();
}
```

Now `$this->authorize('update', $order)` guarantees isolation regardless of what the frontend does.

## Push slow work onto queues

Sending email, generating invoices, calling third-party APIs — none of that belongs in the request cycle. Queue it. The user gets a fast response, and retries handle transient failures for free.

## The layered shape

- **FormRequest** — validation and shape.
- **Controller** — HTTP in, HTTP out. Nothing else.
- **Action / Service** — business logic, wrapped in transactions.
- **Policy** — who's allowed.
- **Job** — anything slow or external.
- **Model** — data and relationships, not workflows.

None of this is exotic. It's just discipline about *where* each kind of logic lives. That discipline is the difference between a Laravel app you can still extend at year two and one you're afraid to touch.
