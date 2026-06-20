"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A subtle trailing accent ring that augments (never replaces) the native
 * cursor. Only renders on fine-pointer, motion-friendly devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as Element | null;
      setActive(
        Boolean(target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor]")),
      );
    };
    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[400] hidden lg:block"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="rounded-full border"
        style={{ borderColor: "var(--signal)", translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          opacity: active ? 0.9 : 0.45,
          backgroundColor: active ? "var(--signal-glow)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
}
