"use client";

import { useEffect, useState } from "react";
import { differenceInCalendarDays, format, startOfToday } from "date-fns";
import { BadgePercent, CalendarDays, ChevronDown, Search, ShieldCheck, Star, Users } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { DateRangeCalendar, type DateRange } from "@/components/ui/DateRangePicker";
import { GuestSelector, type Guests } from "@/components/ui/GuestSelector";
import { Popover } from "@/components/ui/Popover";
import { fromIsoDate, tripQuery, type TripSearch } from "@/lib/search";
import { cn, formatCurrency } from "@/lib/utils";

// Estimated Massachusetts lodging taxes until Hostaway returns the real quote (Phase 2).
const TAX_RATE = 0.1175;

export function BookingWidget({
  price,
  cleaningFee,
  maxGuests,
  rating,
  initial,
}: {
  /** Not used until direct checkout is wired up (Phase 3). */
  listingId: number;
  price: number;
  cleaningFee: number;
  maxGuests: number;
  rating: number;
  /** Trip from the search the guest arrived with; pre-fills dates and party. */
  initial?: TripSearch;
}) {
  const [panel, setPanel] = useState<"dates" | "guests" | null>(null);
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = fromIsoDate(initial?.checkIn);
    if (!from || from < startOfToday()) return undefined;
    return { from, to: fromIsoDate(initial?.checkOut) };
  });
  const [guests, setGuests] = useState<Guests>(() => {
    const adults = Math.min(initial?.adults ?? 2, maxGuests);
    return { adults, children: Math.min(initial?.children ?? 0, maxGuests - adults), pets: initial?.pets ?? 0 };
  });
  const fromSearch = Boolean(initial?.checkIn);

  // Keep the URL in step with the widget so a refresh or shared link keeps the trip.
  useEffect(() => {
    const query = tripQuery({
      checkIn: range?.from && format(range.from, "yyyy-MM-dd"),
      checkOut: range?.from && range.to ? format(range.to, "yyyy-MM-dd") : undefined,
      ...guests,
    });
    const isDefault = query === "adults=2";
    window.history.replaceState(null, "", isDefault ? window.location.pathname : `${window.location.pathname}?${query}`);
  }, [range, guests]);

  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;
  const subtotal = nights * price;
  const taxes = Math.round((subtotal + cleaningFee) * TAX_RATE);
  const total = subtotal + cleaningFee + taxes;
  const totalGuests = guests.adults + guests.children;

  return (
    <div className="rounded-3xl border border-stone bg-white p-6 shadow-xl shadow-pine/5">
      <div className="flex items-end justify-between">
        <p>
          <span className="font-display text-3xl text-pine">{formatCurrency(price)}</span>
          <span className="text-sm text-moss"> / night</span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-cedar text-cedar" /> {rating.toFixed(2)}
        </p>
      </div>

      {fromSearch && (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-cream px-3 py-2 text-xs text-moss">
          <Search className="size-3.5 text-cedar" /> Filled in from your search. Change anything below.
        </p>
      )}

      <div className="mt-4 rounded-2xl border border-stone">
        <div className="relative">
          <button
            type="button"
            onClick={() => setPanel((p) => (p === "dates" ? null : "dates"))}
            aria-expanded={panel === "dates"}
            className="grid w-full grid-cols-2 text-left"
          >
            <DateCell label="Check-in" value={range?.from ? format(range.from, "MMM d, yyyy") : "Add date"} />
            <DateCell label="Check-out" value={range?.to ? format(range.to, "MMM d, yyyy") : "Add date"} className="border-l border-stone" />
          </button>
          <Popover open={panel === "dates"} onClose={() => setPanel(null)} className="right-0 w-max max-w-[calc(100vw-2rem)]">
            <DateRangeCalendar value={range} onChange={setRange} months={1} />
            <div className="flex justify-between border-t border-stone pt-3 text-sm">
              <button type="button" className="text-moss underline" onClick={() => setRange(undefined)}>
                Clear dates
              </button>
              <button type="button" className="rounded-full bg-pine px-4 py-1.5 text-cream" onClick={() => setPanel(null)}>
                Done
              </button>
            </div>
          </Popover>
        </div>
        <div className="relative border-t border-stone">
          <button
            type="button"
            onClick={() => setPanel((p) => (p === "guests" ? null : "guests"))}
            aria-expanded={panel === "guests"}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span>
              <span className="block text-[10px] font-medium tracking-[0.2em] text-moss uppercase">Guests</span>
              <span className="text-sm">
                {totalGuests} guest{totalGuests > 1 ? "s" : ""}
                {guests.pets ? `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}` : ""}
              </span>
            </span>
            <ChevronDown className={cn("size-4 transition", panel === "guests" && "rotate-180")} />
          </button>
          <Popover open={panel === "guests"} onClose={() => setPanel(null)} className="inset-x-0 mt-1">
            <GuestSelector value={guests} onChange={setGuests} maxGuests={maxGuests} />
          </Popover>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (nights === 0) {
            setPanel("dates");
            return;
          }
          // Phase 3: start direct checkout here (Hostaway reservation + Stripe payment).
        }}
        className={buttonClasses({ size: "lg", className: "mt-5 w-full" })}
      >
        {nights > 0 ? "Book direct & save" : "Check availability"}
      </button>
      <p className="mt-3 text-center text-xs text-moss">You won&apos;t be charged yet</p>

      {nights > 0 ? (
        <dl className="mt-6 space-y-3 text-sm">
          <Row label={`${formatCurrency(price)} × ${nights} night${nights > 1 ? "s" : ""}`} value={formatCurrency(subtotal)} />
          <Row label="Cleaning fee" value={formatCurrency(cleaningFee)} />
          <Row label="Booking fee" value={<span className="text-cedar">$0 when you book direct</span>} />
          <Row label="Taxes (est.)" value={formatCurrency(taxes)} />
          <div className="border-t border-stone pt-3">
            <Row label={<span className="font-semibold text-ink">Total</span>} value={<span className="font-semibold">{formatCurrency(total)}</span>} />
          </div>
        </dl>
      ) : (
        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-cream px-4 py-3 text-xs text-moss">
          <CalendarDays className="size-4 shrink-0 text-cedar" /> Select dates to see your total price.
        </div>
      )}

      <ul className="mt-6 space-y-2 border-t border-stone pt-5 text-xs text-ink/75">
        <li className="flex items-center gap-2">
          <BadgePercent className="size-4 text-cedar" /> No platform service fees
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-cedar" /> Best rate guaranteed on our site
        </li>
        <li className="flex items-center gap-2">
          <Users className="size-4 text-cedar" /> Sleeps up to {maxGuests}
        </li>
      </ul>
    </div>
  );
}

function DateCell({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn("block px-4 py-3", className)}>
      <span className="block text-[10px] font-medium tracking-[0.2em] text-moss uppercase">{label}</span>
      <span className="text-sm">{value}</span>
    </span>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-ink/75">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
