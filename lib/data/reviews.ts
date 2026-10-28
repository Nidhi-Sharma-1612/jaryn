// Real guest reviews from berkshirevacationrental.com (recent reviews per home).
// Shaped like Hostaway's /v1/reviews (10-point rating) so the API can replace this file.
import type { Review } from "@/lib/types/hostaway";

/** Company-wide totals shown on the old site, across all homes and channels. */
export const reviewTotals = { count: 1684, average: 4.88 };

/** Per-home review count and 5-star average. */
export const listingReviewStats: Record<number, { reviewCount: number; rating: number }> = {
  "344520": {
    "reviewCount": 171,
    "rating": 4.86
  },
  "417729": {
    "reviewCount": 48,
    "rating": 4.9
  },
  "344516": {
    "reviewCount": 124,
    "rating": 4.93
  },
  "344518": {
    "reviewCount": 130,
    "rating": 4.81
  },
  "392179": {
    "reviewCount": 78,
    "rating": 4.95
  },
  "351827": {
    "reviewCount": 53,
    "rating": 4.93
  },
  "344519": {
    "reviewCount": 82,
    "rating": 4.84
  },
  "395581": {
    "reviewCount": 38,
    "rating": 4.69
  },
  "357138": {
    "reviewCount": 94,
    "rating": 4.86
  },
  "392704": {
    "reviewCount": 39,
    "rating": 4.82
  },
  "432369": {
    "reviewCount": 35,
    "rating": 4.92
  },
  "397346": {
    "reviewCount": 32,
    "rating": 5.0
  },
  "344515": {
    "reviewCount": 119,
    "rating": 4.88
  },
  "344517": {
    "reviewCount": 126,
    "rating": 4.95
  },
  "402020": {
    "reviewCount": 27,
    "rating": 4.63
  },
  "396469": {
    "reviewCount": 12,
    "rating": 5.0
  },
  "412911": {
    "reviewCount": 41,
    "rating": 5.0
  },
  "409114": {
    "reviewCount": 36,
    "rating": 4.84
  }
};

