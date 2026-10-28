"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { ArrowUpDown, BedDouble, ChevronDown } from "lucide-react";
import { sortOptions } from "@/lib/search";
import { collections, type CollectionKey } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Stay type, bedrooms and sort. Town, dates and guests live in the search bar;
 * every change here keeps the rest of the query (the trip) intact.
 */
export function Filters({ params }: { params: Record<string, string> }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const set = (key: string, value: string | undefined) => {
    const next = { ...params };
    if (value) next[key] = value;
    else delete next[key];
    startTransition(() =>
      router.replace(`${pathname}?${new URLSearchParams(next).toString()}`, { scroll: false }),
    );
  };

  return (
    // Phones: one swipeable row (sorting first). Desktop: chips left, selects right.
    <div
      className={cn(
        "-mx-4 flex items-center gap-2 overflow-x-auto px-4 transition-opacity [scrollbar-width:none] sm:mx-0 sm:px-0 lg:overflow-visible",
        pending && "opacity-60",
      )}
    >
      <div className="flex shrink-0 gap-2 lg:order-last">
        <Select
          icon={ArrowUpDown}
          label="Sort by"
          value={params.sort ?? ""}
          onChange={(v) => set("sort", v || undefined)}
          options={[...sortOptions]}
        />
        <Select
          icon={BedDouble}
          label="Bedrooms"
          value={params.bedrooms ?? ""}
          onChange={(v) => set("bedrooms", v || undefined)}
          options={[
            { value: "", label: "Any bedrooms" },
            ...[2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ bedrooms` })),
          ]}
        />
      </div>
      <span aria-hidden className="h-6 w-px shrink-0 bg-stone lg:hidden" />

      <div
        role="group"
        aria-label="Stay type"
        className="flex shrink-0 gap-2 lg:min-w-0 lg:flex-1 lg:shrink lg:overflow-x-auto lg:[mask-image:linear-gradient(to_right,black_94%,transparent)] lg:pr-6 lg:[scrollbar-width:none]"
      >
        <Chip active={!params.collection} onClick={() => set("collection", undefined)}>
          All homes
        </Chip>
        {collections.map((c) => (
          <Chip
            key={c.key}
            active={params.collection === c.key}
            onClick={() => set("collection", params.collection === c.key ? undefined : c.key)}
          >
            {chipLabels[c.key]}
          </Chip>
        ))}
      </div>
    </div>
  );
}

// Shorter than the collection titles so the whole row fits beside the selects.
const chipLabels: Record<CollectionKey, string> = {
  lakefront: "Lakefront",
  ski: "Ski season",
  tanglewood: "Near Tanglewood",
  pool: "Pools & hot tubs",
  pets: "Pet friendly",
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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

function Select({
  icon: Icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: typeof BedDouble;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative shrink-0">
      <span className="sr-only">{label}</span>
      <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-cedar" strokeWidth={1.75} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 appearance-none rounded-full border bg-white pr-9 pl-10 text-sm outline-none transition focus:border-pine",
          value ? "border-pine/50 text-pine" : "border-stone",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-moss" />
    </label>
  );
}
