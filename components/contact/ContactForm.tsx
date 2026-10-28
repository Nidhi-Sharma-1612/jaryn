"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Check, ChevronDown, Minus, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { DateRangeCalendar, type DateRange } from "@/components/ui/DateRangePicker";
import { Popover } from "@/components/ui/Popover";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const topics = [
  { key: "stay", label: "Planning a stay", trip: true },
  { key: "home", label: "A specific home", trip: true },
  { key: "reservation", label: "My reservation", trip: false },
  { key: "owners", label: "Owners & partners", trip: false },
  { key: "other", label: "Something else", trip: false },
] as const;

type TopicKey = (typeof topics)[number]["key"];

// Phase 1: composes an email in the guest's mail app so no message is ever lost.
// Swap for a server action + email provider (e.g. Resend) when one is set up.
export function ContactForm({ homes, initialHome }: { homes: string[]; initialHome?: string }) {
  const presetHome = initialHome && homes.includes(initialHome) ? initialHome : "";
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState<TopicKey>(presetHome ? "home" : "stay");
  const [home, setHome] = useState(presetHome);
  const [range, setRange] = useState<DateRange>();
  const [guests, setGuests] = useState(2);
  const [datesOpen, setDatesOpen] = useState(false);

  const withTrip = topics.find((t) => t.key === topic)?.trip ?? false;
  const dateLabel = range?.from
    ? `${format(range.from, "MMM d")}${range.to ? ` – ${format(range.to, "MMM d, yyyy")}` : ""}`
    : "";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const topicLabel = topics.find((t) => t.key === topic)!.label;

    const details = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      withTrip && home && `Home: ${home}`,
      withTrip && dateLabel && `Dates: ${dateLabel}`,
      withTrip && `Guests: ${guests}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${get("message")}`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${topicLabel}: ${get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="rounded-3xl border border-stone bg-white p-6 shadow-2xl shadow-pine/10 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[480px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-16 place-items-center rounded-full bg-pine text-cream">
              <Check className="size-7" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-light text-pine">Almost there: hit send</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-moss">
              We opened your email app with everything filled in. Send it and our local team will get back to you.
              Nothing opened? Email us at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-pine underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-8 rounded-full border border-stone px-5 py-2.5 text-sm font-medium text-pine transition hover:border-pine"
            >
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -12 }} onSubmit={submit}>
            <h2 className="font-display text-3xl font-light text-pine sm:text-4xl">Send us a message</h2>
            <p className="mt-2 text-sm text-moss">A few details help us give you a useful answer the first time.</p>

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-medium text-ink">What can we help with?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <label
                    key={t.key}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cedar",
                      topic === t.key
                        ? "border-pine bg-pine text-cream"
                        : "border-stone bg-cream-50 text-ink/80 hover:border-pine/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t.key}
                      checked={topic === t.key}
                      onChange={() => setTopic(t.key)}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" required autoComplete="name" placeholder="Jane Smith" />
              <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                optional
                placeholder="For a quicker call back"
                className="sm:col-span-2"
              />
            </div>

            <AnimatePresence initial={false}>
              {withTrip && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mt-6 rounded-2xl bg-cream p-5">
                    <p className="text-[11px] font-medium tracking-[0.2em] text-moss uppercase">Your trip (optional)</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-[1.3fr_1.2fr_auto]">
                      <label>
                        <span className="sr-only">Home</span>
                        <span className="relative block">
                          <select
                            value={home}
                            onChange={(e) => setHome(e.target.value)}
                            className={cn(inputClasses, "appearance-none bg-white pr-10")}
                          >
                            <option value="">Any home</option>
                            {homes.map((h) => (
                              <option key={h}>{h}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-moss" />
                        </span>
                      </label>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setDatesOpen((v) => !v)}
                          aria-expanded={datesOpen}
                          className={cn(inputClasses, "flex items-center gap-2 bg-white text-left")}
                        >
                          <CalendarDays className="size-4 shrink-0 text-cedar" />
                          <span className={cn("truncate", !dateLabel && "text-ink/40")}>{dateLabel || "Add dates"}</span>
                        </button>
                        {dateLabel && (
                          <button
                            type="button"
                            aria-label="Clear dates"
                            onClick={() => setRange(undefined)}
                            className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full text-moss hover:bg-ink/5 hover:text-ink"
                          >
                            <X className="size-3.5" />
                          </button>
                        )}
                        <Popover
                          open={datesOpen}
                          onClose={() => setDatesOpen(false)}
                          className="left-0 w-max max-w-[calc(100vw-3rem)] sm:-left-24"
                        >
                          <DateRangeCalendar value={range} onChange={setRange} months={1} />
                          <div className="flex justify-end border-t border-stone pt-3">
                            <button
                              type="button"
                              onClick={() => setDatesOpen(false)}
                              className="rounded-full bg-pine px-4 py-1.5 text-sm text-cream"
                            >
                              Done
                            </button>
                          </div>
                        </Popover>
                      </div>

                      <div className="flex h-12 items-center justify-between gap-3 rounded-2xl border border-stone bg-white px-3">
                        <span className="text-sm text-ink/70">Guests</span>
                        <div className="flex items-center gap-2">
                          <StepButton label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests((g) => g - 1)}>
                            <Minus className="size-3" />
                          </StepButton>
                          <span className="w-5 text-center text-sm font-medium tabular-nums">{guests}</span>
                          <StepButton label="More guests" disabled={guests >= 16} onClick={() => setGuests((g) => g + 1)}>
                            <Plus className="size-3" />
                          </StepButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-ink">Your message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={
                  withTrip
                    ? "Tell us about your trip: who's coming, what you'd love to do, any special requests…"
                    : "How can we help?"
                }
                className="w-full resize-y rounded-2xl border border-stone bg-cream-50 px-4 py-3 text-sm leading-relaxed outline-none transition placeholder:text-ink/35 focus:border-pine focus:bg-white focus:ring-4 focus:ring-pine/10"
              />
            </label>

            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-moss">
                We only use your details to reply to you.{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-pine">
                  Privacy Policy
                </Link>
              </p>
              <button
                type="submit"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-cedar px-8 text-[15px] font-medium text-cream shadow-lg shadow-cedar/25 transition hover:bg-cedar-600"
              >
                Send message <ArrowRight className="size-4" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClasses =
  "h-12 w-full rounded-2xl border border-stone bg-cream-50 px-4 text-sm outline-none transition placeholder:text-ink/35 focus:border-pine focus:bg-white focus:ring-4 focus:ring-pine/10";

function Field({
  label,
  optional,
  className,
  ...props
}: React.ComponentProps<"input"> & { label: string; optional?: boolean }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-moss">(optional)</span>}
      </span>
      <input className={inputClasses} {...props} />
    </label>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-7 place-items-center rounded-full border border-ink/15 transition hover:border-pine disabled:opacity-30"
    >
      {children}
    </button>
  );
}

/** Pre-selects the home from "Ask about this home" links (/contact?home=<name>). Render inside <Suspense>. */
export function ContactFormFromSearch({ homes }: { homes: string[] }) {
  const home = useSearchParams().get("home") ?? undefined;
  return <ContactForm key={home} homes={homes} initialHome={home} />;
}
