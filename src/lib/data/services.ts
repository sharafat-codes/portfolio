import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Store,
  ShoppingCart,
  Settings2,
  Plug,
  CreditCard,
  Smartphone,
} from "lucide-react";

export type Service = {
  index: string;
  title: string;
  description: string;
  outcomes: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    index: "01",
    title: "SaaS Product Development",
    description:
      "Multi-tenant SaaS built to scale — auth, billing, dashboards, and the architecture to grow without rewrites.",
    outcomes: ["Subscription & billing", "Role-based access", "Analytics dashboards"],
    icon: Boxes,
  },
  {
    index: "02",
    title: "Marketplace Development",
    description:
      "Two-sided marketplaces with listings, profiles, discovery, and trust — on web and mobile from one backend.",
    outcomes: ["Listings & discovery", "Buyer/seller flows", "Web + mobile clients"],
    icon: Store,
  },
  {
    index: "03",
    title: "E-commerce Development",
    description:
      "Storefronts and checkout that convert — secure payments, catalog management, and reliable fulfillment.",
    outcomes: ["Secure checkout", "Catalog management", "Order fulfillment"],
    icon: ShoppingCart,
  },
  {
    index: "04",
    title: "Custom Business Software",
    description:
      "Internal tools and vertical software that replace spreadsheets and manual work with systems people trust.",
    outcomes: ["Workflow automation", "Operations dashboards", "Tailored data models"],
    icon: Settings2,
  },
  {
    index: "05",
    title: "API Development & Integrations",
    description:
      "Clean, documented APIs and third-party integrations that connect your product to the tools it depends on.",
    outcomes: ["API-first design", "Third-party sync", "Webhooks & events"],
    icon: Plug,
  },
  {
    index: "06",
    title: "Payment Gateway Integration",
    description:
      "Stripe, PayPal, Paystack, Flutterwave and more — wired in with idempotent, reconciled, audit-ready flows.",
    outcomes: ["Checkout & subscriptions", "Webhook reconciliation", "Multi-gateway support"],
    icon: CreditCard,
  },
  {
    index: "07",
    title: "Mobile Application Development",
    description:
      "React Native apps for iOS and Android that share a backend with your web product and ship as one team.",
    outcomes: ["iOS + Android", "Shared backend", "Native navigation"],
    icon: Smartphone,
  },
];
