// Intro copy from berkshirevacationrental.com/thingstodo; places and seasons are our own short write-ups.

export const guideIntro = {
  headline: "Let us help you have the most fun, relaxing, delicious, and memorable trip.",
  lead: "We've spent years exploring every corner of the Berkshires — the hidden restaurants, the trails with the best views, the galleries that stop you in your tracks. This is our curated guide to the places we love most, organized so you can plan your perfect day without the guesswork.",
};

export type GuideCategory = "arts" | "outdoors" | "food";
export type Season = "spring" | "summer" | "fall" | "winter";

export const guideCategories: { key: GuideCategory; title: string }[] = [
  { key: "arts", title: "Art & music" },
  { key: "outdoors", title: "Outdoors" },
  { key: "food", title: "Food & towns" },
];

export const seasons: { key: Season; title: string; months: string; body: string }[] = [
  {
    key: "summer",
    title: "Summer",
    months: "Jun – Aug",
    body: "Concerts on the lawn at Tanglewood, lake days and long evenings on the dock.",
  },
  {
    key: "fall",
    title: "Fall",
    months: "Sep – Nov",
    body: "Foliage season, crisp hikes, farm stands and cozy nights by the fire.",
  },
  {
    key: "winter",
    title: "Winter",
    months: "Dec – Mar",
    body: "Ski days at Catamount and Jiminy Peak, then wood stoves and snowy quiet.",
  },
  {
    key: "spring",
    title: "Spring",
    months: "Apr – May",
    body: "Quiet trails, waterfalls at their fullest and the region waking up.",
  },
];

const allYear: Season[] = ["spring", "summer", "fall", "winter"];

export const guidePlaces: {
  name: string;
  town: string;
  /** Towns we have homes in, for "stay nearby". */
  homesTowns: string[];
  seasonLabel: string;
  seasons: Season[];
  category: GuideCategory;
  blurb: string;
}[] = [
  {
    name: "Tanglewood",
    town: "Lenox",
    homesTowns: ["Lenox", "Stockbridge"],
    seasonLabel: "Summer",
    seasons: ["summer"],
    category: "arts",
    blurb: "Summer home of the Boston Symphony Orchestra, with concerts and picnics on the lawn.",
  },
  {
    name: "Norman Rockwell Museum",
    town: "Stockbridge",
    homesTowns: ["Stockbridge", "West Stockbridge"],
    seasonLabel: "Year-round",
    seasons: allYear,
    category: "arts",
    blurb: "The world's largest collection of Rockwell's original art, set on 36 acres.",
  },
  {
    name: "Lake Garfield",
    town: "Monterey",
    homesTowns: ["Monterey"],
    seasonLabel: "Summer",
    seasons: ["summer"],
    category: "outdoors",
    blurb: "Clear water, quiet coves and some of the best sunset paddles in the county.",
  },
  {
    name: "Beartown State Forest",
    town: "Monterey",
    homesTowns: ["Monterey"],
    seasonLabel: "Spring – Fall",
    seasons: ["spring", "summer", "fall"],
    category: "outdoors",
    blurb: "Miles of trails through hemlock and hardwood, with Benedict Pond at its heart.",
  },
  {
    name: "Catamount & Jiminy Peak",
    town: "Egremont · Hancock",
    homesTowns: ["Egremont", "Hancock"],
    seasonLabel: "Winter",
    seasons: ["winter"],
    category: "outdoors",
    blurb: "Two of New England's favorite family ski mountains, minutes from our ski homes.",
  },
  {
    name: "Downtown Great Barrington",
    town: "Great Barrington",
    homesTowns: ["Great Barrington"],
    seasonLabel: "Year-round",
    seasons: allYear,
    category: "food",
    blurb: "Farm-to-table dining, the historic Mahaiwe theater and independent shops.",
  },
  {
    name: "Downtown Lenox",
    town: "Lenox",
    homesTowns: ["Lenox", "Stockbridge"],
    seasonLabel: "Year-round",
    seasons: allYear,
    category: "food",
    blurb: "Walkable streets of cafés, galleries and restaurants, close to Tanglewood.",
  },
];
