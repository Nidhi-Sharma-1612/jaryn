import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  ClipboardList,
  FileBarChart,
  House,
  Mail,
  PackageCheck,
  PhoneCall,
  Quote,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Faq } from "@/components/contact/Faq";
import { OwnerInquiryForm } from "@/components/owners/OwnerInquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ownerFaqs, ownerIntro, ownerServices, ownerSteps, ownerTestimonials, ownerValues } from "@/lib/data/owners";
import { ButtonLink } from "@/components/ui/Button";
import { getListing, getPortfolioStats } from "@/lib/services/listings";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vacation Rental Property Management in the Berkshires",
  description:
    "Boutique, locally rooted short-term rental management in the Berkshires: photography, listing build-out, pricing, owner reporting, turnovers and restocks.",
};

const serviceIcons: LucideIcon[] = [Camera, ClipboardList, TrendingUp, FileBarChart, Sparkles, PackageCheck];

export default async function PropertyManagementPage() {
  const [summerwood, bidwell, stats] = await Promise.all([getListing(409114), getListing(344520), getPortfolioStats()]);
  const hero = summerwood?.listingImages[0]?.url;
  const side = bidwell?.listingImages[0]?.url;

  return (
    <>
      {/* Hero + inquiry form */}
      <section className="relative isolate overflow-hidden bg-pine-900 pt-32 pb-20 text-cream sm:pt-40 sm:pb-28">
        {hero && <Image src={hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pine-900/95 via-pine-900/80 to-pine-900/50" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_480px] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-cedar-300">Property management</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] font-light tracking-tight text-balance sm:text-6xl">
              Does your property belong in <em className="text-cedar-300 italic">our collection?</em>
            </h1>
            <p className="mt-6 max-w-xl text-cream/80 sm:text-lg">{ownerIntro.lead}</p>
            <a
              href={site.phone.href}
              className="mt-8 inline-flex items-center gap-2 text-sm text-cream/85 underline-offset-4 hover:text-cream hover:underline"
            >
              <PhoneCall className="size-4 text-cedar-300" /> Rather talk? Call {site.founder.name.split(" ")[0]} at {site.phone.display}
            </a>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8">
              <Stat value={String(stats.homes)} label="Homes we care for" />
              <Stat value="4.88★" label="Average guest rating" />
              <Stat value="Local" label="In-house cleaning team" />
            </dl>
          </Reveal>
          <Reveal delay={0.1} id="inquiry" className="min-w-0 scroll-mt-24">
            <OwnerInquiryForm />
          </Reveal>
        </div>
      </section>

      {/* Boots on the ground + values */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl lg:aspect-4/5">
            {side && <Image src={side} alt="Lakefront deck at a home we manage" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />}
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  We&apos;re your boots <em className="italic">on the ground</em>
                </>
              }
              intro={ownerIntro.bootsOnTheGround}
            />
            <Reveal delay={0.1} className="mt-10 space-y-6">
              <p className="text-sm font-medium text-ink">
                What we stand for: we manage every home the way we&apos;d want our own managed.
              </p>
              {ownerValues.map((v, i) => (
                <div key={v.title} className="flex gap-5 border-t border-stone pt-6">
                  <span className="font-display text-sm text-cedar tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-2xl font-light text-pine">{v.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/70">{v.body}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="What we handle"
              title={
                <>
                  Full-service management, <em className="italic">personally delivered</em>
                </>
              }
              intro="A complete suite of management services, delivered with the personal touch that only a boutique, locally rooted company can provide."
            />
            <Reveal delay={0.1}>
              <ButtonLink href="#inquiry" variant="pine" className="mt-8">
                Talk to us about your home <ArrowRight className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>
          <ul className="divide-y divide-stone border-y border-stone">
            {ownerServices.map((s, i) => {
              const Icon = serviceIcons[i] ?? House;
              return (
                <li key={s.title}>
                  <Reveal delay={(i % 3) * 0.05} className="flex gap-5 py-6 sm:gap-7 sm:py-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-cedar">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-baseline gap-3 font-display text-2xl leading-tight font-light text-pine">
                        {s.title}
                      </p>
                      <p className="mt-1 text-[15px] leading-relaxed text-moss">{s.body}</p>
                    </div>
                    <span className="ml-auto hidden font-display text-sm text-cedar tabular-nums sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From first call to <em className="italic">first booking</em>
              </>
            }
            align="center"
          />
          <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-stone lg:block" />
            {ownerSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="relative lg:text-center">
                <span className="relative grid size-12 place-items-center rounded-full bg-pine font-display text-lg text-cream ring-8 ring-cream-50 lg:mx-auto">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-xl font-light text-pine">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-moss">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Owner testimonials */}
      <section className="bg-pine py-24 text-cream sm:py-32">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-cedar-300">From our homeowners</p>
            <Quote className="mx-auto mt-8 size-10 text-cedar-300/60" strokeWidth={1} />
            <blockquote className="mt-4 font-display text-2xl leading-snug font-light text-balance sm:text-4xl">
              &ldquo;{ownerTestimonials[0].quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-medium">{ownerTestimonials[0].name}</p>
            <p className="text-xs text-cream/60">Homeowner</p>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {ownerTestimonials.slice(1).map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.08} className="flex flex-col rounded-3xl border border-cream/10 bg-pine-900/40 p-7">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-cream/85">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-5 text-sm font-medium">
                  {t.name} <span className="font-normal text-cream/60">· Homeowner</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + direct contact */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <Reveal className="min-w-0">
            <p className="eyebrow text-cedar">Owner FAQ</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-pine sm:text-5xl">
              Questions from <em className="italic">homeowners</em>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-moss">
              Prefer to talk it through? Reach {site.founder.name} and the team directly.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a href={site.phone.href} className="inline-flex items-center gap-3 text-[15px] text-pine hover:text-cedar">
                <span className="grid size-10 place-items-center rounded-full bg-white text-cedar">
                  <PhoneCall className="size-4" />
                </span>
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex min-w-0 items-center gap-3 text-[15px] text-pine hover:text-cedar">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-cedar">
                  <Mail className="size-4" />
                </span>
                {/* Long address: allow it to wrap on the narrowest phones. */}
                <span className="min-w-0 [overflow-wrap:anywhere]">{site.email}</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={ownerFaqs} />
          </Reveal>
        </div>
      </section>
      {/* Closing CTA */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-pine-900 p-8 text-cream sm:p-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-light sm:text-5xl">
                Let&apos;s see if we&apos;re <em className="text-cedar-300 italic">a good fit.</em>
              </h2>
              <p className="mt-3 max-w-lg text-cream/75">
                No commitment. Tell us about your home and we&apos;ll be in touch.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#inquiry" size="lg">
                Get started <ArrowRight className="size-4" />
              </ButtonLink>
              <a
                href={site.phone.href}
                className="inline-flex h-13 items-center gap-2 rounded-full border border-cream/30 px-7 text-[15px] font-medium transition hover:bg-cream/10"
              >
                <PhoneCall className="size-4" /> {site.phone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-light">{value}</dd>
      <p className="text-xs text-cream/65">{label}</p>
    </div>
  );
}
