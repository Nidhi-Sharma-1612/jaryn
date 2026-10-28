import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { ContactDetails, TeamStatus } from "@/components/contact/ContactDetails";
import { ContactForm, ContactFormFromSearch } from "@/components/contact/ContactForm";
import { Faq } from "@/components/contact/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { getListing, getListings, getTowns } from "@/lib/services/listings";
import { site } from "@/lib/site";
import { splitListingName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about a Berkshires vacation home or your booking? Our local team is here to help every day from 9am to 9pm.",
};

const faqs = [
  {
    q: "Why should I book direct instead of on Airbnb or VRBO?",
    a: "It's the same home, cleaned and cared for by the same local team, without the platform's guest service fee. You also get to talk with us directly about early check-in, special requests and future stays.",
  },
  {
    q: "What time are check-in and check-out?",
    a: "Check-in is after 3:00 PM and check-out is before 11:00 AM. If you need a little flexibility, just ask and we'll do our best around other guests' bookings.",
  },
  {
    q: "Can I bring my dog?",
    a: "Dogs are welcome in our pet-friendly homes for a one-time fee of $100. Most homes allow up to 2 dogs and some allow 1, so please add your pet to the booking so we know ahead of time.",
  },
  {
    q: "What's included in every home?",
    a: "Every home is professionally cleaned and inspected before you arrive, and comes with towels, linens, bath products and at least a morning's worth of coffee to get you started.",
  },
  {
    q: "Who do I contact during my stay?",
    a: "Our full-time local team is available every day from 9am to 9pm at (413) 429-9558. You'll also find our contact details in your guest packet before arrival.",
  },
];

export default async function ContactPage() {
  const [listings, towns, garfield, bidwell] = await Promise.all([
    getListings(),
    getTowns(),
    getListing(351827),
    getListing(344520),
  ]);
  const homes = listings.map((l) => splitListingName(l.name).title).sort();
  const heroImage = garfield?.listingImages[0]?.url;
  const cardImage = bidwell?.listingImages[0]?.url ?? heroImage;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-pine-900 pt-36 pb-36 text-cream sm:pt-44 sm:pb-44">
        {heroImage && (
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[center_60%]" />
        )}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-pine-900/70 via-pine-900/55 to-pine-900/85" />
        <Reveal className="container-x text-center">
          <p className="eyebrow text-cedar-300">Contact</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-[1.02] font-light tracking-tight text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.3)] sm:text-7xl">
            We&apos;re here to <em className="text-cedar-300 italic">help you plan</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/85 sm:text-lg">
            Questions about a home, your dates or the area? Talk to our local team. Real people, real answers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <TeamStatus className="bg-pine-900/60 backdrop-blur" />
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-cream/20"
            >
              <Phone className="size-3.5" /> {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-cream/20"
            >
              <Mail className="size-3.5" /> {site.email}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 -mt-20 pb-24 sm:-mt-28 sm:pb-32">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <Reveal className="min-w-0">
            <Suspense fallback={<ContactForm homes={homes} />}>
              <ContactFormFromSearch homes={homes} />
            </Suspense>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24">
            <Reveal delay={0.1}>
              <ContactDetails towns={towns.length} />
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/properties"
                className="group relative block aspect-16/10 overflow-hidden rounded-3xl bg-stone text-cream"
              >
                {cardImage && (
                  <Image
                    src={cardImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-pine-900/90 via-pine-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="font-display text-2xl leading-tight font-light">Ready to pick your dates?</p>
                    <p className="mt-1 text-sm text-cream/80">Browse {listings.length} homes, no booking fees.</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-pine transition group-hover:bg-cedar group-hover:text-cream">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
          <Reveal>
            <p className="eyebrow text-cedar">Good to know</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-pine sm:text-5xl">
              Frequently asked <em className="italic">questions</em>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-moss">
              Can&apos;t find your answer here? Send us a message above and our local team will help.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
