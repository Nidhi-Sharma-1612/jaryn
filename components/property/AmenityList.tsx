"use client";

import { useState } from "react";
import {
  Anchor,
  Bath,
  Car,
  Check,
  Coffee,
  Dog,
  Flame,
  Laptop,
  Mountain,
  Sailboat,
  Snowflake,
  Sun,
  TreePine,
  Tv,
  UtensilsCrossed,
  WashingMachine,
  WavesLadder,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { ListingAmenity } from "@/lib/types/hostaway";

const iconRules: [RegExp, LucideIcon][] = [
  [/wifi|wireless|internet/i, Wifi],
  [/pool|hot tub/i, WavesLadder],
  [/dock|lake|waterfront|beach/i, Anchor],
  [/kayak|canoe|water sports/i, Sailboat],
  [/fire|wood stove/i, Flame],
  [/air condition/i, Snowflake],
  [/pet/i, Dog],
  [/tv|sound system/i, Tv],
  [/kitchen|oven|stove|cooking|dish/i, UtensilsCrossed],
  [/coffee|kettle/i, Coffee],
  [/washer|washing|dryer/i, WashingMachine],
  [/parking|ev charger|car/i, Car],
  [/workspace|laptop/i, Laptop],
  [/mountain|ski/i, Mountain],
  [/garden|backyard|forest/i, TreePine],
  [/patio|deck|balcony|outdoor/i, Sun],
  [/tub|shower|bath/i, Bath],
];

// Utility items every home has; hidden so the list highlights what makes each home special.
const hidden = /^internet$|^wireless$|^tub$|smoke|carbon|extinguisher|first aid|emergency|essentials|toilet|hangers|hot water|linens|towels|soap|shampoo|conditioner|shower gel|cleaning products|clothing storage|heating|iron|hair dryer|baking sheet|spices|utensils|wine glasses|toaster|freezer|refrigerator|microwave|dining|hospital|contactless|24-hour|long term|cleaning before|family|rural|romantic|suitable for/i;

export function AmenityList({ amenities }: { amenities: ListingAmenity[] }) {
  const [expanded, setExpanded] = useState(false);
  const featured = amenities.filter((a) => !hidden.test(a.amenityName));
  const shown = expanded ? amenities : featured.slice(0, 12);

  return (
    <div>
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {shown.map(({ amenityName }) => {
          const Icon = iconRules.find(([re]) => re.test(amenityName))?.[1] ?? Check;
          return (
            <li key={amenityName} className="flex items-center gap-3 text-[15px] text-ink/80">
              <Icon className="size-5 shrink-0 text-sage" strokeWidth={1.5} />
              {amenityName.trim()}
            </li>
          );
        })}
      </ul>
      {amenities.length > shown.length || expanded ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-8 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium transition hover:border-pine"
        >
          {expanded ? "Show fewer amenities" : `Show all ${amenities.length} amenities`}
        </button>
      ) : null}
    </div>
  );
}
