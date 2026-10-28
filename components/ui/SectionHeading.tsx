import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("eyebrow", tone === "dark" ? "text-cedar" : "text-cedar/90")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl",
          tone === "dark" ? "text-pine" : "text-cream",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-[15px] leading-relaxed text-pretty",
            tone === "dark" ? "text-moss" : "text-cream/75",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
