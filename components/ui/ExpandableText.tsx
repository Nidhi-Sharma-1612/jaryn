"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ExpandableText({ text, className }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={className}>
      <div
        className={cn(
          "relative overflow-hidden text-[15px] leading-relaxed whitespace-pre-line text-ink/80",
          !expanded && "max-h-64",
        )}
      >
        {text}
        {!expanded && <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-cream-50 to-transparent" />}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 text-sm font-medium text-pine underline underline-offset-4 hover:text-cedar"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
