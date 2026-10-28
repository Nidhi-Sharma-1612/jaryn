export const site = {
  name: "Berkshire Vacation Rental Co.",
  shortName: "Berkshire Vacation Rental",
  tagline: "Handpicked homes across the Berkshires, booked direct.",
  url: "https://www.berkshirevacationrental.com",
  email: "jaryn@berkshirevacationrental.com",
  phone: { display: "(413) 429-9558", href: "tel:+14134299558" },
  host: "Jaryn",
  founder: { name: "Jaryn Pierson", title: "Owner / Founder" },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584289097726" },
    { label: "X (Twitter)", href: "https://x.com/BerkRentalCo" },
  ],
  // Placeholder hero shot until the client supplies brand photography.
  heroImage:
    "https://bookingenginecdn-2.hostaway.com/136918-logoUrl-4UVCjVrnBJb4I0gaDWzlcPVH--RbbktPSgTbjjpgc9jQ-67859edd9dbc2.png",
};

export const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Berkshire Guide", href: "/berkshire-guide" },
  { label: "Owners", href: "/property-management" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type CollectionKey = "lakefront" | "ski" | "tanglewood" | "pool" | "pets";

export const collections: {
  key: CollectionKey;
  title: string;
  blurb: string;
}[] = [
  { key: "lakefront", title: "Lakefront & Waterfront", blurb: "Private docks, kayaks and morning swims." },
  { key: "ski", title: "Ski Season", blurb: "Minutes from Catamount & Jiminy Peak." },
  { key: "tanglewood", title: "Near Tanglewood", blurb: "Summer concerts, a short drive away." },
  { key: "pool", title: "Pools & Hot Tubs", blurb: "Long summer afternoons, sorted." },
  { key: "pets", title: "Pet Friendly", blurb: "Bring the whole family, paws included." },
];
