"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/**
 * Fades content up as it scrolls into view.
 * Server HTML is always visible (no blank sections before JS loads or if it fails);
 * after hydration, only blocks still below the fold are hidden, then revealed on scroll.
 */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState<"shown" | "hidden">("shown");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setState("hidden");
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={state}
      variants={{
        hidden: { opacity: 0, y, transition: { duration: 0 } },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      onViewportEnter={() => setState("shown")}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Grid wrapper kept for layout; items reveal themselves. */
export function Stagger({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

/** Pass the item's index for a short cascade across a row. */
export function StaggerItem({ index = 0, ...props }: RevealProps & { index?: number }) {
  return <Reveal delay={(index % 3) * 0.08} y={20} {...props} />;
}
