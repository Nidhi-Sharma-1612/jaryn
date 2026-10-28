"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/lib/types/hostaway";
import { cn } from "@/lib/utils";

const INITIAL = 4;

export function PropertyReviews({
  reviews,
  reviewCount,
  rating,
}: {
  reviews: Review[];
  reviewCount: number;
  rating?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? reviews : reviews.slice(0, INITIAL);

  return (
    <div>
      <div className="flex items-center gap-4">
        {rating && <span className="font-display text-5xl font-light text-pine">{rating.toFixed(2)}</span>}
        <div>
          <Stars value={rating ?? 5} />
          <p className="mt-1 text-sm text-moss">
            {reviewCount.toLocaleString("en-US")} {reviewCount === 1 ? "review" : "reviews"} from past guests
          </p>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {shown.map((r) => (
          <li key={r.id} className="flex flex-col rounded-2xl border border-stone bg-white p-6">
            <Stars value={r.rating / 2} small />
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/80">&ldquo;{r.publicReview}&rdquo;</p>
            <p className="mt-4 flex items-center gap-3 text-sm font-medium text-ink">
              <span className="grid size-8 place-items-center rounded-full bg-cream text-xs text-pine">
                {r.guestName.charAt(0).toUpperCase()}
              </span>
              {r.guestName}
            </p>
          </li>
        ))}
      </ul>

      {reviews.length > INITIAL && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium transition hover:border-pine"
        >
          {expanded ? "Show fewer reviews" : `Show ${reviews.length - INITIAL} more reviews`}
        </button>
      )}
    </div>
  );
}

function Stars({ value, small = false }: { value: number; small?: boolean }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(small ? "size-3.5" : "size-4", i < Math.round(value) ? "fill-cedar text-cedar" : "fill-stone text-stone")}
        />
      ))}
    </div>
  );
}
