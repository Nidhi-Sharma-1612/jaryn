import Image from "next/image";
import { ArrowRight, BadgePercent, HeartHandshake, Package, PhoneCall, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

// "The BVR Co. Experience" copy from the original site, plus the book-direct promise.
const promises: { icon: LucideIcon; title: string; body: string }[] = [
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
    body: "Every property is cleaned, stocked, and prepared so your only job is to enjoy the Berkshires.",
  },
  {
    icon: BadgePercent,
    title: "No booking fees",
    body: "Book directly with us and skip the platform service fee.",
  },
];

export function MeetHost({ image }: { image: string }) {
  return (
    <section id="host" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative pb-12 sm:pr-12">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            {/* Swap for a portrait of Jaryn once provided. */}
            <Image src={image} alt="Kayaks on the shore at a Berkshire Vacation Rental home" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          {/* A real guest review, quoted verbatim. */}
          <figure className="absolute right-0 bottom-0 max-w-[80%] rounded-2xl border-[6px] border-cream-50 bg-pine p-6 text-cream shadow-2xl shadow-pine/20 sm:max-w-xs">
            <blockquote className="font-display text-lg leading-snug font-light italic">
              &ldquo;Jaryn was a great, responsive host and we really appreciated the apple cider donuts!&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-xs text-cream/70">Michael &amp; Olya · stayed at Cheshire Cove</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow text-cedar">Meet the founder</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-pine sm:text-5xl">
            Boutique management, <em className="italic">rooted in the Berkshires</em>
          </h2>
          <p className="mt-5 text-sm font-medium text-ink">
            {site.founder.name} <span className="font-normal text-moss">· {site.founder.title}</span>
          </p>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/75">
            <p>
              Berkshire Vacation Rental Co. was built from firsthand experience. While getting our own short-term
              rentals off the ground, we quickly realized how challenging it was to navigate listings, local markets,
              and the endless details that come with hosting — without any guidance or support.
            </p>
            <p>
              That experience became our foundation. Today our local team cares for homes from Lenox to Monterey, and
              when you book direct, you&apos;re booking with us, not a platform.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {promises.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-stone bg-white p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream text-cedar">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-moss">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="pine">
              Say hello to {site.host} <ArrowRight className="size-4" />
            </ButtonLink>
            <a
              href={site.phone.href}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-6 text-sm font-medium text-ink transition hover:border-ink/40"
            >
              <PhoneCall className="size-4 text-cedar" /> {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
