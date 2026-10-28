import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { getTowns } from "@/lib/services/listings";
import { collections, navLinks, site } from "@/lib/site";

export async function Footer() {
  const towns = await getTowns();

  return (
    <footer className="bg-pine-900 text-cream/70">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="text-cream">
            <Logo />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Locally owned and managed homes across the Berkshires. Book direct for the best rate and a real
            person on the other end of the line.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-cream">
            <a href={site.phone.href} className="inline-flex items-center gap-2 hover:text-cedar">
              <Phone className="size-4" /> {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-cedar">
              <Mail className="size-4" /> {site.email}
            </a>
          </div>
          <div className="mt-6 flex gap-2">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-cedar hover:text-cedar"
              >
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Explore" className="md:col-span-2">
          {navLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Stays" className="md:col-span-3">
          {collections.map((c) => (
            <FooterLink key={c.key} href={`/properties?collection=${c.key}`}>
              {c.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Towns" className="md:col-span-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {towns.map((t) => (
              <FooterLink key={t} href={`/properties?town=${encodeURIComponent(t)}`}>
                {t}
              </FooterLink>
            ))}
          </div>
        </FooterColumn>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name} All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-cream">
              Terms &amp; Conditions
            </Link>
            <a
              href="https://designbydial.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Design and developed by Design by Dial"
              className="group inline-flex items-center gap-2.5 transition hover:text-cream"
            >
              Design and developed by
              <Image
                src="/company_logo.png"
                alt=""
                width={940}
                height={218}
                className="h-6 w-auto opacity-90 transition group-hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="eyebrow text-cedar">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-sm">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="transition-colors hover:text-cream">
      {children}
    </Link>
  );
}

// Brand marks drawn inline (lucide no longer ships brand icons).
function SocialIcon({ name }: { name: string }) {
  if (name.startsWith("Facebook"))
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5Z" />
    </svg>
  );
}
