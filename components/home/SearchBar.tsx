"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Check, MapPin, Search, Users, X } from "lucide-react";
import { DateRangeCalendar, type DateRange } from "@/components/ui/DateRangePicker";
import { GuestSelector, type Guests } from "@/components/ui/GuestSelector";
import { Popover } from "@/components/ui/Popover";
import { fromIsoDate, tripQuery, type TripSearch } from "@/lib/search";
import { cn } from "@/lib/utils";

type Panel = "town" | "dates" | "guests" | null;

export function SearchBar({
  towns,
  initial,
  preserve,
  className,
}: {
  towns: string[];
  /** Pre-fills the fields, e.g. from the current URL on the results page. */
  initial?: TripSearch;
  /** Other query params (filters) to keep when searching again. */
  preserve?: Record<string, string>;
  className?: string;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);
  const [town, setTown] = useState<string>(initial?.town ?? "");
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = fromIsoDate(initial?.checkIn);
    return from ? { from, to: fromIsoDate(initial?.checkOut) } : undefined;
  });
  const [guests, setGuests] = useState<Guests>({
    adults: initial?.adults ?? 2,
    children: initial?.children ?? 0,
    pets: initial?.pets ?? 0,
  });

  const close = () => setPanel(null);
  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p));
  const totalGuests = guests.adults + guests.children;
  const nights =
    range?.from && range?.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) : 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    close();
    const query = tripQuery(
      {
        town: town || undefined,
        checkIn: range?.from && format(range.from, "yyyy-MM-dd"),
        checkOut: range?.from && range.to ? format(range.to, "yyyy-MM-dd") : undefined,
        ...guests,
      },
      { includeTown: true },
    );
    const params = new URLSearchParams({ ...preserve, ...Object.fromEntries(new URLSearchParams(query)) });
    router.push(`/properties?${params.toString()}`, { scroll: !preserve });
  };

  const dateLabel = range?.from
    ? `${format(range.from, "MMM d")}${range.to ? ` – ${format(range.to, "MMM d")}` : " – Check-out"}`
    : "Add dates";
  const guestLabel = `${totalGuests} guest${totalGuests > 1 ? "s" : ""}${
    guests.pets ? `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}` : ""
  }`;

  return (
    <div className={className}>
      <form
        onSubmit={submit}
        className="relative grid gap-1 rounded-3xl bg-white p-2 text-ink shadow-2xl shadow-black/30 md:grid-cols-[1fr_1.15fr_1fr_auto] md:items-center md:gap-0 md:rounded-full"
      >
        <div className="relative">
          <Field
            icon={MapPin}
            label="Where"
            value={town || "All towns"}
            placeholder={!town}
            active={panel === "town"}
            onClick={() => toggle("town")}
            onClear={town ? () => setTown("") : undefined}
          />
          <Popover open={panel === "town"} onClose={close} className="inset-x-0 md:right-auto md:w-80">
            <p className="px-3 pb-2 text-[10px] font-medium tracking-[0.2em] text-moss uppercase">Choose a town</p>
            <ul className="grid max-h-80 grid-cols-1 overflow-auto sm:grid-cols-2">
              {["", ...towns].map((t) => (
                <li key={t || "all"}>
                  <button
                    type="button"
                    onClick={() => {
                      setTown(t);
                      setPanel("dates");
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-cream",
                      t === town && "bg-cream font-medium text-pine",
                    )}
                  >
                    {t || "All towns"}
                    {t === town && <Check className="size-3.5 shrink-0 text-cedar" />}
                  </button>
                </li>
              ))}
            </ul>
          </Popover>
        </div>

        <div className="relative md:border-l md:border-stone">
          <Field
            icon={CalendarDays}
            label="When"
            value={dateLabel}
            placeholder={!range?.from}
            active={panel === "dates"}
            onClick={() => toggle("dates")}
            onClear={range?.from ? () => setRange(undefined) : undefined}
          />
          <Popover
            open={panel === "dates"}
            onClose={close}
            className="inset-x-0 md:right-auto md:left-1/2 md:w-max md:-translate-x-1/2"
          >
            <div className="hidden md:block">
              <DateRangeCalendar value={range} onChange={setRange} />
            </div>
            <div className="flex justify-center md:hidden">
              <DateRangeCalendar value={range} onChange={setRange} months={1} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-4 border-t border-stone pt-3">
              <p className="text-xs text-moss">
                {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""} selected` : "Select check-in, then check-out"}
              </p>
              <button
                type="button"
                className="rounded-full bg-pine px-5 py-2 text-sm text-cream transition hover:bg-pine-700"
                onClick={() => setPanel("guests")}
              >
                Next
              </button>
            </div>
          </Popover>
        </div>

        <div className="relative md:border-l md:border-stone">
          <Field
            icon={Users}
            label="Who"
            value={guestLabel}
            active={panel === "guests"}
            onClick={() => toggle("guests")}
          />
          <Popover open={panel === "guests"} onClose={close} className="inset-x-0 md:right-0 md:left-auto md:w-80">
            <GuestSelector value={guests} onChange={setGuests} />
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full rounded-full bg-pine py-2.5 text-sm text-cream transition hover:bg-pine-700"
            >
              Done
            </button>
          </Popover>
        </div>

        <button
          type="submit"
          className="mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-cedar px-8 text-sm font-medium whitespace-nowrap text-cream shadow-lg shadow-cedar/30 transition hover:bg-cedar-600 md:mt-0 md:ml-2 md:px-6 lg:px-8"
        >
          <Search className="size-4" /> Search<span className="md:hidden lg:inline"> homes</span>
        </button>
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  placeholder = false,
  active,
  onClick,
  onClear,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  placeholder?: boolean;
  active: boolean;
  onClick: () => void;
  onClear?: () => void;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-16 items-center rounded-full transition",
        active ? "bg-cream shadow-inner" : "hover:bg-cream/60",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={active}
        aria-haspopup="dialog"
        className="flex h-full w-full items-center gap-3 rounded-full px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-cedar"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-cedar group-hover:bg-white">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 pr-6">
          <span className="block text-[10px] font-semibold tracking-[0.2em] text-moss uppercase">{label}</span>
          <span className={cn("block truncate text-[15px]", placeholder ? "text-ink/55" : "font-medium text-ink")}>
            {value}
          </span>
        </span>
      </button>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Clear ${label.toLowerCase()}`}
          className="absolute right-3 grid size-6 place-items-center rounded-full bg-ink/5 text-ink/60 opacity-0 transition group-hover:opacity-100 hover:bg-ink/10 focus-visible:opacity-100"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  );
}
