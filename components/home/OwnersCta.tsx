import Image from "next/image";
import { ArrowRight, Check, Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ownerIntro, ownerTestimonials, ownerValues } from "@/lib/data/owners";

export function OwnersCta({ image }: { image: string }) {
  const testimonial = ownerTestimonials[0];

  return (
    <section id="owners" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-cedar">For homeowners</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-balance text-pine sm:text-5xl">
            Does your property belong in <em className="italic">our collection?</em>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/75">{ownerIntro.lead}</p>

          <ul className="mt-8 space-y-4">
            {ownerValues.map((v) => (
              <li key={v.title} className="flex gap-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-pine text-cream">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-medium text-ink">{v.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-moss">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <ButtonLink href="/property-management" variant="pine" size="lg" className="mt-10">
            List your home with us <ArrowRight className="size-4" />
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl lg:aspect-4/5">
            <Image src={image} alt="A home managed by Berkshire Vacation Rental Co." fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <figure className="relative -mt-16 ml-auto max-w-sm rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-pine/15 sm:mr-6">
            <Quote className="size-6 text-cedar/40" strokeWidth={1.25} />
            <blockquote className="mt-2 text-sm leading-relaxed text-ink/80">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-xs font-medium text-pine">{testimonial.name} · Homeowner</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
