"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Copy, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

/** Whether the local team is within 9am–9pm Berkshires (Eastern) time right now. */
function useTeamOnline() {
  const [online, setOnline] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const hour = Number(
        new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/New_York" }).format(
          new Date(),
        ),
      );
      setOnline(hour >= OPEN_HOUR && hour < CLOSE_HOUR);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return online;
}

export function TeamStatus({ className }: { className?: string }) {
  const online = useTeamOnline();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
        online === false ? "bg-cream/10 text-cream/80" : "bg-emerald-400/15 text-emerald-200",
        className,
      )}
    >
      <span className="relative flex size-2">
        {online && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={cn("relative size-2 rounded-full", online === false ? "bg-cream/50" : "bg-emerald-400")} />
      </span>
      {online === null ? "Local team, 9am – 9pm daily" : online ? "Our team is online now" : "We're back at 9am Eastern"}
    </span>
  );
}

export function ContactDetails({ towns }: { towns: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div className="rounded-3xl bg-pine p-7 text-cream sm:p-8">
      <p className="eyebrow text-cedar-300">Talk to a local</p>
      <p className="mt-3 font-display text-3xl leading-tight font-light">Real people, right here in the Berkshires.</p>
      <TeamStatus className="mt-5" />

      <ul className="mt-7 divide-y divide-cream/10 border-t border-cream/10">
        <li className="flex items-center gap-4 py-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream/10 text-cedar-300">
            <Phone className="size-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-cream/60">Call or text</p>
            <a href={site.phone.href} className="block text-[15px] hover:text-cedar-300">
              {site.phone.display}
            </a>
          </div>
        </li>
        <li className="flex items-center gap-4 py-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream/10 text-cedar-300">
            <Mail className="size-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-cream/60">Email</p>
            <a href={`mailto:${site.email}`} className="block truncate text-[15px] hover:text-cedar-300">
              {site.email}
            </a>
          </div>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-cream/20 transition hover:bg-cream/10"
          >
            {copied ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
          </button>
        </li>
        <li className="flex items-center gap-4 py-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream/10 text-cedar-300">
            <Clock className="size-5" strokeWidth={1.5} />
          </span>
          <div>
            <p className="text-xs text-cream/60">Hours</p>
            <p className="text-[15px]">Every day, 9am – 9pm Eastern</p>
          </div>
        </li>
        <li className="flex items-center gap-4 pt-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream/10 text-cedar-300">
            <MapPin className="size-5" strokeWidth={1.5} />
          </span>
          <div>
            <p className="text-xs text-cream/60">Where</p>
            <p className="text-[15px]">{towns} towns, from Lenox to Monterey</p>
          </div>
        </li>
      </ul>
      <p aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </p>
    </div>
  );
}
