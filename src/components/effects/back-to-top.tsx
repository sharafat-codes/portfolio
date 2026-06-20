"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 700);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[120] grid h-12 w-12 place-items-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur card-elevated hover:text-primary"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
