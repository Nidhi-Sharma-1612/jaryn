"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

/**
 * Phones only: keeps price and a booking action in reach while reading,
 * and hides itself once the booking widget is on screen.
 */
export function MobileBookingBar({ price, rating, targetId }: { price: number; rating: number; targetId: string }) {
  const [targetVisible, setTargetVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setTargetVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <AnimatePresence>
      {!targetVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-cream-50/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p>
                <span className="font-display text-2xl text-pine">{formatCurrency(price)}</span>
                <span className="text-sm text-moss"> / night</span>
              </p>
              <p className="flex items-center gap-1 text-xs text-moss">
                <Star className="size-3 fill-cedar text-cedar" /> {rating.toFixed(2)} · No booking fees
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="h-12 rounded-full bg-cedar px-6 text-sm font-medium text-cream shadow-lg shadow-cedar/25"
            >
              Check dates
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
