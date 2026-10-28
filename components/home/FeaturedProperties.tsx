import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ListingSummary } from "@/lib/types/hostaway";

export function FeaturedProperties({ listings, total }: { listings: ListingSummary[]; total: number }) {
  return (
    <section id="homes" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Guest favorites"
            title={
              <>
                Homes our guests <em className="italic">keep coming back to</em>
              </>
            }
            intro="Professionally cleaned and inspected before every arrival, and stocked with linens, towels and at least a morning's worth of coffee."
          />
          <ButtonLink href="/properties" variant="outline" className="hidden shrink-0 md:inline-flex">
            View all {total} homes <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <Stagger className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => (
            <StaggerItem key={listing.id} index={i}>
              <PropertyCard listing={listing} priority={i < 3} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-14 flex justify-center md:hidden">
          <ButtonLink href="/properties" variant="outline">
            View all {total} homes <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
