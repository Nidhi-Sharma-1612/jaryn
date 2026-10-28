"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { parseTrip, tripQuery } from "@/lib/search";

const classes = "inline-flex items-center gap-2 text-sm text-moss transition hover:text-pine";

/** Back to the results for the same trip. Render inside <Suspense> with <BackToResultsFallback />. */
export function BackToResults() {
  const params = useSearchParams();
  const hasTrip = params.has("checkIn") || params.has("adults");
  const href = hasTrip ? `/properties?${tripQuery(parseTrip(params))}` : "/properties";
  return (
    <Link href={href} className={classes}>
      <ArrowLeft className="size-4" /> {hasTrip ? "Back to your search" : "All homes"}
    </Link>
  );
}

export function BackToResultsFallback() {
  return (
    <Link href="/properties" className={classes}>
      <ArrowLeft className="size-4" /> All homes
    </Link>
  );
}
