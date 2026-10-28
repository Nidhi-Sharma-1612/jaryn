import Link from "next/link";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import type { LegalBlock, LegalDocument } from "@/lib/data/legal";
import { site } from "@/lib/site";
import { slugify } from "@/lib/utils";

export function LegalPage({
  doc,
  title,
  eyebrow,
  summary,
  related,
}: {
  doc: LegalDocument;
  title: string;
  eyebrow: string;
  summary: string;
  related: { label: string; href: string };
}) {
  const sections = doc.sections.map((s) => ({ ...s, id: slugify(s.heading) }));

  return (
    <>
      <section className="bg-pine pt-32 pb-14 text-cream sm:pt-36 sm:pb-16">
        <div className="container-x">
          <p className="eyebrow text-cedar-300">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] font-light tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm text-cream/75 sm:text-base">{summary}</p>
        </div>
      </section>

      <div className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          {/* Phones: collapsible contents. Desktop: always-open sticky list. */}
          <details className="group rounded-2xl border border-stone bg-white p-5 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-pine">
              On this page
              <ChevronDown className="size-4 transition group-open:rotate-180" />
            </summary>
            <Contents sections={sections} className="mt-4" />
          </details>
          <div className="hidden lg:block">
            <p className="text-[11px] font-medium tracking-[0.2em] text-moss uppercase">On this page</p>
            <Contents sections={sections} className="mt-4" />
          </div>
        </aside>

        <article className="max-w-3xl min-w-0 [overflow-wrap:anywhere]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/80">
            {doc.intro.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-stone pt-10 mt-10">
              <h2 className="flex items-baseline gap-3 font-display text-2xl font-light text-pine sm:text-3xl">
                <span className="text-sm text-cedar tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/75">
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </section>
          ))}

          <div className="mt-14 flex flex-col gap-6 rounded-3xl bg-cream p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-2xl font-light text-pine">Questions about this page?</p>
              <p className="mt-1 text-sm text-moss">Our local team is happy to help.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-pine px-5 text-sm font-medium text-cream transition hover:bg-pine-700"
              >
                <Mail className="size-4" /> Email us
              </a>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-full border border-pine/20 px-5 text-sm font-medium text-pine transition hover:bg-white"
              >
                Contact page
              </Link>
            </div>
          </div>

          <Link
            href={related.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-pine underline-offset-4 hover:text-cedar hover:underline"
          >
            Read our {related.label} <ArrowRight className="size-4" />
          </Link>
        </article>
      </div>
    </>
  );
}

function Contents({ sections, className }: { sections: { id: string; heading: string }[]; className?: string }) {
  return (
    <ol className={className}>
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-3 border-l border-stone py-1.5 pl-4 text-sm text-ink/70 transition hover:border-cedar hover:text-pine"
          >
            <span className="text-xs text-cedar tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {s.heading}
          </a>
        </li>
      ))}
    </ol>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  return (
    <ul className="space-y-2 pl-1">
      {block.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-cedar" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
