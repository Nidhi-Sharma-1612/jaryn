import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  Anchor,
  AudioLines,
  Award,
  Ban,
  Bath,
  BedDouble,
  Clock,
  DoorOpen,
  ExternalLink,
  HeartHandshake,
  Info,
  KeyRound,
  MapPin,
  MessageCircle,
  Moon,
  MountainSnow,
  PawPrint,
  Star,
  Users,
  WavesLadder,
  type LucideIcon,
} from "lucide-react";
import { AmenityList } from "@/components/property/AmenityList";
import { BackToResults, BackToResultsFallback } from "@/components/property/BackToResults";
import { BookingWidget } from "@/components/property/BookingWidget";
import { BookingWidgetFromSearch } from "@/components/property/BookingWidgetFromSearch";
import { Gallery } from "@/components/property/Gallery";
import { MobileBookingBar } from "@/components/property/MobileBookingBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyReviews } from "@/components/property/PropertyReviews";
import { ShareButton } from "@/components/property/ShareButton";
import { ExpandableText } from "@/components/ui/ExpandableText";
import { Reveal } from "@/components/ui/Reveal";
import { getListing, getListings, matchesCollection } from "@/lib/services/listings";
import { getListingReviews } from "@/lib/services/reviews";
import type { Listing } from "@/lib/types/hostaway";
import { formatHour, splitListingName, toFiveStar, toSummary } from "@/lib/utils";

export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({ id: String(l.id) }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(Number(id));
  if (!listing) return {};
  const { title } = splitListingName(listing.name);
  return {
    title: `${title}, ${listing.city}`,
    description: listing.description.slice(0, 155),
    openGraph: { images: listing.listingImages.slice(0, 1).map((i) => i.url) },
  };
}

const GUEST_FAVORITE = 4.9;

type Highlight = { icon: LucideIcon; title: string; body: string };

/** Up to four reasons to book, derived from the listing's own data. */
function highlightsFor(listing: Listing, rating: number): Highlight[] {
  const has = (name: string) => listing.listingAmenities.some((a) => a.amenityName.toLowerCase() === name);
  const list: (Highlight | false)[] = [
    rating >= GUEST_FAVORITE && {
      icon: Award,
      title: "Guest favorite",
      body: `Rated ${rating.toFixed(2)} out of 5 by past guests.`,
    },
    matchesCollection(listing, "lakefront") && {
      icon: Anchor,
      title: "On the water",
      body: "Swim, paddle and watch the sunset from the shore.",
    },
    matchesCollection(listing, "ski") && {
      icon: MountainSnow,
      title: "Close to the slopes",
      body: "A short drive to Catamount or Jiminy Peak.",
    },
    matchesCollection(listing, "tanglewood") && {
      icon: AudioLines,
      title: "Near Tanglewood",
      body: "An easy drive to summer concerts in Lenox.",
    },
    matchesCollection(listing, "pool") && {
      icon: WavesLadder,
      title: "Pool or hot tub",
      body: "Long, lazy afternoons are part of the plan.",
    },
    matchesCollection(listing, "pets") && {
      icon: PawPrint,
      title: "Dogs welcome",
      body: "Bring your dog along for a one-time pet fee.",
    },
    (has("contactless check-in/out") || has("self check-in")) && {
      icon: KeyRound,
      title: "Self check-in",
      body: "Arrive on your schedule with keyless entry.",
    },
    {
      icon: HeartHandshake,
      title: "Local team on call",
      body: "We're nearby from 9am to 9pm, every day of your stay.",
    },
  ];
  return list.filter((h): h is Highlight => Boolean(h)).slice(0, 4);
}

/** Hostaway house rules arrive as loose lines ("no smoking"); tidy them into a list. */
function parseRules(text: string) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.replace(/^[-•*\s]+/, "").trim())
    .filter(Boolean);
  const isRule = (l: string) => l.length < 70;
  const intro = lines.filter((l) => !isRule(l));
  const rules = lines.filter(isRule).map((l) => {
    const text = l.charAt(0).toUpperCase() + l.slice(1);
    const icon: LucideIcon = /^no\b/i.test(l) ? Ban : /quiet|noise/i.test(l) ? Moon : Info;
    return { text, icon };
  });
  return { intro: intro.join(" "), rules };
}

