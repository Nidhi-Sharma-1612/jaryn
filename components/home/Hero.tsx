import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { SearchBar } from "./SearchBar";

export function Hero({ towns, homes }: { towns: string[]; homes: number }) {
  return (
    // No overflow-hidden here: the search dropdowns must be able to extend past the hero.
    <section className="relative z-20 flex min-h-svh items-center bg-pine-900 pt-28 pb-20 text-cream">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={site.heroImage}
          alt="Lakeside dock with teak loungers on a Berkshires lake"
          fill
          priority
          // The panoramic shot is cropped hard on tall screens, so request a wider source there.
          sizes="(max-width: 768px) 250vw, 100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(20_39_32/0.7)_0%,rgb(20_39_32/0.45)_55%,rgb(20_39_32/0.3)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-t from-pine-900/80 via-transparent to-black/30" />
      </div>

      <div className="relative container-x text-center">
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow flex items-center justify-center gap-3 text-cream/90">
            <span className="hidden h-px w-10 bg-cedar-300 sm:block" /> The Berkshires, Massachusetts{" "}
            <span className="hidden h-px w-10 bg-cedar-300 sm:block" />
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1] font-light tracking-tight text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.35)] sm:text-7xl lg:text-[5.5rem]">
            Your Berkshires escape,{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="font-normal text-cedar-300 italic">booked direct.</em>
              <BrushUnderline />
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            {homes} lakefront cabins, ski chalets and homes near Tanglewood, cared for by a local team. Book with
            us and skip the platform fees.
          </p>
        </Reveal>

        {/* z-index keeps the open dropdowns above everything rendered after the search bar. */}
        <Reveal delay={0.15} className="relative z-30 mx-auto mt-10 max-w-4xl text-left">
          <SearchBar towns={towns} />
        </Reveal>
      </div>

      <a
        href="#homes"
        aria-label="Scroll to homes"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] tracking-[0.3em] text-cream/70 uppercase transition hover:text-cream md:flex"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}

function BrushUnderline() {
  return (
    <svg
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute -bottom-2 left-0 h-3 w-full text-cedar sm:-bottom-3 sm:h-4"
    >
      <path
        d="M3 11c48-6 98-8 150-7 49 1 96 3 144 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
