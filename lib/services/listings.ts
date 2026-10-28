import { cacheLife } from "next/cache";
import { mockListings } from "@/lib/data/mock-listings";
import type { CollectionKey } from "@/lib/site";
import type { Listing } from "@/lib/types/hostaway";

// Single data seam for the UI. Phase 2 swaps mockListings for the Hostaway client
// (GET /v1/listings, /v1/listings/{id}, /v1/listings/{id}/calendar).

export interface ListingFilters {
  town?: string;
  guests?: number;
  bedrooms?: number;
  collection?: CollectionKey;
  /** Only homes that accept pets. */
  pets?: boolean;
}

const has = (listing: Listing, ...names: string[]) =>
  listing.listingAmenities.some((a) =>
    names.some((n) => a.amenityName.toLowerCase() === n.toLowerCase()),
  );

const collectionMatchers: Record<CollectionKey, (l: Listing) => boolean> = {
  lakefront: (l) =>
    has(l, "Lake front", "Waterfront", "Private dock", "Lake access") ||
    /lake|waterfront|dock|pond/i.test(l.name),
  ski: (l) =>
    has(l, "Skiing") || /ski|catamount|jiminy/i.test(l.name),
  tanglewood: (l) => /tanglewood/i.test(l.name) || ["Lenox", "Stockbridge"].includes(l.city),
  pool: (l) => has(l, "Swimming pool", "Private pool", "Hot tub", "Pool") || /pool|hot tub/i.test(l.name),
  pets: (l) => has(l, "Pets allowed", "Pets allowed on request"),
};

export function matchesCollection(listing: Listing, key: CollectionKey) {
  return collectionMatchers[key](listing);
}

export async function getListings(filters: ListingFilters = {}): Promise<Listing[]> {
  "use cache";
  cacheLife("hours");

  return mockListings.filter((l) => {
    if (filters.town && l.city !== filters.town) return false;
    if (filters.guests && l.personCapacity < filters.guests) return false;
    if (filters.bedrooms && l.bedroomsNumber < filters.bedrooms) return false;
    if (filters.collection && !matchesCollection(l, filters.collection)) return false;
    if (filters.pets && !matchesCollection(l, "pets")) return false;
    return true;
  });
}

export async function getListing(id: number): Promise<Listing | undefined> {
  "use cache";
  cacheLife("hours");

  return mockListings.find((l) => l.id === id);
}

export async function getTowns(): Promise<string[]> {
  "use cache";
  cacheLife("days");

  return [...new Set(mockListings.map((l) => l.city))].sort();
}

export async function getPortfolioStats() {
  "use cache";
  cacheLife("days");

  const ratings = mockListings.map((l) => l.averageReviewRating);
  return {
    homes: mockListings.length,
    towns: new Set(mockListings.map((l) => l.city)).size,
    averageRating: ratings.reduce((a, b) => a + b, 0) / ratings.length / 2,
  };
}
