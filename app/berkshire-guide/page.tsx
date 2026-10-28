import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { GuideExplorer, type GuidePlace } from "@/components/guide/GuideExplorer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { guideCategories, guideIntro, guidePlaces, seasons } from "@/lib/data/guide";
import { getListing, getListings } from "@/lib/services/listings";
import { splitListingName, toFiveStar } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Berkshire Guide: Things to Do in the Berkshires",
  description:
    "Our local guide to the Berkshires by season: Tanglewood, the Norman Rockwell Museum, Lake Garfield, ski mountains, trails and the best places to eat, with homes nearby.",
};

export default async function BerkshireGuidePage() {
  const [listings, garfield, forest] = await Promise.all([getListings(), getListing(351827), getListing(344518)]);
  const hero = garfield?.listingImages[0]?.url;
  const closing = forest?.listingImages[0]?.url;

  // Two best-rated homes in each place's towns.
  const places: GuidePlace[] = guidePlaces.map((place) => ({
    ...place,
    nearby: listings
      .filter((l) => place.homesTowns.includes(l.city))
      .sort((a, b) => b.averageReviewRating - a.averageReviewRating)
      .slice(0, 2)
      .map((l) => ({
        id: l.id,
        title: splitListingName(l.name).title,
        city: l.city,
        price: l.price,
        rating: toFiveStar(l.averageReviewRating),
        image: l.listingImages[0]?.url ?? "",
      })),
  }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-pine-900 pt-32 pb-20 text-cream sm:pt-40 sm:pb-24">
        {hero && <Image src={hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-55" />}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-pine-900/70 via-pine-900/50 to-pine-900/85" />
        <Reveal className="container-x max-w-4xl text-center">
          <p className="eyebrow text-cedar-300">Berkshire Guide</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {guideIntro.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-cream/80 sm:text-lg">{guideIntro.lead}</p>
          <a
            href="#plan"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-medium transition hover:bg-cream/10"
          >
            Start planning <ArrowDown className="size-4" />
          </a>
        </Reveal>
      </section>

      <div id="plan" className="scroll-mt-16">
        <GuideExplorer places={places} categories={guideCategories} seasons={seasons} />
      </div>

      <section className="relative isolate overflow-hidden bg-pine-900 py-24 text-center text-cream sm:py-32">
        {closing && <Image src={closing} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-45" />}
        <div className="absolute inset-0 -z-10 bg-pine-900/60" />
        <Reveal className="container-x">
          <h2 className="font-display text-4xl font-light text-balance sm:text-6xl">
            The Berkshires. <em className="text-cedar-300 italic">Come see for yourself.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-cream/80">
            Want personal recommendations for your dates? Our local team is happy to help plan your trip.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/properties" size="lg">
              Find your home <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="/contact"
              size="lg"
              variant="ghost"
              className="border border-cream/30 text-cream hover:bg-cream/10"
            >
              Ask a local
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
