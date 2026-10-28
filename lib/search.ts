// The trip a guest is planning, carried in the URL from the hero search
// through the results page to the property's booking widget.

export interface TripSearch {
  town?: string;
  checkIn?: string; // yyyy-MM-dd
  checkOut?: string; // yyyy-MM-dd
  adults: number;
  children: number;
  pets: number;
}

type RawParams = Record<string, string | string[] | undefined> | URLSearchParams;

const read = (params: RawParams, key: string) => {
  const v = params instanceof URLSearchParams ? params.get(key) : params[key];
  return (Array.isArray(v) ? v[0] : v) ?? undefined;
};

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

const count = (v: string | undefined, fallback: number, min = 0) => {
  const n = Number(v);
  return v && Number.isInteger(n) && n >= min && n <= 20 ? n : fallback;
};

export function parseTrip(params: RawParams): TripSearch {
  const checkIn = read(params, "checkIn");
  const checkOut = read(params, "checkOut");
  const validRange = checkIn && isoDate.test(checkIn) && (!checkOut || (isoDate.test(checkOut) && checkOut > checkIn));
  // `guests` is the total used by older links and the filters; prefer the adult/child breakdown.
  const legacyGuests = count(read(params, "guests"), 2, 1);

  return {
    town: read(params, "town") || undefined,
    checkIn: validRange ? checkIn : undefined,
    checkOut: validRange && checkOut ? checkOut : undefined,
    adults: count(read(params, "adults"), legacyGuests, 1),
    children: count(read(params, "children"), 0),
    pets: count(read(params, "pets"), 0),
  };
}

export const totalGuests = (trip: Pick<TripSearch, "adults" | "children">) => trip.adults + trip.children;

/** Query string for the booking-related parts of a trip (dates + party). */
export function tripQuery(trip: TripSearch, { includeTown = false } = {}) {
  const params = new URLSearchParams();
  if (includeTown && trip.town) params.set("town", trip.town);
  if (trip.checkIn) params.set("checkIn", trip.checkIn);
  if (trip.checkOut) params.set("checkOut", trip.checkOut);
  params.set("adults", String(trip.adults));
  if (trip.children) params.set("children", String(trip.children));
  if (trip.pets) params.set("pets", String(trip.pets));
  return params.toString();
}

/** Parses yyyy-MM-dd as a local calendar date (not UTC midnight). */
export function fromIsoDate(value: string | undefined) {
  if (!value || !isoDate.test(value)) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "guests", label: "Sleeps the most" },
] as const;

export type SortKey = (typeof sortOptions)[number]["value"];
