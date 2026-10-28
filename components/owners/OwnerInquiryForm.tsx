"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";

// Like the guest contact form: composes an email so no inquiry is lost until an email provider is set up.
export function OwnerInquiryForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const details = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      `Property town: ${get("town")}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${get("questions") || "I'd like to learn more about listing my home with you."}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Homeowner inquiry: ${get("name")} (${get("town")})`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-black/20 sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="flex min-h-[380px] flex-col items-center justify-center text-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-pine text-cream">
              <Check className="size-6" />
            </span>
            <p className="mt-5 font-display text-3xl font-light text-pine">Almost there: hit send</p>
            <p className="mt-2 max-w-xs text-sm text-moss">
              Your email app opened with your details. Send it and we&apos;ll be in touch, or call us at{" "}
              <a href={site.phone.href} className="font-medium text-pine underline underline-offset-4">
                {site.phone.display}
              </a>
              .
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-medium text-pine underline underline-offset-4">
              Edit my details
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="font-display text-3xl font-light text-pine">Let&apos;s see if we&apos;re a good fit</p>
              <p className="mt-1 text-sm text-moss">Tell us a little about your home. No commitment.</p>
            </div>
            <Field label="Your name" name="name" autoComplete="name" required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="What town is your property in?" name="town" required />
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-medium">Specific questions?</span>
              <textarea
                name="questions"
                rows={4}
                className="w-full resize-y rounded-2xl border border-stone bg-cream-50 px-4 py-3 text-sm outline-none transition focus:border-pine focus:bg-white focus:ring-4 focus:ring-pine/10"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cedar px-7 text-sm font-medium text-cream shadow-lg shadow-cedar/25 transition hover:bg-cedar-600 sm:col-span-2 sm:justify-self-start"
            >
              Send inquiry <ArrowRight className="size-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, ...props }: React.ComponentProps<"input"> & { label: string }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium">
        {label}
        {!props.required && <span className="ml-1.5 font-normal text-moss">(optional)</span>}
      </span>
      <input
        className="h-12 w-full rounded-2xl border border-stone bg-cream-50 px-4 text-sm outline-none transition focus:border-pine focus:bg-white focus:ring-4 focus:ring-pine/10"
        {...props}
      />
    </label>
  );
}
