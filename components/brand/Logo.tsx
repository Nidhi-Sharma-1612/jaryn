import { cn } from "@/lib/utils";

// The client's logo is a single-color PNG with a transparent tree cut-out, so it is
// drawn as a CSS mask filled with currentColor and can sit on light or dark backgrounds.
function MaskedImage({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block bg-current", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "left center",
        WebkitMaskPosition: "left center",
      }}
    />
  );
}

/** Pebble + pine tree mark on its own. */
export function LogoMark({ className }: { className?: string }) {
  return <MaskedImage src="/brand/mark.png" className={cn("size-9", className)} />;
}

/** Full horizontal logo: mark + "Berkshire Vacation Rental Co." wordmark. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  if (compact) return <LogoMark className={className} />;
  return (
    <span className={cn("inline-block", className)}>
      <MaskedImage src="/brand/logo.png" className="aspect-[2250/525] h-10 lg:h-12" />
      <span className="sr-only">Berkshire Vacation Rental Co.</span>
    </span>
  );
}
