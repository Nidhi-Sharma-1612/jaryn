import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta({ image }: { image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-pine-900 py-28 text-cream sm:py-36">
      <Image src={image} alt="" fill sizes="100vw" className="-z-10 object-cover object-[center_40%] opacity-60" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-pine-900/70 via-pine-900/60 to-pine-900/85" />

      <Reveal className="container-x text-center">
        <p className="eyebrow text-cedar-300">Ready when you are</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-light text-balance sm:text-6xl">
          Your Berkshires getaway <em className="text-cedar-300 italic">starts here.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-cream/80 sm:text-lg">
          Choose your home, pick your dates and book directly with our local team, with no booking fees.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/properties" size="lg">
            Browse all homes <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            size="lg"
            variant="ghost"
            className="border border-cream/30 text-cream hover:bg-cream/10"
          >
            Talk to our team
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