export default async function PropertyPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const listing = await getListing(Number(id));
  if (!listing) notFound();

  const { title, highlights: tags } = splitListingName(listing.name);
  const rating = toFiveStar(listing.averageReviewRating);
  const highlights = highlightsFor(listing, rating);
  const houseRules = parseRules(listing.houseRules);
  const guestReviews = await getListingReviews(listing.id);

  // Same town first, then homes of a similar size that share a stay type.
  const others = (await getListings()).filter((l) => l.id !== listing.id);
  const similarity = (l: Listing) =>
    (l.city === listing.city ? 4 : 0) +
    (["lakefront", "ski", "tanglewood", "pool", "pets"] as const).filter(
      (k) => matchesCollection(l, k) && matchesCollection(listing, k),
    ).length -
    Math.abs(l.personCapacity - listing.personCapacity) / 4;
  const similar = others.sort((a, b) => similarity(b) - similarity(a)).slice(0, 3);

  const widgetProps = {
    listingId: listing.id,
    price: listing.price,
    cleaningFee: listing.cleaningFee,
    maxGuests: listing.personCapacity,
    rating,
  };

  const facts = [
    { icon: Users, value: listing.personCapacity, label: "Guests" },
    { icon: DoorOpen, value: listing.bedroomsNumber, label: listing.bedroomsNumber === 1 ? "Bedroom" : "Bedrooms" },
    { icon: BedDouble, value: listing.bedsNumber, label: listing.bedsNumber === 1 ? "Bed" : "Beds" },
    { icon: Bath, value: listing.bathroomsNumber, label: listing.bathroomsNumber === 1 ? "Bath" : "Baths" },
  ];

  // Approximate area only (rounded to ~1km); the exact address is shared after booking.
  const lat = Math.round(listing.lat * 100) / 100;
  const lng = Math.round(listing.lng * 100) / 100;
  const d = 0.035;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d / 1.6},${lng + d},${lat + d / 1.6}&layer=mapnik`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listing.city}, ${listing.state}`)}`;

  return (
    <div className="pt-24 pb-28 sm:pt-28 lg:pb-24">
      <div className="container-x">
        <div className="flex items-center justify-between gap-4">
          <Suspense fallback={<BackToResultsFallback />}>
            <BackToResults />
          </Suspense>
          <ShareButton title={title} />
        </div>

        <header className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-moss">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" /> {listing.city}, {listing.state}
              </span>
              <span className="text-stone">|</span>
              <a href="#reviews" className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-pine hover:underline">
                <Star className="size-4 fill-cedar text-cedar" /> {rating.toFixed(2)}
                <span className="text-moss">· {guestReviews.reviewCount} reviews</span>
              </a>
              {rating >= GUEST_FAVORITE && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cedar/10 px-2.5 py-0.5 text-xs font-medium text-cedar-600">
                  <Award className="size-3.5" /> Guest favorite
                </span>
              )}
            </div>
            <h1 className="mt-2 font-display text-4xl leading-[1.02] font-light tracking-tight text-pine sm:text-6xl">
              {title}
            </h1>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-stone bg-white px-3 py-1 text-xs text-ink/75">
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mt-6 sm:mt-8">
          <Gallery images={listing.listingImages} title={title} />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <div className="min-w-0">
            <dl className="grid grid-cols-4 divide-x divide-stone rounded-3xl border border-stone bg-white">
              {facts.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 px-2 py-5 text-center">
                  <Icon className="size-5 text-cedar" strokeWidth={1.5} />
                  <dd className="mt-1 font-display text-2xl leading-none text-pine">{value}</dd>
                  <dt className="text-xs text-moss">{label}</dt>
                </div>
              ))}
            </dl>

            <Section title="Why guests love it">
              <ul className="grid gap-6 sm:grid-cols-2">
                {highlights.map(({ icon: Icon, title: heading, body }) => (
                  <li key={heading} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream text-cedar">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{heading}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-moss">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="About this home">
              <ExpandableText text={listing.description} />
            </Section>

            <Section title="What this home offers">
              <AmenityList amenities={listing.listingAmenities} />
            </Section>

            {guestReviews.reviews.length > 0 && (
              <Section title="Guest reviews" id="reviews">
                {/* Rating matches the cards and header (Hostaway); count and text come from the review data. */}
                <PropertyReviews reviews={guestReviews.reviews} reviewCount={guestReviews.reviewCount} rating={rating} />
              </Section>
            )}

            <Section title="Good to know">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard icon={Clock} title="Check-in" body={`After ${formatHour(listing.checkInTimeStart)}`} />
                <InfoCard icon={Clock} title="Check-out" body={`Before ${formatHour(listing.checkOutTime)}`} />
              </div>
              {(houseRules.rules.length > 0 || houseRules.intro) && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-ink">House rules</h3>
                  {houseRules.intro && <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{houseRules.intro}</p>}
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {houseRules.rules.map(({ text, icon: Icon }) => (
                      <li key={text} className="flex items-center gap-3 text-[15px] text-ink/80">
                        <Icon className="size-4 shrink-0 text-sage" strokeWidth={1.75} /> {text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            <Section title="Where you'll be" last>
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-stone bg-stone">
                <iframe title={`Map of the area around ${listing.city}`} src={mapSrc} className="size-full" loading="lazy" />
                {/* Soft "approximate area" marker over the map center. */}
                <span className="pointer-events-none absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-cedar/60 bg-cedar/15">
                  <span className="grid size-10 place-items-center rounded-full bg-pine text-cream shadow-lg">
                    <MapPin className="size-5" />
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-moss">
                  <span className="font-medium text-ink">
                    {listing.city}, {listing.state === "MA" ? "Massachusetts" : "New York"}
                  </span>
                  . Approximate area shown; the exact address is shared after booking.
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-pine underline-offset-4 hover:text-cedar hover:underline"
                >
                  Open in Google Maps <ExternalLink className="size-3.5" />
                </a>
              </div>
            </Section>
          </div>

          <aside id="booking" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            {/* Static shell shows an empty widget; the search-aware one fills in from the URL. */}
            <Suspense fallback={<BookingWidget {...widgetProps} />}>
              <BookingWidgetFromSearch {...widgetProps} />
            </Suspense>
            <Link
              href={`/contact?home=${encodeURIComponent(title)}`}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-stone bg-white px-4 py-3 text-sm text-ink/80 transition hover:border-pine/40 hover:text-pine"
            >
              <MessageCircle className="size-4 text-cedar" /> Questions? Ask us about {title}
            </Link>
          </aside>
        </div>

        <section className="mt-20 border-t border-stone pt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-light text-pine sm:text-4xl">You might also love</h2>
            <Link href="/properties" className="hidden text-sm font-medium text-pine underline-offset-4 hover:underline sm:block">
              View all homes
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l) => (
              <PropertyCard key={l.id} listing={toSummary(l)} />
            ))}
          </div>
        </section>
      </div>

      <MobileBookingBar price={listing.price} rating={rating} targetId="booking" />
    </div>
  );
}

function Section({
  title,
  id,
  last = false,
  children,
}: {
  title: string;
  id?: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal id={id} className={last ? "scroll-mt-24 pt-10" : "scroll-mt-24 border-b border-stone py-10"}>
      <h2 className="mb-6 font-display text-3xl font-light text-pine">{title}</h2>
      {children}
    </Reveal>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-cream p-4">
      <Icon className="size-5 text-cedar" strokeWidth={1.5} />
      <div>
        <p className="text-xs text-moss">{title}</p>
        <p className="text-sm font-medium">{body}</p>
      </div>
    </div>
  );
}
