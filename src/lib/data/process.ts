import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Network,
  Palette,
  Server,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery & Planning",
    description:
      "I learn the business, the users, and the constraints — then turn fuzzy goals into a concrete, prioritized scope.",
    deliverables: ["Requirements", "Scope & milestones", "Success metrics"],
    icon: Compass,
  },
  {
    index: "02",
    title: "System Architecture",
    description:
      "Data models, API contracts, and infrastructure decided up front so the build scales instead of getting rewritten.",
    deliverables: ["Data model", "API design", "Tech decisions"],
    icon: Network,
  },
  {
    index: "03",
    title: "UI / UX Development",
    description:
      "Interfaces designed and built as real components — accessible, responsive, and tuned for the people using them.",
    deliverables: ["Component system", "Responsive UI", "Interaction polish"],
    icon: Palette,
  },
  {
    index: "04",
    title: "Backend Development",
    description:
      "Business logic, integrations, and payments implemented with validation, authorization, and an audit trail.",
    deliverables: ["Domain logic", "Integrations", "Secure APIs"],
    icon: Server,
  },
  {
    index: "05",
    title: "Testing & Optimization",
    description:
      "Edge cases, performance, and security hardened before launch — so it holds up with real users and real data.",
    deliverables: ["Edge-case testing", "Performance tuning", "Security hardening"],
    icon: ShieldCheck,
  },
  {
    index: "06",
    title: "Deployment & Maintenance",
    description:
      "Shipped to production with monitoring and a clear path for iteration — plus ongoing support as you grow.",
    deliverables: ["CI/CD deploy", "Monitoring", "Ongoing support"],
    icon: Rocket,
  },
];
