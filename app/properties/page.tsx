import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, MessageCircle, SearchX, X } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { SearchBar } from "@/components/home/SearchBar";
import { Filters } from "@/components/property/Filters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getListings, getTowns } from "@/lib/services/listings";
import { fromIsoDate, parseTrip, sortOptions, totalGuests, tripQuery, type SortKey } from "@/lib/search";
import { collections, type CollectionKey } from "@/lib/site";
import type { Listing } from "@/lib/types/hostaway";
import { plural, toSummary } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vacation Homes in the Berkshires",
  description: "Browse lakefront cabins, ski chalets and homes near Tanglewood. Book direct with no booking fees.",
};

export default function PropertiesPage({ searchParams }: PageProps<"/properties">) {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <Results searchParams={searchParams} />
    </Suspense>
  );
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const toNumber = (v: string | undefined) => (v && !Number.isNaN(Number(v)) ? Number(v) : undefined);
const shortDate = (iso: string) => format(fromIsoDate(iso)!, "MMM d");

const sorters: Record<Exclude<SortKey, "">, (a: Listing, b: Listing) => number> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.averageReviewRating - a.averageReviewRating,
  guests: (a, b) => b.personCapacity - a.personCapacity,
};
// "Recommended": best-reviewed first, nudging larger homes up on ties.
const recommended = (a: Listing, b: Listing) =>
  b.averageReviewRating - a.averageReviewRating || b.personCapacity - a.personCapacity;

