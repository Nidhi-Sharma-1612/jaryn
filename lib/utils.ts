import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Listing, ListingSummary } from "@/lib/types/hostaway";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number) {
  return usd.format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Hostaway names look like "Garfield Grounds | Lakeside • Guest Cottage • Dock". */
export function splitListingName(name: string) {
  const [title, rest = ""] = name.split("|").map((part) => part.trim());
  const highlights = rest
    .split("•")
    .map((h) => h.trim())
    .filter(Boolean);
  return { title, highlights };
}

/** Converts a Hostaway 10-point rating to the familiar 5-star scale. */
export function toFiveStar(rating: number) {
  return Math.round((rating / 2) * 100) / 100;
}

export function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${suffix}`;
}

export function toSummary(listing: Listing): ListingSummary {
  return {
    id: listing.id,
    name: listing.name,
    city: listing.city,
    state: listing.state,
    price: listing.price,
    personCapacity: listing.personCapacity,
    bedroomsNumber: listing.bedroomsNumber,
    bathroomsNumber: listing.bathroomsNumber,
    averageReviewRating: listing.averageReviewRating,
    listingImages: listing.listingImages.slice(0, 5),
  };
}

/** "1 bath", "2 baths". */
export function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}
