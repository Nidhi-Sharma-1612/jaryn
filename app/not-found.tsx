import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow text-cedar">Page not found</p>
      <h1 className="mt-4 font-display text-5xl font-light text-pine">This trail doesn&apos;t lead anywhere</h1>
      <p className="mt-4 max-w-md text-moss">The home or page you&apos;re looking for may have moved. Let&apos;s get you back on track.</p>
      <ButtonLink href="/properties" className="mt-8">
        Browse all homes
      </ButtonLink>
    </div>
  );
}