async function Results({ searchParams }: { searchParams: PageProps<"/properties">["searchParams"] }) {
  const sp = await searchParams;
  const trip = parseTrip(sp);
  const collectionParam = first(sp.collection);
  const collection = collections.some((c) => c.key === collectionParam) ? (collectionParam as CollectionKey) : undefined;
  const bedrooms = toNumber(first(sp.bedrooms));
  const sortParam = first(sp.sort);
  const sort = sortOptions.some((o) => o.value === sortParam) ? (sortParam as SortKey) : "";

  const [found, towns] = await Promise.all([
    getListings({ town: trip.town, guests: totalGuests(trip), bedrooms, collection, pets: trip.pets > 0 }),
    getTowns(),
  ]);
  const listings = [...found].sort(sort ? sorters[sort] : recommended);

  // Every param on this page, so filters and the search bar can keep each other's values.
  const tripParams = Object.fromEntries(new URLSearchParams(tripQuery(trip, { includeTown: true })));
  const filterParams: Record<string, string> = {};
  if (collection) filterParams.collection = collection;
  if (bedrooms) filterParams.bedrooms = String(bedrooms);
  if (sort) filterParams.sort = sort;
  const allParams = { ...tripParams, ...filterParams };

  const without = (...keys: string[]) => {
    const next = new URLSearchParams(allParams);
    keys.forEach((k) => next.delete(k));
    const qs = next.toString();
    return qs ? `/properties?${qs}` : "/properties";
  };

  // Cards carry the trip so the booking widget opens pre-filled.
  const bookingQuery = tripQuery(trip);
  const nights =
    trip.checkIn && trip.checkOut
      ? differenceInCalendarDays(fromIsoDate(trip.checkOut)!, fromIsoDate(trip.checkIn)!)
      : undefined;
  const guests = totalGuests(trip);
  const collectionTitle = collections.find((c) => c.key === collection)?.title;

  const activeChips = [
    trip.town && { label: trip.town, href: without("town") },
    trip.checkIn && {
      label: trip.checkOut ? `${shortDate(trip.checkIn)} – ${shortDate(trip.checkOut)}` : `From ${shortDate(trip.checkIn)}`,
      href: without("checkIn", "checkOut"),
    },
    (guests !== 2 || trip.children > 0) && { label: plural(guests, "guest"), href: without("adults", "children") },
    trip.pets > 0 && { label: `${plural(trip.pets, "pet")} · pet-friendly only`, href: without("pets") },
    collectionTitle && { label: collectionTitle, href: without("collection") },
    bedrooms && { label: `${bedrooms}+ bedrooms`, href: without("bedrooms") },
  ].filter(Boolean) as { label: string; href: string }[];

  const heading = `${plural(listings.length, "home")} ${trip.town ? `in ${trip.town}` : "in the Berkshires"}`;

  return (
    <>
      <PageHeader>
        <SearchBar key={bookingQuery + trip.town} towns={towns} initial={trip} preserve={filterParams} />
      </PageHeader>

      {/* Sticky under the site header so filters stay in reach while browsing. */}
      <div className="sticky top-16 z-20 border-b border-stone bg-cream-50/90 py-3 backdrop-blur-xl">
        <div className="container-x">
          <Filters params={allParams} />
        </div>
      </div>

      <div className="container-x pt-10 pb-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-light text-pine sm:text-4xl" aria-live="polite">
              {heading}
            </h2>
            <p className="mt-1 text-sm text-moss">
              {nights
                ? `Prices shown for ${plural(nights, "night")}, before cleaning fee and taxes.`
                : "Add your dates to see the total for your stay."}
            </p>
          </div>
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  scroll={false}
                  aria-label={`Remove ${chip.label}`}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-pine/5 py-1.5 pr-2 pl-3 text-xs font-medium text-pine transition hover:bg-pine/10"
                >
                  {chip.label}
                  <span className="grid size-4 place-items-center rounded-full bg-pine/10 group-hover:bg-pine group-hover:text-cream">
                    <X className="size-2.5" />
                  </span>
                </Link>
              ))}
              {activeChips.length > 1 && (
                <Link href="/properties" scroll={false} className="text-xs text-moss underline underline-offset-4 hover:text-ink">
                  Clear all
                </Link>
              )}
            </div>
          )}
        </div>

        {listings.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-stone px-6 py-20 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-cream text-cedar">
              <SearchX className="size-6" strokeWidth={1.5} />
            </span>
            <p className="mt-5 font-display text-3xl font-light text-pine">No homes match that search</p>
            <p className="mt-2 max-w-md text-moss">
              Try removing a filter above, or tell us what you&apos;re looking for and we&apos;ll find the right fit.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/properties" variant="pine">
                Show all homes
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Ask a local
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <Stagger
              key={JSON.stringify(allParams)}
              className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              {listings.map((listing, i) => (
                <StaggerItem key={listing.id} index={i}>
                  <PropertyCard
                    listing={toSummary(listing)}
                    href={`/properties/${listing.id}?${bookingQuery}`}
                    nights={nights}
                    priority={i < 3}
                  />
                </StaggerItem>
              ))}
            </Stagger>

            <Link
              href="/contact"
              className="group mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-cream p-8 transition hover:bg-stone/70 sm:flex-row sm:items-center sm:p-10"
            >
              <div className="flex items-center gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-cedar">
                  <MessageCircle className="size-6" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-2xl font-light text-pine">Not sure which home is right?</p>
                  <p className="mt-1 text-sm text-moss">Tell us about your trip and our local team will suggest the best fit.</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-pine">
                Ask a local
                <span className="grid size-10 place-items-center rounded-full bg-pine text-cream transition group-hover:bg-cedar">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

function PageHeader({ children }: { children?: React.ReactNode }) {
  return (
    // z-30 keeps the search dropdowns above the sticky filter bar.
    <section className="relative z-30 bg-pine pt-28 pb-10 text-cream sm:pt-32 sm:pb-12">
      <div className="container-x">
        <p className="eyebrow text-cedar-300">Our homes</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] font-light tracking-tight sm:text-5xl">
          Find your place in <em className="text-cedar-300 italic">the Berkshires</em>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-cream/75 sm:text-base">
          Every home is cared for by our local team. Book direct for the best rate, with no booking fees.
        </p>
        <div className="mt-8 max-w-4xl">{children}</div>
      </div>
    </section>
  );
}

function ResultsSkeleton() {
  return (
    <>
      <PageHeader>
        <div className="h-[72px] animate-pulse rounded-full bg-white/15" />
      </PageHeader>
      <div className="border-b border-stone py-3">
        <div className="container-x flex animate-pulse gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-28 shrink-0 rounded-full bg-stone" />
          ))}
        </div>
      </div>
      <div className="container-x animate-pulse pt-10 pb-24">
        <div className="h-9 w-64 rounded bg-stone" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-10/9 rounded-2xl bg-stone" />
              <div className="mt-4 h-6 w-2/3 rounded bg-stone" />
              <div className="mt-2 h-4 w-1/2 rounded bg-stone" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
