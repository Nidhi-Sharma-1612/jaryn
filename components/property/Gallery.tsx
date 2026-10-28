"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid2x2, X } from "lucide-react";
import type { ListingImage } from "@/lib/types/hostaway";
import { cn } from "@/lib/utils";

export function Gallery({ images, title }: { images: ListingImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const preview = images.slice(0, 5);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      {/* Phones: swipeable, full-bleed carousel. */}
      <div className="relative -mx-4 sm:mx-0 md:hidden">
        <div
          onScroll={(e) => {
            const el = e.currentTarget;
            setSlide(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex aspect-4/3 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:rounded-3xl"
        >
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setOpen(i)}
              className="relative h-full w-full shrink-0 snap-center bg-stone"
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.caption || `${title} photo ${i + 1}`}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : i < 3 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-cream tabular-nums backdrop-blur">
          {slide + 1} / {images.length}
        </span>
      </div>

      <div className="relative hidden h-[60vh] max-h-[620px] min-h-[380px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl md:grid">
        {preview.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setOpen(i)}
            className={cn("group relative overflow-hidden bg-stone", i === 0 && "col-span-2 row-span-2")}
            aria-label={`Open photo ${i + 1}`}
          >
            <Image
              src={img.url}
              alt={img.caption || `${title} photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes={i === 0 ? "50vw" : "25vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-cream-50/95 px-4 py-2 text-sm font-medium text-pine shadow-lg backdrop-blur"
        >
          <Grid2x2 className="size-4" /> All {images.length} photos
        </button>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-pine-900/97 text-cream"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} photos`}
          >
            <div className="flex items-center justify-between p-4 sm:p-6">
              <p className="text-sm text-cream/70 tabular-nums">
                {open + 1} / {images.length}
              </p>
              <button type="button" onClick={close} aria-label="Close gallery" className="grid size-10 place-items-center rounded-full hover:bg-cream/10">
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 mx-4 sm:mx-20"
                >
                  <Image src={images[open].url} alt={images[open].caption || title} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <LightboxArrow side="left" onClick={() => step(-1)} />
              <LightboxArrow side="right" onClick={() => step(1)} />
            </div>
            <p className="min-h-16 px-6 py-5 text-center text-sm text-cream/75">{images[open].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LightboxArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={cn(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream/10 backdrop-blur hover:bg-cream/20",
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
