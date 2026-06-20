"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easing },
  },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: { duration: 0.7, ease: easing, delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container — children should be <RevealItem> */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: RevealProps & { stagger?: number }) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag className={cn(className)} variants={variants}>
      {children}
    </MotionTag>
  );
}
