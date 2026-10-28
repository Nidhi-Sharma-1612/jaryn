"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = !overHero || scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-ink/5 bg-cream-50/90 text-pine backdrop-blur-xl"
            : "bg-linear-to-b from-black/40 to-transparent text-cream",
        )}
      >
        <div className={cn("container-x flex items-center justify-between transition-all duration-500", solid ? "h-16" : "h-20")}>
          <Link href="/" aria-label="Berkshire Vacation Rental home" onClick={() => setOpen(false)}>
            <Logo className={cn("transition-colors duration-500", solid ? "text-charcoal" : "text-cream")} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="mr-2 hidden items-center gap-2 text-sm font-medium xl:inline-flex"
            >
              <Phone className="size-4" /> {site.phone.display}
            </a>
            <ButtonLink href="/properties" size="sm" className="hidden sm:inline-flex">
              Book your stay
            </ButtonLink>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

      </header>

      {/* Outside <header>: its backdrop-blur would make it the containing block for this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-cream-50 pb-10 text-pine lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-stone py-4 font-display text-3xl font-light"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-x mt-8 flex flex-col gap-3">
              <ButtonLink href="/properties" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Book your stay
              </ButtonLink>
              <a
                href={site.phone.href}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-pine/20 text-[15px] font-medium"
              >
                <Phone className="size-4" /> Call {site.phone.display}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
