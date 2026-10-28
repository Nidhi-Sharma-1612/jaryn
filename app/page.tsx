import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { MeetHost } from "@/components/home/MeetHost";
import { OwnersCta } from "@/components/home/OwnersCta";
import { Reviews } from "@/components/home/Reviews";
import { StatsStrip } from "@/components/home/StatsStrip";
import { getListing, getListings, getPortfolioStats, getTowns } from "@/lib/services/listings";
import { getFeaturedReviews, getReviewTotals, HOST_QUOTE_REVIEW_ID } from "@/lib/services/reviews";
import type { Listing } from "@/lib/types/hostaway";
import { toSummary } from "@/lib/utils";

const photo = (listing: Listing | undefined, index = 0) =>
  listing?.listingImages[index]?.url ?? listing?.listingImages[0]?.url ?? "";

const byRating = (a: Listing, b: Listing) => b.averageReviewRating - a.averageReviewRating || b.price - a.price;

export default async function HomePage() {
  const [all, towns, stats, garfield, cheshire, summerwood, reviews, reviewTotals] = await Promise.all([
    getListings(),
    getTowns(),
    getPortfolioStats(),
    getListing(351827),
    getListing(417729),
    getListing(409114),
    getFeaturedReviews(8, [HOST_QUOTE_REVIEW_ID]),
    getReviewTotals(),
  ]);

  const topRated = [...all].sort(byRating).slice(0, 6).map(toSummary);

  return (
    <>
      <Hero towns={towns} homes={stats.homes} />
      <StatsStrip homes={stats.homes} towns={stats.towns} rating={reviewTotals.average} />
      <MeetHost image={photo(cheshire)} />
      <FeaturedProperties listings={topRated} total={stats.homes} />
      <Reviews reviews={reviews} rating={reviewTotals.average} count={reviewTotals.count} />
      <OwnersCta image={photo(summerwood)} />
      <FinalCta image={photo(garfield)} />
    </>
  );
}
