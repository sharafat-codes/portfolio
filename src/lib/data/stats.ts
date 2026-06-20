export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
};

export const stats: Stat[] = [
  {
    value: 2,
    suffix: "+",
    label: "Years building",
    sublabel: "Production software used by real businesses",
  },
  {
    value: 5,
    label: "Flagship platforms",
    sublabel: "SaaS, marketplaces, e-commerce & AI products",
  },
  {
    value: 15,
    suffix: "+",
    label: "Technologies",
    sublabel: "Across backend, frontend, mobile & data",
  },
  {
    value: 6,
    suffix: "+",
    label: "Industries served",
    sublabel: "EdTech, commerce, AI, operations & more",
  },
];