export const mockReviews: Review[] = [
  {
    "id": 1,
    "listingId": 344520,
    "guestName": "Selen",
    "rating": 10,
    "publicReview": "Beautiful lake house! The house was clean and Jarny was a very good host! We enjoyed our stay, would love to stay here again in the future."
  },
  {
    "id": 2,
    "listingId": 344520,
    "guestName": "Joseph Crotone",
    "rating": 10,
    "publicReview": "Perfect Lakeside Getaway for Families – We'll Be Back!We stayed in Monterey with two families: my wife, our 4-year-old, and me, plus my cousin, her husband, and their two little ones (almost 2 and 7 months). The house handled all of us with ease, with plenty of bedrooms and bathrooms so everyone had their own space.The setting on Garfield Lake is the real highlight. The house sits up on the hill, so the back deck feels like you're out in the trees, and it was our favorite spot for morning coffee. Down the steps you'll find the water and a private dock. We had excellent fishing right off the dock and took the canoe out for even more.The kitchen is perfect for cooking family meals, which made staying in easy and relaxing.The location is great too. Downtown Great Barrington is only 15–20 minutes away for shopping and good food, and there are plenty of farms nearby. We visited three, and the kids loved every one of them. We settled into a great routine: mornings relaxing on the lake, a farm visit, then back to the house for the afternoon to hang out or get back out on the water.All in all, a fantastic experience. We're already planning to come back next year!"
  },
  {
    "id": 3,
    "listingId": 344520,
    "guestName": "Ana",
    "rating": 10,
    "publicReview": "Jaryn’s place was the perfect place for us family of 6. It was spacious, clean and relaxing. Every night we walked down the stairs to the lake. Despite some nights that were chilly and windy, we bundled up and sat by the lake because it was SO peaceful. The quietness, and on the clear nights the stars were amazing. We saw 2 shooting stars. There were 4 bedrooms and 4 bathrooms. Plenty space for us 6 (2 couples and 2 singles). We really appreciated the apple cider donuts and apple cider in the fridge. That was welcoming and perfect for the fall season. We just wished we could’ve stayed here longer and will definitely consider this home again if we’re back in the area."
  },
  {
    "id": 4,
    "listingId": 344520,
    "guestName": "Lynne Massaro",
    "rating": 10,
    "publicReview": "Wonderful location with easy access to the water. Several lovely walks in old-growth forests just a few minutes' drive from the house. The house was spacious with plenty of room to relax."
  },
  {
    "id": 5,
    "listingId": 344520,
    "guestName": "Caylin",
    "rating": 10,
    "publicReview": "Jaryn's home was wonderful! It was exactly what we needed for a week long getaway with our family. The home was clean and well-stocked and there was easy access to the lake down the long flight of stairs. It was peaceful and quiet - we had a wonderful time! And Jaryn was very responsive and proactive in giving us information."
  },
  {
    "id": 6,
    "listingId": 344520,
    "guestName": "Linda McGettigan",
    "rating": 10,
    "publicReview": "We had a lovely week at Lake Garfield! The house was exactly as described, very clean and private. The check in process was very easy and the host was very easy to reach. The bed in the first floor bedroom was really comfortable, something you don’t always find in these properties. We spent a lot of time on the deck enjoying the lake view. We even saw two eagles, one was mature and the other was a two year old! Bring your binoculars!"
  },
  {
    "id": 7,
    "listingId": 344520,
    "guestName": "Pam",
    "rating": 8,
    "publicReview": "The perfect place for a family reunion, or any gathering. Comfortable in every way, beautiful setting in great location. Easy open flow of rooms, plenty of space inside, large well appointed deck. Jaryn was very responsive and accommodating. We can’t wait to go back,"
  },
  {
    "id": 8,
    "listingId": 344520,
    "guestName": "Barbara",
    "rating": 10,
    "publicReview": "The home is beautiful-we really enjoyed the back deck overlooking Lake Garfield. Our family spent many hours canoeing and paddle boarding."
  },
  {
    "id": 9,
    "listingId": 344520,
    "guestName": "Howard",
    "rating": 10,
    "publicReview": "Jaryn was super responsive. The view of the lake from each room was amazing. The space was excellent for our family group of seven. A/C was excellent during the heat wave! We stayed in Monterey a while back when the General Store was open. Wished there was a store closer than GB or Lee in order to pick up groceries. Otherwise — all great! Jaryn is the best!"
  },
  {
    "id": 10,
    "listingId": 344520,
    "guestName": "Matthew Ayala",
    "rating": 10,
    "publicReview": ""
  },
  {
    "id": 11,
    "listingId": 417729,
    "guestName": "Michael And Olya",
    "rating": 10,
    "publicReview": "Fantastic stay at this property! Being situated by the lake was amazing and the view was better than the pictures. The house is well appointed and very clean. Jaryn was a great, responsive host and we really appreciated the apple cider donuts!"
  },
  {
    "id": 12,
    "listingId": 417729,
    "guestName": "Christine",
    "rating": 10,
    "publicReview": "Great spot - waking up to the giant windowed doors and seeing the lake right outside was really a highlight!"
  },
  {
    "id": 13,
    "listingId": 417729,
    "guestName": "Leonard",
    "rating": 10,
    "publicReview": "Our second visit within a few months because it is such a special place. Enjoyed biking on the rail trail, fishing , kayaking and cooking..the only bad thing was the fish weren’t biting! We will return soon!"
  },
  {
    "id": 14,
    "listingId": 417729,
    "guestName": "John",
    "rating": 10,
    "publicReview": "This is the second time we have stayed there. Really enjoyed it and will go there again next spring and summer, if available."
  },
  {
    "id": 15,
    "listingId": 417729,
    "guestName": "Katie",
    "rating": 10,
    "publicReview": "This lake house was perfect for our family of three—my husband and me and our 10-year-old son. The setting is absolutely gorgeous and so peaceful, and we loved being right on the lake. The pedal boat was such a fun bonus and a big hit with our son! We had a wonderful, relaxing stay and would definitely come back!"
  },
  {
    "id": 16,
    "listingId": 417729,
    "guestName": "Christophorus",
    "rating": 10,
    "publicReview": "Mooie plaats aan het water, rustig, i het huisje was alles in orde en de eerste behoefte aan koffie enz. was ruimschoots aanwezig. Een vraag i.v.m. uitslapen van kleinzoon , voor een paar uur verlenging, werd direct positief beantwoord."
  },
  {
    "id": 17,
    "listingId": 417729,
    "guestName": "Deborah",
    "rating": 10,
    "publicReview": "We really enjoyed our time on the lake. It’s so close to the water it’s amazing! There are neighbors close by, but you would never know it…the area is so peaceful and quiet. There’s a bike trail down the street which runs along the lake. The house is beautiful, clean and looks like new. Jaryn is an excellent host!"
  },
  {
    "id": 18,
    "listingId": 417729,
    "guestName": "Ashley",
    "rating": 10,
    "publicReview": "Extremely relaxing spot - we even had the unique opportunity to watch nesting bald eagles right across the lake during our visit! Very friendly local community. Thanks for hosting us so wonderfully - we hope to visit again!"
  },
  {
    "id": 19,
    "listingId": 417729,
    "guestName": "Leonard",
    "rating": 10,
    "publicReview": "It was beautiful and peaceful! Just what we wanted to celebrate my husband’s birthday.. we are already looking at our next stay! It really had everything we needed to make our trip pleasant , we loved the kayaks , peddle boat , deck.. in the evening we watched a movie on a 5’ screen with with a large couch with reclining seats! Easy grill to use! Everything was perfect , highly recommend! Thanks!"
  },
  {
    "id": 20,
    "listingId": 417729,
    "guestName": "Ann",
    "rating": 10,
    "publicReview": "Cottage was perfect. Kitchen had everything we needed, drip coffee and keureg. Views from living room and bedroom. Kayaks for lake were right there. Rail to trail bike path 16 miles one way was a few miles away -and Cheshire outfitters right there to rent a bike. Also my graylock is a short drive away. Lots of trails nearby. Common table restaurant is close with amazing food."
  },
  {
    "id": 21,
    "listingId": 344516,
    "guestName": "Adam",
    "rating": 10,
    "publicReview": "Great host, we had a great time."
  },
  {
    "id": 22,
    "listingId": 344516,
    "guestName": "Wendy",
    "rating": 10,
    "publicReview": "We had a last minute booking. Home was perfect. Location perfect. Jaryn was helpful and super responsive the whole trip. Very mycg appreciate eveything. We will be back."
  },
  {
    "id": 23,
    "listingId": 344516,
    "guestName": "Franz",
    "rating": 10,
    "publicReview": "Very nice house with beautiful surroundings, super clean and very well equipped with everything you might need."
  },
  {
    "id": 24,
    "listingId": 344516,
    "guestName": "Michele",
    "rating": 10,
    "publicReview": "Lovely condo in fine resort!"
  },
  {
    "id": 25,
    "listingId": 344516,
    "guestName": "Kathy",
    "rating": 10,
    "publicReview": "Jaryn was very flexible when I had requested a date change on my reservation. He always responded very quickly, professionally, and in a friendly manner! His place was very clean and well stocked with everything you need. It was decorated very nicely and in a beautiful location. He Even left snacks out and a bottle of wine for all of us to enjoy. I would definitely stay again!"
  },
  {
    "id": 26,
    "listingId": 344516,
    "guestName": "Phillip",
    "rating": 10,
    "publicReview": "Beautifully renovated and clean. Perfect for our needs!"
  },
  {
    "id": 27,
    "listingId": 344516,
    "guestName": "Adrienne",
    "rating": 10,
    "publicReview": "Beds super comfy, everything was great. Would stay here again."
  },
  {
    "id": 28,
    "listingId": 344516,
    "guestName": "Hs",
    "rating": 10,
    "publicReview": "Jaryn’s place was amazing; very clean and it felt like home. I’m often in the area and wish I’d discovered it sooner. Renovations were nicely done and I appreciated the quick responsiveness. Five-star stay!"
  },
  {
    "id": 29,
    "listingId": 344516,
    "guestName": "Tyler",
    "rating": 10,
    "publicReview": "Jaryn’s condo was a perfect getaway for our group of friends! The place was clean and welcoming. Jaryn himself was extremely responsive and considerate. We originally selected this property based on the location and value. It is a 15-20 min drive to many of the top attractions in the Berkshires and was one of the better deals in the area. We definitely would select this property again."
  },
  {
    "id": 30,
    "listingId": 344516,
    "guestName": "Juan",
    "rating": 10,
    "publicReview": "Jaryn was an amazing host, very friendly and easy to communicate with. The place was amazing and the pictures don’t do it justice. I would definitely recommend this place and may even have to come back for ski season! Thanks Jaryn!"
  },
  {
    "id": 31,
    "listingId": 344518,
    "guestName": "Landon",
    "rating": 10,
    "publicReview": "A peaceful retreat. Quiet and comfortable. We had a fantastic stay and can’t wait to come back."
  },
  {
    "id": 32,
    "listingId": 344518,
    "guestName": "Alec Werner",
    "rating": 10,
    "publicReview": "Our stay was fantastic. The team was communicative and the property as represented. Would recommend!"
  },
  {
    "id": 33,
    "listingId": 344518,
    "guestName": "Jenna",
    "rating": 10,
    "publicReview": "This is our second time at this property – loved it even more this time! Lake Garfield is beautiful, and even in October we were able to get out on our paddleboards and in kayaks. We also made good use of the woodstove as the night temperatures were in the 30s and 40s! It also burns remarkably clean. Everything was comfortable and we appreciated the new dock and new linens! My black Lab was in heaven too. And there were apple cider donuts and apple cider for us on arrival. Really thoughtful. We can't wait to come back next year."
  },
  {
    "id": 34,
    "listingId": 344518,
    "guestName": "Melissa",
    "rating": 10,
    "publicReview": "Great quiet stay for a group of friends and their dogs! Loved the lake and quiet! Popped over to great Barrington for amazing food."
  },
  {
    "id": 35,
    "listingId": 344518,
    "guestName": "Sunil",
    "rating": 10,
    "publicReview": "We had a wonderful stay at this beautiful lakefront place. The peaceful lake views were a highlight, and having kayaks made the experience even more enjoyable. A relaxing and memorable getaway, we would definitely recommend it!"
  },
  {
    "id": 36,
    "listingId": 344518,
    "guestName": "Ariel",
    "rating": 10,
    "publicReview": "House looked just like the listing -- as other reviews have noted, design and decor is definitely a time capsule, decide for yourself whether that's a plus or minus. Double level decks were amazing. We enjoyed kayaking the lake and visiting the nearby public beach; other parts of the lake including the dock area were weedier for swimming. Bedrooms and bathrooms were fine, kitchen was adequate. Indoor stairs were very steep, watch out with small kids or people with mobility concerns."
  },
  {
    "id": 37,
    "listingId": 344518,
    "guestName": "Silvia",
    "rating": 10,
    "publicReview": "Peaceful getaway, beautiful view over lake Garfield, cozy interior. I would book it again!"
  },
  {
    "id": 38,
    "listingId": 344518,
    "guestName": "Linda",
    "rating": 10,
    "publicReview": "What a beautiful location, and those huge decks under the trees, overlooking the lake. A real getaway! We appreciated being able to use the kayaks and the dock to really experience the lake life!"
  },
  {
    "id": 39,
    "listingId": 344518,
    "guestName": "Nathan",
    "rating": 10,
    "publicReview": "Great place for a weekend getaway!"
  },
  {
    "id": 40,
    "listingId": 344518,
    "guestName": "Robert",
    "rating": 10,
    "publicReview": "Very enjoyable short stay only two days"
  },
  {
    "id": 41,
    "listingId": 392179,
    "guestName": "Elisa",
    "rating": 10,
    "publicReview": "The architecture and aesthetic of the house was perfectly mid-century modern! We loved it. The house was spacious and clean with beautiful views out every window. It was quiet and cozy at night. We looked forward to returning to our own sanctuary every afternoon/evening and appreciated being able to park in the garage. Having woods, ponds, and mountains to hike right behind the house made our stay very special, especially with the fall colors blooming. Wanting to travel north and south in the Berkshires made the location convenient, and the free admission to the Hancock Shaker Village was much appreciated. Of course, we also loved the provided cider and cider donuts from Hilltop Orchard; we went back there for more during our visit! The host and maintenance and cleaning crews did a great job with everything. The house was fully stocked with everything we could have needed and more. This was honestly the best overall airbnb experience we have had."
  },
  {
    "id": 42,
    "listingId": 392179,
    "guestName": "Rachael",
    "rating": 10,
    "publicReview": "Great price for staying nearby Pittsfield. We especially appreciated the size of the home, it had plenty of space to make your own while staying here. The extra offered goodies were also very welcome! Taking advantage of the free visit to the Shaker museum is a must-do."
  },
  {
    "id": 43,
    "listingId": 392179,
    "guestName": "John",
    "rating": 10,
    "publicReview": "Loved this AirBnB!. Location is excellent. Setting is exceptional, Well managed (Host is involved, and focused on providing value). Not inexpensive, but worth it. Exceeding my expectations: Zip lock bags, coffee, insect repellent, paper plates, 5 thermostats (splits) for local control of temp, Garage withEV charger, two outdoor seating areas (one with gas fireplace), Close to hiking (100 yards from your door step), etc......j I will be a repeat customer if the opportunity presents itself."
  },
  {
    "id": 44,
    "listingId": 392179,
    "guestName": "Minna",
    "rating": 10,
    "publicReview": "We had a great stay - very unique home that is comfortable & convenient. We’d happily stay here again when we’re back in the area."
  },
  {
    "id": 45,
    "listingId": 392179,
    "guestName": "Christina",
    "rating": 10,
    "publicReview": "Loved this spot! Interesting decor, comfortable, cozy. Loved the EV charger!"
  },
  {
    "id": 46,
    "listingId": 392179,
    "guestName": "Erica",
    "rating": 10,
    "publicReview": "We had a wonderful stay at this special house. We were surrounded by natural beauty and had some lovely moments sitting by the lake and reading. The kitchen was a dream to cook in, not only did it have everything we needed, it had counter-to-ceiling windows on both exterior walls. The linens were luxurious. Jaryn was quick to answer our questions and supply us with local recommendations."
  },
  {
    "id": 47,
    "listingId": 392179,
    "guestName": "Angelica",
    "rating": 10,
    "publicReview": "We had a great time. We loved the house and the property. Very cool vibe and had everything we needed. Jaryn was very responsive and accommodating. Thanks for a great stay!"
  },
  {
    "id": 48,
    "listingId": 392179,
    "guestName": "Jeanne",
    "rating": 10,
    "publicReview": "The house was lovely and well appointed. We had everything we needed. Can’t wait to come back!"
  },
  {
    "id": 49,
    "listingId": 392179,
    "guestName": "Rabecca",
    "rating": 10,
    "publicReview": "I can't say enough good things about this host and this unique property. Wish I could give it 11 stars. My husband prefers hotels, but I convinced him to give this special spot a try. He thanked me every day for it! For the same cost as two hotel rooms, the three of us had plenty of space, a well-equipped kitchen, and outdoor grounds straight from a fairy tale. We were in town to visit family, and we appreciated room to gather comfortably. We loved the nearby trails for daily walks, and the Shaker Village was a fun outing. I spent hours reading in the outdoor chairs. (Thank you for providing bug spray!) We appreciated Jaryn's kindness and responsiveness throughout our trip. This was our first time in the area, and we were utterly charmed by the whole Berkshires experience. This property will be our first choice on future trips!"
  },
  {
    "id": 50,
    "listingId": 392179,
    "guestName": "Ernest",
    "rating": 10,
    "publicReview": "This is by far the best Airbnb I have stayed in during my several summers in the Berkshires. The home is clean, comfortable, and very well maintained, and the location is amazing. What a treat to walk out the door and be able to hike for hours in the neighboring state forest, while still being just a few minutes away from places to kayak and cultural attractions like the Clark and Tanglewood. I would gladly stay here again."
  },
  {
    "id": 51,
    "listingId": 351827,
    "guestName": "Wayne",
    "rating": 10,
    "publicReview": "Great location , close to many things to do . Loved the house and the lake. Fall Foliage was beautiful. Looking forward to staying again."
  },
  {
    "id": 52,
    "listingId": 351827,
    "guestName": "Adam Leibovich",
    "rating": 10,
    "publicReview": "Great location! Highly recommend"
  },
  {
    "id": 53,
    "listingId": 351827,
    "guestName": "Dionna",
    "rating": 10,
    "publicReview": "Great place. Perfect for what we needed!"
  },
  {
    "id": 54,
    "listingId": 351827,
    "guestName": "Allison",
    "rating": 10,
    "publicReview": "Jaryn could not have been a better host. He is very organized and a great communicator. He made checking in and checking out simple and seamless. He was friendly, welcoming and very responsive. He did everything possible to make our stay special and we had a great time in this wonderful house on a beautiful lake. Thank you!"
  },
  {
    "id": 55,
    "listingId": 351827,
    "guestName": "Victor",
    "rating": 10,
    "publicReview": "Beautiful lake house, really enjoyed our stay. Worth noting that the 4th bedroom and 3rd bathroom are actually in a cute standalone cottage, detached from the main house. However, this actually worked out better for us, gave some family members a little extra privacy. Jaryn was very responsive and helpful."
  },
  {
    "id": 56,
    "listingId": 351827,
    "guestName": "James",
    "rating": 10,
    "publicReview": "Spacious house in a gorgeous location. We had a great time here enjoying the lake, local hikes, and finding places to read and play games. Tons of space to spread out with the cottage and multiple floors. The furniture is a bit old as shown in the pictures but everything was functional and clean. Jaryn was very easy to reach. Would definitely recommend for family trips (unless you’re scared of bears)!"
  },
  {
    "id": 57,
    "listingId": 351827,
    "guestName": "Ruth",
    "rating": 10,
    "publicReview": "We had a wonderful week at this lively lake house. Kayaked, swam and enjoyed the gorgeous views. The extra cottage was terrific for our daughter and the fiends from college who came along after graduation. The place is even prettier than it looked and Jaryn was super friendly and helpful. Highly recommend!"
  },
  {
    "id": 58,
    "listingId": 351827,
    "guestName": "Ryan",
    "rating": 10,
    "publicReview": "The place was great, clean and plenty of room for a family of 6 and a dog The lake was great for fishing and I’m sure in the summer great for swimming. Jaryn was responsive with any questions very quickly. We will definitely go back!"
  },
  {
    "id": 59,
    "listingId": 351827,
    "guestName": "Edvard",
    "rating": 10,
    "publicReview": "Jaryn was a great host! The house was perfect for us—very clean and a wonderful space for our family. We felt comfortable right away and would definitely stay again."
  },
  {
    "id": 60,
    "listingId": 351827,
    "guestName": "Annie",
    "rating": 10,
    "publicReview": "Very cozy"
  },
  {
    "id": 61,
    "listingId": 344519,
    "guestName": "Ravi",
    "rating": 10,
    "publicReview": "All good"
  },
  {
    "id": 62,
    "listingId": 344519,
    "guestName": "Elsa",
    "rating": 10,
    "publicReview": "This place is beautiful. We had a blast on Jaryn’s place. We look forward to come back again!"
  },
  {
    "id": 63,
    "listingId": 344519,
    "guestName": "James",
    "rating": 8,
    "publicReview": "The stay was nice. The location was perfect for our trip. There was an unpleasant musty odor throughout the house that was strongest in the living room. Almost as though the place had just been opened after being closed up for an extended period of time. There also wasn't a king bed as listed in the description. All that said, I would stay here again."
  },
  {
    "id": 64,
    "listingId": 344519,
    "guestName": "Marina",
    "rating": 10,
    "publicReview": "Had a great stay at Jaryn's place. The place had beautiful and clean rooms, plenty of amenities, we especially loved the beautiful cups and plates we used. We came to visit Catamount and Jaryn's place was so close and convenient, it really was a 3 min drive and saved us a lot of time. Because we arrived at night, one half of us didn't see the numbers correctly and drove to the house next door, so future resident can keep note. There is air conditioning in the first floor."
  },
  {
    "id": 65,
    "listingId": 344519,
    "guestName": "Deborah",
    "rating": 10,
    "publicReview": "We loved our stay at Jaryn’s place. Clean, cozy, comfortable and well-equipped!"
  },
  {
    "id": 66,
    "listingId": 344519,
    "guestName": "Emily",
    "rating": 10,
    "publicReview": "Loved staying here! Very accessible to town but was serene and surrounded by woods. Living room windows were beautiful. Would definitely come back!"
  },
  {
    "id": 67,
    "listingId": 344519,
    "guestName": "Laura",
    "rating": 10,
    "publicReview": "We loved our stay here. Great house, great location - we’ll be back!"
  },
  {
    "id": 68,
    "listingId": 344519,
    "guestName": "Evelyn",
    "rating": 10,
    "publicReview": "We had a great stay! Close proximity to Catamount Mountain and plenty of local restaurants + towns. The house was perfect for the 5 of us. Keep in mind (currently) the rooms do not have curtains which was the only downside, but if you’re a morning person, then perfect! But really, the house and location was great and what we expected."
  },
  {
    "id": 69,
    "listingId": 344519,
    "guestName": "Evelyn Hafizov",
    "rating": 10,
    "publicReview": "We had a great stay! Close proximity to Catamount Mountain and plenty of local restaurants + towns. The house was perfect for the 5 of us. Keep in mind (currently) the rooms do not have curtains which was the only downside, but if you’re a morning person, then perfect! But really, the house and location was great and what we expected."
  },
  {
    "id": 70,
    "listingId": 344519,
    "guestName": "Monique",
    "rating": 10,
    "publicReview": "We planned our trip to Catamount and this was the ideal location. We could see the slopes from the house (right across). Learned our lesson that the maps show an entrance to the road close to the house, but that is not the case (it’s a dead end). The house was beautiful and the layout worked perfectly for us. More than enough rooms and space. Decor fits a cabin home, a little dated, but brought back memories of my childhood. Plenty of extra blankets, stocked kitchen, couldn’t have asked for a better setup."
  },
  {
    "id": 71,
    "listingId": 395581,
    "guestName": "Andrew Spiess",
    "rating": 10,
    "publicReview": "Lovely house on a pristine lake. Great views of the lake. With a nice boat ramp within walking distance. House was fully stocked with all the amenities ( trash bags, paper towels etc). Easy check in & out. I would definitely stay here again."
  },
  {
    "id": 72,
    "listingId": 395581,
    "guestName": "robert bastarache",
    "rating": 10,
    "publicReview": "Very nice sized rooms for family and guests . And we already were familiar with goose pond and love it ."
  },
  {
    "id": 73,
    "listingId": 395581,
    "guestName": "Meg Broderick",
    "rating": 10,
    "publicReview": ""
  },
  {
    "id": 74,
    "listingId": 395581,
    "guestName": "John Palmer",
    "rating": 10,
    "publicReview": "This house! We were very pleased the minute we walked in the door. It has a warm, cabin like atmosphere, and was very comfortable. We liked the three levels, the screened porch, and outside deck. You could tell this was a special place for the owners and it had a lot of their personal touches. It was close to hiking and biking trails. We highly recommend."
  },
  {
    "id": 75,
    "listingId": 395581,
    "guestName": "Angela",
    "rating": 10,
    "publicReview": "We enjoyed the house and the patio and backyard, especially the boats and lake access. Overall a fun stay."
  },
  {
    "id": 76,
    "listingId": 395581,
    "guestName": "Edith",
    "rating": 10,
    "publicReview": "Très belle maison sur un joli lac, nous avons passé un excellent week end ! Merci Jaryn."
  },
  {
    "id": 77,
    "listingId": 395581,
    "guestName": "Khuziama",
    "rating": 8,
    "publicReview": "stay was great, only issue we had was one of the beds was shaky and it's leg was loose, my friend sat on it and it was leaning on the side so he had to share with one of us, anyways the house is nice, the lake is right outside, the vibe is nice, the tv could be better it's a bit small, and the one downstairs is low resolution but not a big deal, overall loved my stay, the house and views are beautiful,"
  },
  {
    "id": 78,
    "listingId": 395581,
    "guestName": "Khuziama Rehman",
    "rating": 8,
    "publicReview": "stay was great, only issue we had was one of the beds was shaky and it's leg was loose, my friend sat on it and it was leaning on the side so he had to share with one of us, anyways the house is nice, the lake is right outside, the vibe is nice, the tv could be better it's a bit small, and the one downstairs is low resolution but not a big deal, overall loved my stay, the house and views are beautiful,"
  },
  {
    "id": 79,
    "listingId": 395581,
    "guestName": "Joseph",
    "rating": 10,
    "publicReview": "Everything was great"
  },
  {
    "id": 80,
    "listingId": 395581,
    "guestName": "Joseph Surace",
    "rating": 10,
    "publicReview": "Everything was great"
  },
  {
    "id": 81,
    "listingId": 357138,
    "guestName": "Sarah",
    "rating": 8,
    "publicReview": "Nice out of the way location for Great Barrington area. Driveway could be steep with snow in the winter."
  },
  {
    "id": 82,
    "listingId": 357138,
    "guestName": "Erika",
    "rating": 10,
    "publicReview": "Great fall weekend. Cozy fireplace and couches. Beautiful grounds. Excellent host."
  },
  {
    "id": 83,
    "listingId": 357138,
    "guestName": "Erica",
    "rating": 10,
    "publicReview": "My family and I had such a great few days at Jaryn’s place. We really loved the house and even though it was cooler outside, having the porch, deck, grill, and yard was such a plus. It was beautiful. The location is really great, and only a quick drive to downtown Great Barrington, nice farms and the grocery stores. We loved the living room and used the fireplace every night. I loved how it was close to town but on a private road, and very peaceful. I would 100% recommend a stay here, we will definitely be back."
  },
  {
    "id": 84,
    "listingId": 357138,
    "guestName": "Megan",
    "rating": 10,
    "publicReview": "The home was very private and peaceful. Exactly what we wanted for our Babymoon. Close to the downtown area. Great farms, shops, hikes, and restaurants in this area of the Berkshires- with a super close drive back to the home."
  },
  {
    "id": 85,
    "listingId": 357138,
    "guestName": "Taylor",
    "rating": 10,
    "publicReview": "Incredible! Beautiful home with an amazing outdoor space."
  },
  {
    "id": 86,
    "listingId": 357138,
    "guestName": "Cathy",
    "rating": 10,
    "publicReview": "Beautiful house in a wonderful remote, quiet, bucolic setting. We practically lived in the screened in porch. The kitchen was extremely well-equipped, beds were comfortable, plenty of storage space. Highly recommend."
  },
  {
    "id": 87,
    "listingId": 357138,
    "guestName": "Michael",
    "rating": 10,
    "publicReview": "A beautiful spacious house with amazing views— even when it rained, the house was a beautiful refreshing place to stay especially on the screened in porch. We like to hike and do music and theatre stuff, but it was tempting sometimes to stay in and just chill. Thanks Jaryn!"
  },
  {
    "id": 88,
    "listingId": 357138,
    "guestName": "William",
    "rating": 10,
    "publicReview": "Amazing property. The house looked better than the pictures. The setting was spectacular and completely private with great hiking close by yet very convenient to great Barrington. I highly recommend and look forward to coming back."
  },
  {
    "id": 89,
    "listingId": 357138,
    "guestName": "David",
    "rating": 8,
    "publicReview": "Bathroom floors needed scrubbing, the rest was clean. Dust on floor and furniture. Good water heater with very hot water. Good size sofas, comfortable bed, great setting. Good washer and dryer and cleaning supplies. Needed a cleaning brush for kitchen and a broom and dustpan but had vacuum in basement. Great stove and outdoor grill. Comfortable outdoor seating. Great setting for relaxing and sleeping well. Plenty of towels. Snacks for welcoming were good. Needs paint touch ups in walls bit overall comfortable and pleasing to stay for a few days."
  },
  {
    "id": 90,
    "listingId": 357138,
    "guestName": "Sunnie",
    "rating": 10,
    "publicReview": "Jaryn’s place was fabulous for what we needed. An antidote to crazy, hot, smelly NYC! Thank you Jaryn for sharing your home with us and allowing us to stay one hour past check out time. It was generous of you and so greatly appreciated it. xoxo."
  },
  {
    "id": 91,
    "listingId": 392704,
    "guestName": "Joseph",
    "rating": 10,
    "publicReview": "Very comfortable and cozy accomodations. The outdoor grill and kitchen had just what we needed for the cooking meals when we wanted to dine-in. Lovely 3-season porch."
  },
  {
    "id": 92,
    "listingId": 392704,
    "guestName": "Julie",
    "rating": 10,
    "publicReview": "We thoroughly enjoyed our stay at this cottage. It was perfect to serve as a home base for exploring all that The Berkshires and southern Vermont have to offer. The location was outstanding and the neighborhood was quiet. A peaceful retreat that was welcoming every evening. Beds are comfy, too!"
  },
  {
    "id": 93,
    "listingId": 392704,
    "guestName": "Conor",
    "rating": 8,
    "publicReview": "Great retreat to a quiet cabin by the water. Highly recommend"
  },
  {
    "id": 94,
    "listingId": 392704,
    "guestName": "Louise",
    "rating": 10,
    "publicReview": "This cottage is in a beautiful spot--the perfect place for your Berkshires getaway. Jaryn is prompt and generous. We had a great stay!"
  },
  {
    "id": 95,
    "listingId": 392704,
    "guestName": "Timothy",
    "rating": 10,
    "publicReview": "Cozy lakeside cabin in a quiet community on the shores of Stockbridge Bowl"
  },
  {
    "id": 96,
    "listingId": 392704,
    "guestName": "Brij Khurana",
    "rating": 10,
    "publicReview": "Great property near the lake"
  },
  {
    "id": 97,
    "listingId": 392704,
    "guestName": "Daniel Mollod",
    "rating": 10,
    "publicReview": "Everything was as described. This was a cottage in a community by the shore of the Stockbridge Bowl, a one minute walk to a beach and kayak launch, five minute drive to Tanglewood and Lenox. The cottage itself is small but has been tastefully updated in terms of bathroom fixtures and kitchen. Communication with the ownership team was great--quick responses to even small questions, Our only suggestion would be to up the quality of the mattresses. Would happily stay here again."
  },
  {
    "id": 98,
    "listingId": 392704,
    "guestName": "Jacqueline Washack",
    "rating": 6,
    "publicReview": "House was very rustic. The sleeping accommodations were not as expected. The two rooms in the attic were very hot. They had an air conditioner across the attic, and it was a window unit. It cooled the house, but not the room in the attic. I realize there was a heat wave, but that attic room was very hot. We were able to get the rest of the house cooled off. The small table on the porch was not big enough to sit people to eat dinner. You need potholders and more dish towels more hooks in the bathroom to hang towels another ceiling fan on the porch over the table, some baker shelves or shelving on the porch to put more things. It was convenient to the Lake, but it was not on the property as pictured there should have been another air conditioner in that small bedroom in the attic."
  },
  {
    "id": 99,
    "listingId": 392704,
    "guestName": "Tyler",
    "rating": 10,
    "publicReview": "Beautiful home. Jaryn is a wonderful host - would stay again!"
  },
  {
    "id": 100,
    "listingId": 392704,
    "guestName": "Nikolaus",
    "rating": 6,
    "publicReview": "We had a wonderful stay in the Berkshires, helped by nice weather and plenty of nearby places to visit. The cottage is sufficiently equipped but has limited insulation, so it may feel cold in the fall or winter. The lake is easily accessible but only barely visible from the porch. The window A/C provided sufficient cooling for the entire cottage, and the hot water and water pressure were good. Jaryn was responsive to questions, and check-in and key access were easy. The TV is a Roku unit that requires user registration. The living room area was cozy and comfortable, however, the two downstairs beds had soft full-size mattresses that seemed suitable for only one person each. The two upstairs twin beds were in a non-air-conditioned space. Overall, we enjoyed our stay and appreciated the location."
  },
  {
    "id": 101,
    "listingId": 432369,
    "guestName": "Andrea Kirby",
    "rating": 10,
    "publicReview": "Amazingly beautiful location, full of Berkshires charm. The fireplace was a huge bonus on a cold fall night!Hosts welcomed us with local apple cider and cinnamon donuts… Will definitely stay here again."
  },
  {
    "id": 102,
    "listingId": 432369,
    "guestName": "Miri",
    "rating": 10,
    "publicReview": "Loved this spot! The house was cute and cozy and had everything we needed, the lake access was incredible and beautiful and the location near town was fabulous! We’ll be back for sure!"
  },
  {
    "id": 103,
    "listingId": 432369,
    "guestName": "Emily",
    "rating": 10,
    "publicReview": "Great place! Gorgeous surroundings, peaceful, and comfy beds. Jaryn was a great host - always proactive in his communication."
  },
  {
    "id": 104,
    "listingId": 432369,
    "guestName": "Adam",
    "rating": 10,
    "publicReview": "Great location, well equipped and comfortable place. We appreciated that Jaryn was proactive about communication and answered our questions very quickly."
  },
  {
    "id": 105,
    "listingId": 432369,
    "guestName": "Lenny",
    "rating": 10,
    "publicReview": "We had a wonderful, peaceful, and relaxing stay at Jaryn's place. The house is cozy, warm, and tastefully decorated, with a well-equipped kitchen. When we had to change our schedule at the last minute due to a family emergency, Jaryn was incredibly helpful and accommodating. Located in a quiet neighborhood just steps from the pond and surrounded by trees, the home is a true retreat. Check-in and check-out were seamless. We highly recommend staying here!"
  },
  {
    "id": 106,
    "listingId": 432369,
    "guestName": "Alain",
    "rating": 8,
    "publicReview": "Very nice house, great location. We enjoyed our weekend there"
  },
  {
    "id": 107,
    "listingId": 432369,
    "guestName": "Marcel",
    "rating": 10,
    "publicReview": "Cosy place with all the things and comforts needed!"
  },
  {
    "id": 108,
    "listingId": 432369,
    "guestName": "Jeanette",
    "rating": 10,
    "publicReview": "loved this home and the peaceful surroundings, looking forward to staying again. Lots of things close by and downtown Lenox only about a 10min drive."
  },
  {
    "id": 109,
    "listingId": 432369,
    "guestName": "Lilly",
    "rating": 10,
    "publicReview": "Jaryn was a wonderful host and the place was great. Beautiful house, cozy and well located. We really enjoyed our stay!"
  },
  {
    "id": 110,
    "listingId": 432369,
    "guestName": "Jin",
    "rating": 10,
    "publicReview": "We had a wonderful two-night stay at Jaryn’s cottage. The location is very peaceful and a few steps, you’ll get the beautiful pond view. The stay at the cottage was very cozy. Beds were super comfy and clean. We were able to find anything we needed at the kitchen too. Highly recommend to anyone who’ll be staying in the area and would definitely return if we were to come back to Pittsfield area."
  },
  {
    "id": 111,
    "listingId": 397346,
    "guestName": "Maria",
    "rating": 10,
    "publicReview": "We loved it! we were 3 couple friends and it was. perfect! we love that the old rail bed trail along the Williams River was right there - literally in the front yard - an exquisite easy leisurely walk. It was also incredibly easy to get to all the quaint towns and beautiful trails in the area. The house is great for gatherings. The kitchen was amazingly well stocked with appliances, and cooking ware. We enjoyed very much preparing meals and laughter together. We had a devine warm afternoon outside on the deck to do yoga. Had a fabulous time. Thank you Jaryn and team."
  },
  {
    "id": 112,
    "listingId": 397346,
    "guestName": "Rob",
    "rating": 10,
    "publicReview": "Privately located, yet short drive away from all the local attractions. Bedrooms were extremely comfortable. with a queen size bed for all couples. Nice big table in the dining area for playing games. This place is a good value find for that area"
  },
  {
    "id": 113,
    "listingId": 397346,
    "guestName": "elaine watson",
    "rating": 10,
    "publicReview": "It was in such a great location to the beautiful towns,Norman Rockwell museum etc. The host answered right away at any of our questions. The rooms were neat and clean with everything provided."
  },
  {
    "id": 114,
    "listingId": 397346,
    "guestName": "Tyler",
    "rating": 10,
    "publicReview": "My family and I had an excellent time at Jaryn's home in The Berkshires. It was close to many of the local towns and Tanglewood. We appreciated having enough space and bedrooms as well as the washer / dryer to do laundry!"
  },
  {
    "id": 115,
    "listingId": 397346,
    "guestName": "Howard",
    "rating": 10,
    "publicReview": "The home was clean, comfortable, and well stocked. The bedrooms and bathrooms were modern. The internet was strong and reliable. Verizon network was spotty but T Mobile was fine. That happens in the Berkshires."
  },
  {
    "id": 116,
    "listingId": 397346,
    "guestName": "Manuel",
    "rating": 10,
    "publicReview": "This home is very conveniently located. Beautiful gardens and a short trail to a meadow - great for kids and pet dogs to explore, kitchen had everything you need to prepare meals. We had a lovely time,"
  },
  {
    "id": 117,
    "listingId": 397346,
    "guestName": "Igor",
    "rating": 10,
    "publicReview": "Jarin was an outstanding host — 5 stars! The house was spotless, comfy, and exactly as pictured. Great location with easy access to shops and attractions. Check‑in was smooth and Jarin’s communication was friendly and prompt. Lovely amenities and excellent value — highly recommend staying here!"
  },
  {
    "id": 118,
    "listingId": 397346,
    "guestName": "Rebekah",
    "rating": 10,
    "publicReview": "Homey, quiet spot with plenty of space and strong amenities. We didn’t get to use most of them due to a quick trip, but the fireplace, wood‑burning stove, and outdoor grill/patio all looked great. My partner did use the jacuzzi tub and had a great experience. Ideal for a relaxing Berkshire getaway. Convenient location for exploring nearby towns and fitting in hikes. Overall, a low‑key, restful weekend setting that worked well for both family time and getting outdoors."
  },
  {
    "id": 119,
    "listingId": 397346,
    "guestName": "Michael",
    "rating": 10,
    "publicReview": "Loved staying here, will be back for ski trips!"
  },
  {
    "id": 120,
    "listingId": 397346,
    "guestName": "Michael Walsh",
    "rating": 10,
    "publicReview": "Loved staying here, will be back for ski trips!"
  },
  {
    "id": 121,
    "listingId": 344515,
    "guestName": "Benjamin",
    "rating": 10,
    "publicReview": "A really great spot to stay with great views in the fall! Well worth it for staying with a few other couples in the area for a long weekend."
  },
  {
    "id": 122,
    "listingId": 344515,
    "guestName": "Lance",
    "rating": 10,
    "publicReview": "Beautiful house with amazing view. Would absolutely recommend!"
  },
  {
    "id": 123,
    "listingId": 344515,
    "guestName": "Brooke Lackey",
    "rating": 10,
    "publicReview": "He was awesome would deff stay again !!"
  },
  {
    "id": 124,
    "listingId": 344515,
    "guestName": "Lisa Or Lara VanInwegen",
    "rating": 10,
    "publicReview": "The home was just as described and clean and comfy. Plenty of room for everyone and beautiful scenery."
  },
  {
    "id": 125,
    "listingId": 344515,
    "guestName": "Derek",
    "rating": 10,
    "publicReview": "This place is very clean and very close for any activity in The Berkshires. Jaryn communicated quickly and clearly and everything was a breeze. Looking forward to staying there again!"
  },
  {
    "id": 126,
    "listingId": 344515,
    "guestName": "Chris",
    "rating": 10,
    "publicReview": "Clean, comfortable, and lots of room in a wonderful area. Great value, even just for four of us. Thank you, Jaryn!"
  },
  {
    "id": 127,
    "listingId": 344515,
    "guestName": "Ye-Jin",
    "rating": 10,
    "publicReview": "We had a great time at Jaryn’s place! The view is nice at the balcony and it’s peaceful and quiet neighborhood! Wish we had more time to stay at home to enjoy! Thank you for hosting us, Jaryn! :)"
  },
  {
    "id": 128,
    "listingId": 344515,
    "guestName": "Alexandra",
    "rating": 10,
    "publicReview": "Reserved for my team coming from all over for 3 days of training. Long days! They loved coming back to this spot to relax and enjoy."
  },
  {
    "id": 129,
    "listingId": 344515,
    "guestName": "Benjamin",
    "rating": 10,
    "publicReview": "We had an amazing stay. The house and the surrounding area were beautiful, and Jaryn was a super responsive host. We would definitely stay here again!"
  },
  {
    "id": 130,
    "listingId": 344515,
    "guestName": "Francisco",
    "rating": 8,
    "publicReview": "Overall, the house was beautiful and well kept, and we really enjoyed our stay. The space itself was comfortable and had a great vibe. The only downside was the lack of curtains or blinds, especially at night—it made the place feel a little eerie and didn’t offer much privacy. For example, the downstairs bathroom had no curtain at all, which was a bit uncomfortable. We also couldn’t find the TV remote and had to download an app to use the TV. Adding some window coverings and making sure essentials like the remote are available would make a big difference. Aside from that, everything else was great."
  },
  {
    "id": 131,
    "listingId": 344517,
    "guestName": "Elaine",
    "rating": 10,
    "publicReview": "We had a wonderful time! So cozy and sweet. Everyone in our group loved it. Very peaceful and private. Definitely would like to come back!"
  },
  {
    "id": 132,
    "listingId": 344517,
    "guestName": "Emmilie",
    "rating": 10,
    "publicReview": "I had such a wonderful weekend at Scribe's Stables, that I'm trying desperately to remember everything I loved. - first off, this is a relatively remote location. there isn't a ton of service (if you use Verizon), and the wifi at the air bnb was fantastic, and allowed us to download maps etc before we hit the road. - SO MANY OUTLETS. Such a positive! - the bathroom was a little different, with a main area for sinks, seperate shower and toilet rooms, which was awesome. - loved the check out process! I really hate when air bnbs make you do all the laundry, dishes, etc, and Jaryn's check out process truly made it feel like a vacation vs cleaning up after a weekend of exploring. - would 100% stay here again."
  },
  {
    "id": 133,
    "listingId": 344517,
    "guestName": "Alan",
    "rating": 10,
    "publicReview": "This is quite a beautiful place, and it's clear that there was a good deal of intention in the renovation of the barn as well as the finishes and furnishings. It was incredibly quiet, and the beds and linens were very comfortable. It only has a kitchenette, but that is made clear in the listing and was zero issue for us. If you are looking for a place that is gorgeous, and is also a bit different (in all the best ways) then this is the place for you."
  },
  {
    "id": 134,
    "listingId": 344517,
    "guestName": "Dana",
    "rating": 10,
    "publicReview": "This was one of the absolute best places we've stayed in our history with Airbnb (which is saying quite a lot, as we've stayed in a lot of truly incredible places!) It was so clear how much love, care and attention were put into renovating this barn space, and the result was a unique, spacious, beautiful place to call \"home\" for the duration of our stay in the Berkshires. We would definitely love to come back."
  },
  {
    "id": 135,
    "listingId": 344517,
    "guestName": "Madeline",
    "rating": 10,
    "publicReview": "My fiancée and I had a wonderful time. We came to celebrate our engagement, the space was peaceful and welcoming. The surrounding areas are full of beauty and had good food! Would definitely stay again!"
  },
  {
    "id": 136,
    "listingId": 344517,
    "guestName": "Richard",
    "rating": 10,
    "publicReview": "We spent 7 wonderful days at the stable. We enjoyed many of the great restaurants in the area and went on long bike rides. Sitting on the screened in porch was our favorite thing to do. The living space was beautifully rustic, spacious and comfortable. We can’t wait to return."
  },
  {
    "id": 137,
    "listingId": 344517,
    "guestName": "Sabrina Stidsen",
    "rating": 10,
    "publicReview": ""
  },
  {
    "id": 138,
    "listingId": 344517,
    "guestName": "Prem Chander",
    "rating": 10,
    "publicReview": "An amazing place and a great host :) Jaryn was very helpful and communicative. The house was beautiful and well situated. The beach nearby, proximity to GB, and decor made our stay memorable. 10/10 do it again."
  },
  {
    "id": 139,
    "listingId": 344517,
    "guestName": "Adam",
    "rating": 10,
    "publicReview": "Lovely place in a beautiful location."
  },
  {
    "id": 140,
    "listingId": 344517,
    "guestName": "Colby",
    "rating": 10,
    "publicReview": "This was an amazing place to get away and spend some time with friends. It was the perfect size for the four of us, and had a fantastic ambience. Jaryn was an exceptional host. He was very responsive to questions and very accommodating. Highly recommend staying here!"
  },
  {
    "id": 141,
    "listingId": 402020,
    "guestName": "Craig",
    "rating": 10,
    "publicReview": "Great location, walking distance to everything Lenox has to offer, and just tucked away enough to feel cozy and quiet. House was exactly what we were looking for in a fall get away - cozy, convenient, and felt like home."
  },
  {
    "id": 142,
    "listingId": 402020,
    "guestName": "Sarah",
    "rating": 10,
    "publicReview": "Lovely historic home steps away from the center of beautiful Lenox. We could walk everywhere. Beautiful back patio and many comfy and welcoming sitting areas. Comfortable beds. Pristine towels and linens. Very clean. A perfect weekend stay. (we stayed here 18 years ago at a local wedding, and it was exactly how we remembered it) Perfection! thank you!"
  },
  {
    "id": 143,
    "listingId": 402020,
    "guestName": "Elizabeth",
    "rating": 10,
    "publicReview": "A group of 5 of us found ourselves in a pinch when our rental had to cancel due to a plumbing issue. I immediately reached out to Jaryn to see if their house would be available on such short notice. Not only did they write back immediately, they were flexible and understanding. We found that the house perfect for the 5 of us and especially loved the location. We enjoyed being able to make meals at home. The beds were very comfortable. We loved our stay and felt very lucky that it was available!"
  },
  {
    "id": 144,
    "listingId": 402020,
    "guestName": "Deborah",
    "rating": 10,
    "publicReview": "Stayed here with two families and it there was plenty of space for all! Only the king bedroom has a dedicated bathroom with the other three using the main hallway one upstairs or the full bath downstairs. Host was proactive with communication and made checkin/out a breeze! Would recommend!"
  },
  {
    "id": 145,
    "listingId": 402020,
    "guestName": "Deborah Whalen",
    "rating": 10,
    "publicReview": "Stayed here with two families and it there was plenty of space for all! Only the king bedroom has a dedicated bathroom with the other three using the main hallway one upstairs or the full bath downstairs. Host was proactive with communication and made checkin/out a breeze! Would recommend!"
  },
  {
    "id": 146,
    "listingId": 402020,
    "guestName": "Kyla",
    "rating": 10,
    "publicReview": "Loved the house. Looking forward to renting it again someday!"
  },
  {
    "id": 147,
    "listingId": 402020,
    "guestName": "Kyla Sternlieb",
    "rating": 10,
    "publicReview": "Loved the house. Looking forward to renting it again someday!"
  },
  {
    "id": 148,
    "listingId": 402020,
    "guestName": "Irene",
    "rating": 10,
    "publicReview": "Carol’s home is everything you could want for a family gathering. Seven of us stayed there over Thanksgiving and it was just perfect. Communication with the host was great and we felt right at home and well taken care of. The house is large and beautifully furnished, the kitchen was ideal for making Thanksgiving dinner and we loved the round dining room table. The neighborhood is very quiet yet you can easily walk into town. Lenox has many great eating places, lots of nice shops and is just a great area to explore. We couldn’t have been happier and hope to stay there again."
  },
  {
    "id": 149,
    "listingId": 402020,
    "guestName": "Irene Lang",
    "rating": 10,
    "publicReview": "Carol’s home is everything you could want for a family gathering. Seven of us stayed there over Thanksgiving and it was just perfect. Communication with the host was great and we felt right at home and well taken care of. The house is large and beautifully furnished, the kitchen was ideal for making Thanksgiving dinner and we loved the round dining room table. The neighborhood is very quiet yet you can easily walk into town. Lenox has many great eating places, lots of nice shops and is just a great area to explore. We couldn’t have been happier and hope to stay there again."
  },
  {
    "id": 150,
    "listingId": 402020,
    "guestName": "joseph federico",
    "rating": 6,
    "publicReview": "Difficult to heat properly. Many windows could not be closed allowing cold drafts to enter. Many doors on the bathrooms and bedrooms cannot be closed. Out side of the location we very disappointed for the 2400.00 we spent for 3 nights. Would not stay there again."
  },
  {
    "id": 151,
    "listingId": 396469,
    "guestName": "Brenna",
    "rating": 10,
    "publicReview": "A cozy rustic space very convenient to all of the fun activities and cute towns of the berkshires."
  },
  {
    "id": 152,
    "listingId": 396469,
    "guestName": "Kerry McNally",
    "rating": 10,
    "publicReview": "Very clean and quiet neighborhood. Very close to Tanglewood! We had a lovely weekend"
  },
  {
    "id": 153,
    "listingId": 396469,
    "guestName": "Thomas",
    "rating": 10,
    "publicReview": "Spacious lake house with beautiful view of the lake. Jaryn was very responsive and provided great instructions. It is a great place to stay while exploring all the wonderful events the Berkshires have to offer in the summer!"
  },
  {
    "id": 154,
    "listingId": 396469,
    "guestName": "Reed",
    "rating": 10,
    "publicReview": "Very happy with our stay at Jaryn’s place in the Berkshires. Beautiful views all weekend long."
  },
  {
    "id": 155,
    "listingId": 396469,
    "guestName": "Justine",
    "rating": 10,
    "publicReview": "We had such a wonderful stay at Jaryn’s cabin. The location was perfect and peaceful. I loved waking up to the lake every day and being able to hop in the car and drive within 10 minutes to three great towns- Stockbridge, Lee and Lenox. We explored all three with great restaurant options. Our small children loved the house - it had a nice cozy old-school cabin feel. We visited in mid-October so it was a bit chilly but the easy-to-use fireplace helped to warm up the space. A great little spot to come with family and your pup too!"
  },
  {
    "id": 156,
    "listingId": 396469,
    "guestName": "Justine Trocchia",
    "rating": 10,
    "publicReview": "We had such a wonderful stay at Jaryn’s cabin. The location was perfect and peaceful. I loved waking up to the lake every day and being able to hop in the car and drive within 10 minutes to three great towns- Stockbridge, Lee and Lenox. We explored all three with great restaurant options. Our small children loved the house - it had a nice cozy old-school cabin feel. We visited in mid-October so it was a bit chilly but the easy-to-use fireplace helped to warm up the space. A great little spot to come with family and your pup too!"
  },
  {
    "id": 157,
    "listingId": 396469,
    "guestName": "David",
    "rating": 10,
    "publicReview": "This was a fantastic Airbnb right on the lake which was a perfect escape from the city. Easy driving to the towns of the Berkshires, but also a great place to just relax and stay in. I would highly recommend!"
  },
  {
    "id": 158,
    "listingId": 396469,
    "guestName": "David Barko",
    "rating": 10,
    "publicReview": "This was a fantastic Airbnb right on the lake which was a perfect escape from the city. Easy driving to the towns of the Berkshires, but also a great place to just relax and stay in. I would highly recommend!"
  },
  {
    "id": 159,
    "listingId": 396469,
    "guestName": "Julie House",
    "rating": 10,
    "publicReview": "A lovely cabin in a cozy neighborhood. Had everything we needed for a long weekend. Host is very responsive."
  },
  {
    "id": 160,
    "listingId": 396469,
    "guestName": "Julie House",
    "rating": 10,
    "publicReview": "A lovely cabin in a cozy neighborhood. Had everything we needed for a long weekend. Host is very responsive."
  },
  {
    "id": 161,
    "listingId": 412911,
    "guestName": "Karen",
    "rating": 10,
    "publicReview": "We (four friends in our mid-60s) had a great stay in Jaryn’s home. It was the perfect place for our weekend get-together. The kitchen was really well-equipped, and we enjoyed making breakfast each morning, and visiting around the large dining table. The bathrooms were clean, bedrooms comfortable (master suite is beautiful) , and everything worked well. The downstairs area with the TVs, games and sofas was a fun place to hang out. The house is an easy drive from lots of local restaurants and attractions. Definitely worked better for us than hotel rooms would have and we hope to stay again sometime!"
  },
  {
    "id": 162,
    "listingId": 412911,
    "guestName": "Alyssa Noble",
    "rating": 10,
    "publicReview": "This house was perfect for our family! The basement provided extra space for our kids to play & the Pac-Man game plus foosball and movie theater room were a great addition! They provided plenty of towels, toilet paper & toiletries. Host was very responsive prior to checking in with questions I had. Will definitely stay again!"
  },
  {
    "id": 163,
    "listingId": 412911,
    "guestName": "Alicia",
    "rating": 10,
    "publicReview": "The kitchen was wonderful and well stocked. The neighborhood was quiet and peaceful, and as long as you make a grocery store run prior to your arrival, you never have to leave the house!"
  },
  {
    "id": 164,
    "listingId": 412911,
    "guestName": "KEVIN ECKER",
    "rating": 10,
    "publicReview": "Wonderful home with a wonderful location and couldn’t ask for more from the hosts thank you so much."
  },
  {
    "id": 165,
    "listingId": 412911,
    "guestName": "Melanie",
    "rating": 10,
    "publicReview": "We had a great time in Pittsfield! Jaryn was a very responsive host! Highly recommend-the master shower was amazing!!!"
  },
  {
    "id": 166,
    "listingId": 412911,
    "guestName": "Betty Jo",
    "rating": 10,
    "publicReview": "My husband, daughter and I stayed at Jaryn's for 4 nights and had a wonderful experience. The home is beautiful with loads of amenities and the property is stunning. We loved sitting on the patio looking out at the expansive lawn and watching wild turkeys and hawks. The beds were super comfortable. The ranch-like house was perfect for my husband who has difficulty walking and with steps. Jaryn was very responsive when we had questions about the a/c and we truly appreciated that. We visited the Norman Rockwell museum, a farm and took meandering drives through the countryside. This was the perfect getaway for us and we'd love a return visit to Jaryn's lovely home."
  },
  {
    "id": 167,
    "listingId": 412911,
    "guestName": "Cristal",
    "rating": 10,
    "publicReview": "The home was lovely and well appointed. The basement was a fun place for our family to spend on what turned out to be a rainy weekend. Highly recommend, and we would definitely stay here again."
  },
  {
    "id": 168,
    "listingId": 412911,
    "guestName": "Rich",
    "rating": 10,
    "publicReview": "The property was clean, ready for arrival, and clearly well maintained. The kitchen finishes and fixtures was new or next to new. It was exactly as described in the listing photos and descriptions. Jaryn responded quickly to all my questions prior to and during my stay in a timely and clear manner. The deck and backyard amenities are fantastic and family-friendly. The hvac, plumbing, and wifi amenities were working as expected, and the primary suite bathroom is exceptional. Great property, great service, timely responder. We would stay there again without question."
  },
  {
    "id": 169,
    "listingId": 412911,
    "guestName": "Michael Slish",
    "rating": 10,
    "publicReview": "Beautiful house well appointed. Game room is fun. Lots of TV's, good grill and great firepit and backyard. Highly recommend and would come back."
  },
  {
    "id": 170,
    "listingId": 412911,
    "guestName": "Sarah",
    "rating": 10,
    "publicReview": "We had a very nice weekend getaway. The house was very well kept and clean, thank you!"
  },
  {
    "id": 171,
    "listingId": 409114,
    "guestName": "Lisa",
    "rating": 10,
    "publicReview": "Clean and spacious and in a lovely location...."
  },
  {
    "id": 172,
    "listingId": 409114,
    "guestName": "Jen",
    "rating": 10,
    "publicReview": "Really lovely home with all the amenities. Seems recently renovated, so updated kitchen and bathrooms. Nicely decorated. Appreciated the thoughtful little things: bundle of wood for beautiful fireplace, cords to plug in at bedside, super comfortable beds, dog bowls, compost bucket. Felt right at home and very cozy. Thank you!"
  },
  {
    "id": 173,
    "listingId": 409114,
    "guestName": "Paul",
    "rating": 10,
    "publicReview": "Great place, great house, great location and great host"
  },
  {
    "id": 174,
    "listingId": 409114,
    "guestName": "Alexis Ekstein",
    "rating": 10,
    "publicReview": "We enjoyed our stay. Jaryn was very responsive and the check in process went smoothy. The house was clean and on a quiet street."
  },
  {
    "id": 175,
    "listingId": 409114,
    "guestName": "Victoria Kelly",
    "rating": 10,
    "publicReview": "Great home close to town! Very clean! Rooms were great!"
  },
  {
    "id": 176,
    "listingId": 409114,
    "guestName": "Rachel",
    "rating": 10,
    "publicReview": "We had a fantastic stay. The house was excactly as listed - beautiful setting, very clean, and a great location. We enjoyed a short hike right off the road from the house. visited Tanglewood, and the Great Barrington area. Thank you for a great stay!"
  },
  {
    "id": 177,
    "listingId": 409114,
    "guestName": "Gabi",
    "rating": 10,
    "publicReview": "We had the best time! Beautiful house amazing location! Would love to stay again!!"
  },
  {
    "id": 178,
    "listingId": 409114,
    "guestName": "Jocelyn Bramhall",
    "rating": 10,
    "publicReview": ""
  },
  {
    "id": 179,
    "listingId": 409114,
    "guestName": "Jennifer",
    "rating": 10,
    "publicReview": "We had a great stay! Jaryn was incredibly responsive and helpful whenever we had questions. The house was exactly as advertised... spacious, comfortable, and equipped with a kitchen that was a pleasure to cook in. We also loved the outdoor space and only wished the weather had been a little warmer so we could have taken full advantage of the pool. The location was perfect as well, just a short drive from restaurants, grocery stores, and several charming nearby towns to explore. We would happily stay here again!"
  },
  {
    "id": 180,
    "listingId": 409114,
    "guestName": "Erick",
    "rating": 10,
    "publicReview": "Amazing stay if you are looking for a nice getaway with family and friends this is it everything is as described, friendly host , very attentive"
  }
];
