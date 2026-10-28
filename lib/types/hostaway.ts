// Shapes follow the Hostaway Public API (https://api.hostaway.com/documentation)
// so the mock layer can be replaced by live calls without touching UI code.

export interface ListingImage {
  url: string;
  caption: string;
  sortOrder: number;
}

export interface ListingAmenity {
  amenityName: string;
}

export interface Listing {
  id: number;
  name: string;
  description: string;
  houseRules: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  /** Base nightly rate (USD). */
  price: number;
  cleaningFee: number;
  personCapacity: number;
  bedroomsNumber: number;
  bathroomsNumber: number;
  bedsNumber: number;
  checkInTimeStart: number;
  checkOutTime: number;
  /** Hostaway rates reviews out of 10. */
  averageReviewRating: number;
  listingImages: ListingImage[];
  listingAmenities: ListingAmenity[];
}

export interface CalendarDay {
  date: string; // yyyy-MM-dd
  isAvailable: 0 | 1;
  price: number;
  minimumStay: number;
}

export interface Review {
  id: number;
  guestName: string;
  listingId: number;
  /** Hostaway rates reviews out of 10. */
  rating: number;
  publicReview: string;
  departureDate?: string;
}

/** The subset of a listing that cards need, kept small for client components. */
export type ListingSummary = Pick<
  Listing,
  | "id"
  | "name"
  | "city"
  | "state"
  | "price"
  | "personCapacity"
  | "bedroomsNumber"
  | "bathroomsNumber"
  | "averageReviewRating"
  | "listingImages"
>;
