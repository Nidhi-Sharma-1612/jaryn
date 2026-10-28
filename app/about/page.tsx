import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Coffee,
  HandCoins,
  HeartHandshake,
  Package,
  PhoneCall,
  Quote,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ownerIntro, ownerValues } from "@/lib/data/owners";
import { getListing, getPortfolioStats } from "@/lib/services/listings";
import { getFeaturedReviews, getReviewTotals } from "@/lib/services/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Berkshire Vacation Rental Co. is a boutique, locally rooted vacation rental company founded by Jaryn Pierson, caring for homes across the Berkshires.",
};

// From "All Berkshire Vacation Rental Co. Properties include" in every listing description.
const included: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: PhoneCall, title: "Local team, 9am – 9pm", body: "Support from our full-time local team, every day of your stay." },
  { icon: Sparkles, title: "Inspected before you arrive", body: "Professional housekeeping and a property inspection before every arrival." },
  { icon: BedDouble, title: "Towels, linens & bath products", body: "Everything you need to settle in, already waiting." },
  { icon: Coffee, title: "Coffee to start your morning", body: "At least a morning's worth of coffee to get you started." },
];

// "The Berkshire Vacation Rental Co. Experience" from the original home page.
const experience: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: HeartHandshake,
    title: "Rooted in hospitality",
    body: "We manage every home the way we'd want to arrive at one — warm, ready, and full of the little things that make a place feel like yours.",
  },
  {
    icon: PhoneCall,
    title: "We've got you covered",
    body: "Questions before you arrive? Need something during your stay? Our team is located right here in the Berkshires.",
  },
  {
    icon: Package,
    title: "Fully stocked homes",
    body: "Walk in and settle right in. Every property is cleaned, stocked, and prepared so your only job is to enjoy the Berkshires.",
  },
];

