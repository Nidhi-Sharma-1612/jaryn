"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  Flower2,
  Leaf,
  MapPin,
  MountainSnow,
  Palette,
  Sailboat,
  Snowflake,
  Star,
  Sun,
  TreePine,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { GuideCategory, Season } from "@/lib/data/guide";
import { cn, formatCurrency } from "@/lib/utils";

export interface NearbyHome {
  id: number;
  title: string;
  city: string;
  price: number;
  rating: number;
  image: string;
}

export interface GuidePlace {
  name: string;
  town: string;
  homesTowns: string[];
  seasonLabel: string;
  seasons: Season[];
  category: GuideCategory;
  blurb: string;
  nearby: NearbyHome[];
}

const placeIcons: Record<string, LucideIcon> = {
  Tanglewood: AudioLines,
  "Norman Rockwell Museum": Palette,
  "Lake Garfield": Sailboat,
  "Beartown State Forest": TreePine,
  "Catamount & Jiminy Peak": MountainSnow,
};
const seasonIcons: Record<Season, LucideIcon> = { summer: Sun, fall: Leaf, winter: Snowflake, spring: Flower2 };

export function GuideExplorer({
  places,
  categories,
  seasons,
}: {
  places: GuidePlace[];
  categories: { key: GuideCategory; title: string }[];
  seasons: { key: Season; title: string; months: string; body: string }[];
}) {
  const [category, setCategory] = useState<GuideCategory | "all">("all");
  const [season, setSeason] = useState<Season | "all">("all");
  const listRef = useRef<HTMLDivElement>(null);

  const visible = places.filter(
    (p) => (category === "all" || p.category === category) && (season === "all" || p.seasons.includes(season)),
  );
  const categoryTitle = (key: GuideCategory) => categories.find((c) => c.key === key)?.title ?? "";

  const pickSeason = (key: Season) => {
    setSeason((cur) => (cur === key ? "all" : key));
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Plan by season */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-cedar">Plan by season</p>
              <h2 className="mt-3 font-display text-3xl font-light text-pine sm:text-4xl">
                Every season has <em className="italic">its own Berkshires</em>
              </h2>
            </div>
            <p className="text-sm text-moss">Pick a season to see what&apos;s on.</p>
          </div>
          <div className="-mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {seasons.map((s) => {
              const Icon = seasonIcons[s.key];
              const active = season === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => pickSeason(s.key)}
                  aria-pressed={active}
                  className={cn(
                    "group flex w-[75vw] max-w-[300px] shrink-0 snap-start flex-col rounded-3xl border p-6 text-left transition sm:w-auto sm:max-w-none",
                    active
                      ? "border-pine bg-pine text-cream shadow-xl shadow-pine/20"
                      : "border-stone bg-white hover:-translate-y-0.5 hover:border-pine/30 hover:shadow-lg hover:shadow-pine/5",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-2xl",
                        active ? "bg-cream/15 text-cedar-300" : "bg-cream text-cedar",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className={cn("text-xs", active ? "text-cream/70" : "text-moss")}>{s.months}</span>
                  </div>
                  <p className={cn("mt-5 font-display text-2xl font-light", active ? "text-cream" : "text-pine")}>
                    {s.title}
                  </p>
                  <p className={cn("mt-1 text-sm leading-relaxed", active ? "text-cream/80" : "text-moss")}>{s.body}</p>
                  <span
                    className={cn(
                      "mt-4 inline-flex items-center gap-1 text-xs font-medium",
                      active ? "text-cedar-300" : "text-pine",
                    )}
                  >
                    {active ? "Showing this season" : "See what's on"} <ArrowRight className="size-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky filters */}
      <div ref={listRef} className="sticky top-16 z-20 scroll-mt-16 border-y border-stone bg-cream-50/90 py-3 backdrop-blur-xl">
        <div className="container-x flex items-center gap-3">
          <div className="-mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
              Everything
            </FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
                {c.title}
              </FilterChip>
            ))}
            <span aria-hidden className="mx-1 h-6 w-px shrink-0 self-center bg-stone" />
            {seasons.map((s) => (
              <FilterChip
                key={s.key}
                active={season === s.key}
                onClick={() => setSeason((cur) => (cur === s.key ? "all" : s.key))}
              >
                {s.title}
              </FilterChip>
            ))}
          </div>
          <p className="hidden shrink-0 text-sm text-moss sm:block" aria-live="polite">
            <span className="font-medium text-ink">{visible.length}</span> {visible.length === 1 ? "place" : "places"}
          </p>
        </div>
      </div>

      {/* Places */}
      <section className="pt-10 pb-24 sm:pb-28">
        <div className="container-x space-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((place) => {
              const Icon = placeIcons[place.name] ?? (place.category === "food" ? UtensilsCrossed : MapPin);
              const townLink = `/properties?town=${encodeURIComponent(place.homesTowns[0])}`;
              return (
                <motion.article
                  key={place.name}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-6 rounded-3xl border border-stone bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="grid size-11 place-items-center rounded-2xl bg-cream text-cedar">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-medium text-moss">
                        {categoryTitle(place.category)}
                      </span>
                      <span className="rounded-full bg-cedar/10 px-3 py-1 text-[11px] font-medium text-cedar-600">
                        {place.seasonLabel}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl leading-tight font-light text-pine">{place.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-moss">
                      <MapPin className="size-4" /> {place.town}
                    </p>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/75">{place.blurb}</p>
                    <Link
                      href={townLink}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-pine underline-offset-4 hover:text-cedar hover:underline lg:mt-auto lg:pt-6"
                    >
                      All homes in {place.homesTowns[0]} <ArrowRight className="size-4" />
                    </Link>
                  </div>

                  {place.nearby.length > 0 && (
                    <div className="rounded-2xl bg-cream p-4 sm:p-5">
                      <p className="text-[11px] font-medium tracking-[0.2em] text-moss uppercase">Stay nearby</p>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {place.nearby.map((home) => (
                          <Link key={home.id} href={`/properties/${home.id}`} className="group block min-w-0">
                            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-stone">
                              <Image
                                src={home.image}
                                alt={home.title}
                                fill
                                sizes="(min-width: 1024px) 220px, 45vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-0.5 text-[11px] font-medium text-pine">
                                <Star className="size-3 fill-cedar text-cedar" /> {home.rating.toFixed(2)}
                              </span>
                            </div>
                            <p className="mt-2 line-clamp-2 font-display text-base leading-tight [overflow-wrap:anywhere] text-pine group-hover:text-cedar sm:text-lg">
                              {home.title}
                            </p>
                            <p className="text-xs text-moss">
                              {home.city} · from <span className="font-medium text-ink">{formatCurrency(home.price)}</span>
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="rounded-3xl border border-dashed border-stone px-6 py-16 text-center">
              <p className="font-display text-2xl font-light text-pine">Nothing in our guide matches that combination</p>
              <p className="mt-2 text-sm text-moss">Try another season, or ask us for ideas for your dates.</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setSeason("all");
                }}
                className="mt-6 rounded-full bg-pine px-5 py-2.5 text-sm font-medium text-cream"
              >
                Show everything
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-10 shrink-0 rounded-full border px-4 text-sm whitespace-nowrap transition",
        active ? "border-pine bg-pine text-cream" : "border-stone bg-white text-ink/80 hover:border-pine/40",
      )}
    >
      {children}
    </button>
  );
}
