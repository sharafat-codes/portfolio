export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  /** initials shown in the avatar */
  initials: string;
  accent: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sharafat took a vague idea and shipped a production SaaS that our partners actually log into every day. The automation alone removed hours of manual work each week.",
    name: "Project Lead",
    role: "Product Owner",
    company: "Quizell",
    rating: 5,
    initials: "QZ",
    accent: "#15c9a3",
  },
  {
    quote:
      "Payments are the part everyone is afraid of. He made our Stripe flow idempotent and reliable, and we stopped worrying about orders falling through the cracks.",
    name: "Founder",
    role: "Founder",
    company: "SecureGrades",
    rating: 5,
    initials: "SG",
    accent: "#7c6cf6",
  },
  {
    quote:
      "One backend, a web app, and a React Native app that all stay in sync. The architecture decisions he made early saved us from a painful rewrite later.",
    name: "Marketplace Lead",
    role: "Technical Lead",
    company: "Empali",
    rating: 5,
    initials: "EM",
    accent: "#34b3f1",
  },
  {
    quote:
      "Clear communication, sensible architecture, and code that's easy to extend. He thinks like a product engineer, not just someone closing tickets.",
    name: "Engineering Partner",
    role: "Engineering Manager",
    company: "Partner Platform",
    rating: 5,
    initials: "PP",
    accent: "#f0a020",
  },
];
