"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bath, BedDouble, ChevronLeft, ChevronRight, MapPin, Star, Users } from "lucide-react";
import type { ListingSummary } from "@/lib/types/hostaway";
import { cn, formatCurrency, plural, splitListingName, toFiveStar } from "@/lib/utils";

export function PropertyCard({
  listing,
  href,
  nights,
  priority = false,
}: {
  listing: ListingSummary;
  /** When the guest has picked dates, show the stay total (before fees and taxes). */
  nights?: number;
  /** Defaults to the property page; pass one with trip params to pre-fill booking. */
  href?: string;
  priority?: boolean;
}) {
  const { title, highlights } = splitListingName(listing.name);
  const images = listing.listingImages.slice(0, 5);
  const [index, setIndex] = useState(0);

  const step = (e: React.MouseEvent, dir: 1 | -1) => {
    e.preventDefault();
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <Link href={href ?? `/properties/${listing.id}`} className="group block">
      <div className="relative aspect-10/9 overflow-hidden rounded-2xl bg-stone">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index].url}
              alt={images[index].caption || title}
              fill
              priority={priority && index === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-pine backdrop-blur">
          <Star className="size-3.5 fill-cedar text-cedar" />
          {toFiveStar(listing.averageReviewRating).toFixed(2)}
        </div>

        {images.length > 1 && (
          <>
            <CarouselButton side="left" onClick={(e) => step(e, -1)} />
            <CarouselButton side="right" onClick={(e) => step(e, 1)} />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
              {images.map((img, i) => (
                <span
                  key={img.url}
                  className={cn(
                    "h-1.5 rounded-full bg-cream transition-all duration-300",
                    i === index ? "w-5" : "w-1.5 opacity-60",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-xs tracking-wide text-moss">
            <MapPin className="size-3.5" /> {listing.city}, {listing.state}
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight font-light text-pine">{title}</h3>
        </div>
        {nights ? (
          <p className="shrink-0 pt-5 text-right text-sm text-moss">
            <span className="font-semibold text-ink">{formatCurrency(listing.price * nights)}</span>
            <span className="block text-xs">
              {plural(nights, "night")} · {formatCurrency(listing.price)}/night
            </span>
          </p>
        ) : (
          <p className="shrink-0 pt-5 text-right text-sm text-moss">
            from <span className="font-semibold text-ink">{formatCurrency(listing.price)}</span>
            <span className="block text-xs">per night</span>
          </p>
        )}
      </div>

      {highlights.length > 0 && (
        <p className="mt-1 truncate text-sm text-moss">{highlights.join(" · ")}</p>
      )}

      <div className="mt-3 flex items-center gap-4 border-t border-stone pt-3 text-xs text-ink/70">
        <Spec icon={Users} label={plural(listing.personCapacity, "guest")} />
        <Spec icon={BedDouble} label={plural(listing.bedroomsNumber, "bedroom")} />
        <Spec icon={Bath} label={plural(listing.bathroomsNumber, "bath")} />
      </div>
    </Link>
  );
}

function Spec({ icon: Icon, label }: { icon: typeof Users; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="size-4 text-sage" strokeWidth={1.5} /> {label}
    </span>
  );
}

function CarouselButton({ side, onClick }: { side: "left" | "right"; onClick: (e: React.MouseEvent) => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={cn(
        "absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-pine opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
