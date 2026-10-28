"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { BadgePercent, House, MapPin, Star, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Counter({ to, decimals = 0, prefix = "" }: { to: number; decimals?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
    </span>
  );
}

export function StatsStrip({ homes, towns, rating }: { homes: number; towns: number; rating: number }) {
  const stats: { icon: LucideIcon; value: React.ReactNode; label: string }[] = [
    { icon: House, value: <Counter to={homes} />, label: "Handpicked homes" },
    { icon: Star, value: <Counter to={rating} decimals={2} />, label: "Average guest rating" },
    { icon: MapPin, value: <Counter to={towns} />, label: "Berkshires towns" },
    { icon: BadgePercent, value: <Counter to={0} prefix="$" />, label: "Booking fees, ever" },
  ];

  return (
    <section aria-label="At a glance" className="border-b border-stone bg-cream">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-4 py-8 sm:py-10 lg:justify-center",
              i % 2 === 1 && "pl-4 sm:pl-6",
              i > 0 && "lg:border-l lg:border-stone lg:pl-6",
              i > 1 && "border-t border-stone lg:border-t-0",
            )}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-cedar shadow-sm">
              <Icon className="size-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-display text-3xl leading-none font-light text-pine sm:text-4xl">{value}</p>
              <p className="mt-1.5 text-xs tracking-wide text-moss">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
