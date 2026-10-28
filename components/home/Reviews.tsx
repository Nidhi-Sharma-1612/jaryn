"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import type { ReviewWithHome } from "@/lib/services/reviews";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .replace(/^The /, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function Reviews({
  reviews,
  rating,
  count,
}: {
  reviews: ReviewWithHome[];
  rating: number;
  count: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("figure");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 20), behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-cedar">Guest reviews</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-pine sm:text-5xl">
              Stays guests <em className="italic">write home about</em>
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <span className="font-display text-5xl font-light text-pine">{rating.toFixed(2)}</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-cedar text-cedar" />
                  ))}
                </div>
                <p className="mt-1 text-xs text-moss">
                  From {count.toLocaleString("en-US")} guest reviews across our homes
                </p>
              </div>
            </div>
          </Reveal>

          <div className="hidden gap-2 md:flex">
            <ArrowButton label="Previous reviews" disabled={edges.start} onClick={() => scroll(-1)}>
              <ChevronLeft className="size-5" />
            </ArrowButton>
            <ArrowButton label="Next reviews" disabled={edges.end} onClick={() => scroll(1)}>
              <ChevronRight className="size-5" />
            </ArrowButton>
          </div>
        </div>
      </div>

      {/* Track bleeds to the right edge so the next card peeks in, hinting that it scrolls. */}
      <div
        ref={track}
        onScroll={update}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [padding-inline:max(1rem,calc((100vw_-_80rem)/2_+_2rem))] [scroll-padding-inline:max(1rem,calc((100vw_-_80rem)/2_+_2rem))]"
      >
        {reviews.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 0.08} className="snap-start">
            <figure className="flex h-full w-[85vw] max-w-[400px] flex-col rounded-3xl border border-stone bg-white p-7 sm:w-[400px]">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-cedar text-cedar" />
                  ))}
                </div>
                <Quote className="size-7 text-cedar/25" strokeWidth={1.25} />
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg leading-snug font-light text-pine">
                “{r.publicReview}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-stone pt-5">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-full text-xs font-semibold",
                    i % 2 ? "bg-cedar/15 text-cedar-600" : "bg-pine/10 text-pine",
                  )}
                >
                  {initials(r.guestName)}
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-ink">{r.guestName}</span>
                  <Link href={`/properties/${r.listingId}`} className="text-xs text-moss underline-offset-2 hover:text-pine hover:underline">
                    Stayed at {r.homeTitle}
                  </Link>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full border border-pine/20 text-pine transition hover:bg-pine hover:text-cream disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
