import { cacheLife } from "next/cache";
import { listingReviewStats, mockReviews, reviewTotals } from "@/lib/data/reviews";
import { mockListings } from "@/lib/data/mock-listings";
import type { Review } from "@/lib/types/hostaway";
import { splitListingName } from "@/lib/utils";

// Single data seam for reviews. Phase 2 swaps these for Hostaway GET /v1/reviews.

/** Michael & Olya at Cheshire Cove, quoted in the founder section on the home page. */
export const HOST_QUOTE_REVIEW_ID = 11;

export interface ReviewWithHome extends Review {
  homeTitle: string;
}

const homeTitle = (listingId: number) => {
  const listing = mockListings.find((l) => l.id === listingId);
  return listing ? splitListingName(listing.name).title : "";
};

export async function getReviewTotals() {
  "use cache";
  cacheLife("days");
  return reviewTotals;
}

export async function getListingReviews(listingId: number) {
  "use cache";
  cacheLife("hours");

  const stats = listingReviewStats[listingId];
  // Best reviews first: highest rating, then the most detailed.
  const reviews = mockReviews
    .filter((r) => r.listingId === listingId)
    .sort((a, b) => b.rating - a.rating || b.publicReview.length - a.publicReview.length);
  return { reviewCount: stats?.reviewCount ?? reviews.length, rating: stats?.rating, reviews };
}

/** One standout five-star review per home, for the home page. `excludeIds` skips reviews quoted elsewhere. */
export async function getFeaturedReviews(count = 8, excludeIds: number[] = []): Promise<ReviewWithHome[]> {
  "use cache";
  cacheLife("hours");

  const readable = (r: Review) => r.publicReview.length >= 140 && r.publicReview.length <= 320;
  const mentionsHost = (r: Review) => /jar[yi]n|host/i.test(r.publicReview);
  const picked = new Map<number, Review>();
  for (const r of mockReviews
    .filter((r) => r.rating === 10 && readable(r) && !excludeIds.includes(r.id))
    .sort((a, b) => Number(mentionsHost(b)) - Number(mentionsHost(a)) || b.publicReview.length - a.publicReview.length)) {
    if (!picked.has(r.listingId)) picked.set(r.listingId, r);
  }
  return [...picked.values()].slice(0, count).map((r) => ({ ...r, homeTitle: homeTitle(r.listingId) }));
}