export default async function AboutPage() {
  const [stats, totals, reviews, cheshire, garfield, stockbridge] = await Promise.all([
    getPortfolioStats(),
    getReviewTotals(),
    getFeaturedReviews(3),
    getListing(417729),
    getListing(351827),
    getListing(396469),
  ]);
  const hero = garfield?.listingImages[0]?.url;
  const story = cheshire?.listingImages[0]?.url;
  const team = stockbridge?.listingImages[0]?.url;

  const numbers = [
    { value: String(stats.homes), label: "Homes we care for" },
    { value: String(stats.towns), label: "Berkshires towns" },
    { value: totals.count.toLocaleString("en-US"), label: "Guest reviews" },
    { value: `${totals.average.toFixed(2)}★`, label: "Average rating" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-pine-900 pt-36 pb-24 text-cream sm:pt-44 sm:pb-32">
        {hero && <Image src={hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-50" />}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-pine-900/70 via-pine-900/50 to-pine-900/90" />
        <Reveal className="container-x max-w-4xl text-center">
          <p className="eyebrow text-cedar-300">About us</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] font-light tracking-tight text-balance sm:text-7xl">
            Boutique management, <em className="text-cedar-300 italic">rooted in the Berkshires</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-cream/80 sm:text-lg">
            The Berkshires are our backyard. We take care of the homes we manage like they&apos;re our own, and treat
            every guest like a friend coming up for the weekend.
          </p>
        </Reveal>
      </section>

      {/* Numbers */}
      <section aria-label="By the numbers" className="border-b border-stone bg-cream">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {numbers.map((n, i) => (
            <div
              key={n.label}
              className={`px-4 py-8 text-center sm:py-10 ${i > 0 ? "lg:border-l lg:border-stone" : ""} ${i % 2 === 1 ? "border-l border-stone lg:border-l" : ""} ${i > 1 ? "border-t border-stone lg:border-t-0" : ""}`}
            >
              <dd className="font-display text-4xl font-light text-pine sm:text-5xl">{n.value}</dd>
              <dt className="mt-1 text-xs tracking-wide text-moss">{n.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Founder story */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative pb-10 sm:pr-10">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-stone">
              {/* Swap for a portrait of Jaryn once provided. */}
              {story && <Image src={story} alt="Lakeside at a Berkshire Vacation Rental home" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />}
            </div>
            <div className="absolute right-0 bottom-0 rounded-2xl border-[6px] border-cream-50 bg-pine px-6 py-5 text-cream shadow-2xl shadow-pine/20">
              <p className="font-display text-xl">{site.founder.name}</p>
              <p className="text-xs text-cream/70">{site.founder.title}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-cedar">Our story</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-pine sm:text-5xl">
              Built from <em className="italic">firsthand experience</em>
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/75">
              <p>
                Berkshire Vacation Rental Co. was built from firsthand experience. While getting our own short-term
                rentals off the ground, we quickly realized how challenging it was to navigate listings, local markets,
                and the endless details that come with hosting — without any guidance or support.
              </p>
              <p>
                That experience became our foundation. BVRCo was founded to partner with homeowners across the
                Berkshires, making it easier to get a listing up, running, and performing at its best.
              </p>
              <p>{ownerIntro.bootsOnTheGround}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-pine py-24 text-cream sm:py-32">
        <div className="container-x">
          <SectionHeading
            tone="light"
            eyebrow="What we stand for"
            title={
              <>
                We manage every home the way <em className="italic">we&apos;d want our own managed</em>
              </>
            }
            align="center"
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {ownerValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-3xl border border-cream/10 bg-pine-900/40 p-8">
                <span className="font-display text-sm text-cedar-300 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-display text-3xl font-light">{v.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/70">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guest experience */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="The BVR Co. experience"
            title={
              <>
                What every stay <em className="italic">includes</em>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {experience.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08} className="rounded-3xl border border-stone bg-white p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-cream text-cedar">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <p className="mt-6 font-display text-2xl font-light text-pine">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-moss">{body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
            {included.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 bg-cream p-6">
                <Icon className="mt-0.5 size-5 shrink-0 text-cedar" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-ink">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-moss">{body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Fair to our team */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal className="order-last lg:order-first">
            <p className="eyebrow text-cedar">Our people</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-pine sm:text-5xl">
              Great stays start with <em className="italic">a team treated well</em>
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink/75">
              We take pride in our professional cleaning standards between guests. Our turnovers are handled by our own
              in-house cleaning team, and we pay above the living wage.
            </p>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-stone bg-white p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-cedar">
                <HandCoins className="size-5" strokeWidth={1.5} />
              </span>
              <p className="text-[15px] leading-relaxed text-ink/80">
                <span className="font-medium text-ink">100% of your cleaning fee</span> is paid directly to the
                individual cleaner responsible for your property.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-4/3 overflow-hidden rounded-3xl bg-stone">
            {team && <Image src={team} alt="A freshly prepared Berkshire Vacation Rental home" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />}
          </Reveal>
        </div>
      </section>

      {/* Guest voices */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="In our guests' words"
              title={
                <>
                  {totals.average.toFixed(2)} stars across <em className="italic">{totals.count.toLocaleString("en-US")} reviews</em>
                </>
              }
            />
            <Link href="/properties" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-pine underline-offset-4 hover:text-cedar hover:underline">
              Browse our homes <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08} className="flex flex-col rounded-3xl border border-stone bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-cedar text-cedar" />
                    ))}
                  </div>
                  <Quote className="size-6 text-cedar/30" strokeWidth={1.25} />
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">&ldquo;{r.publicReview}&rdquo;</blockquote>
                <p className="mt-5 text-sm font-medium text-ink">{r.guestName}</p>
                <Link href={`/properties/${r.listingId}`} className="text-xs text-moss hover:text-pine hover:underline">
                  Stayed at {r.homeTitle}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <Reveal className="grid gap-8 rounded-[2rem] bg-pine-900 p-8 text-cream sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-light sm:text-5xl">
                Come stay with us, <em className="text-cedar-300 italic">or work with us.</em>
              </h2>
              <p className="mt-3 max-w-lg text-cream/75">
                Planning a trip, or own a home in the Berkshires? Either way, we&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/properties" size="lg">
                Find your stay <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/property-management"
                size="lg"
                variant="ghost"
                className="border border-cream/30 text-cream hover:bg-cream/10"
              >
                List your home
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
