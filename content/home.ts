export const photos = {
  living: "1583847268964-b28dc8f51f92",
  kitchen: "1484154218962-a197022b5858",
  bathroom: "1552321554-5fefe8c9ef14",
  bedroom: "1616486029423-aaa4789e8c9a",
  cleaner: "1647381518264-97ff1835026f",
};

export const promises = [
  "Same cleaner every visit",
  "Insured up to $1M",
  "Background-checked staff",
  "Plant-based products",
  "Fixed price, agreed up front",
  "Free re-clean within 24 hours",
];

export type Illustration = "spray" | "vacuum" | "bucket" | "desk";

export const services: { name: string; from: number; text: string; illustration: Illustration }[] = [
  {
    name: "Regular home clean",
    from: 95,
    text: "Weekly or every other week. Kitchen, bathrooms, dusting and floors, done the way you like it, by someone who knows your home.",
    illustration: "spray",
  },
  {
    name: "Deep clean",
    from: 150,
    text: "The once-a-season reset: limescale, grout, skirting, door frames, behind the sofa and under the beds.",
    illustration: "vacuum",
  },
  {
    name: "Move in or out",
    from: 190,
    text: "An empty home cleaned inside every cupboard, oven and fridge, so the deposit comes back and the new place feels like yours.",
    illustration: "bucket",
  },
  {
    name: "Office clean",
    from: 120,
    text: "Before nine or after six. Desks, kitchens, meeting rooms and washrooms for teams of five to fifty.",
    illustration: "desk",
  },
];

export type RoomId = "kitchen" | "bathroom" | "bedroom" | "living";

export const rooms: { id: RoomId; name: string; photo: string; alt: string; tasks: string[] }[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    photo: photos.kitchen,
    alt: "Bright modular kitchen with a steel fridge and white cabinets",
    tasks: [
      "Worktops and splashback wiped and degreased",
      "Hob, extractor hood and microwave cleaned",
      "Sink and taps descaled until they shine",
      "Cabinet fronts and handles wiped",
      "Bins emptied and relined",
      "Floor vacuumed and mopped",
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    photo: photos.bathroom,
    alt: "White bathroom with a pedestal sink, plants and a checkered floor",
    tasks: [
      "Toilet cleaned inside, outside and behind",
      "Shower, bath and screen descaled",
      "Tiles and grout scrubbed",
      "Mirror and glass polished streak-free",
      "Towels folded or changed",
      "Floor mopped into the corners",
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    photo: photos.bedroom,
    alt: "Sunlit bedroom with a made bed, a leather bench and wall art",
    tasks: [
      "Bed made, or linen changed if you leave it out",
      "Surfaces, lamps and frames dusted",
      "Mirrors and glass polished",
      "Under the bed vacuumed",
      "Clothes folded onto the chair",
      "Bins emptied",
    ],
  },
  {
    id: "living",
    name: "Living room",
    photo: photos.living,
    alt: "Living room with a sofa, plants and a large window",
    tasks: [
      "Shelves, TV and skirting dusted",
      "Sofa vacuumed and cushions plumped",
      "Window sills and handles wiped",
      "Rugs and floors vacuumed",
      "Hard floors mopped",
      "Light switches and door handles disinfected",
    ],
  },
];

export const steps = [
  {
    title: "Get your price",
    text: "Tell us the size of your home and how often. The price you see is the price you pay, with no hourly surprises.",
  },
  {
    title: "Pick a day",
    text: "Choose a morning or afternoon slot. We confirm your cleaner by text within two hours, with their name and photo.",
  },
  {
    title: "Come home to it",
    text: "You get a message when they leave. If anything was missed, tell us within 24 hours and we come back for free.",
  },
];

export const stats = [
  { value: 12600, suffix: "", label: "cleans since 2019" },
  { value: 38, suffix: "", label: "cleaners on our own payroll" },
  { value: 4.9, suffix: "", decimals: 1, label: "average from 1,240 reviews" },
  { value: 92, suffix: "%", label: "of customers book again" },
];

export const reviews = [
  { name: "Priya N.", area: "Old Harbor", text: "Marta has cleaned our flat every other Friday for two years. She knows where everything goes better than we do." },
  { name: "Daniel K.", area: "Westbank", text: "Booked a move-out clean on a Tuesday, keys handed back on Thursday, full deposit returned. Worth every dollar." },
  { name: "Hannah L.", area: "North Pier", text: "The price online was the price on the invoice. That alone puts them ahead of the last three companies we tried." },
  { name: "Omar S.", area: "Riverside", text: "Our office of twenty is cleaned before we arrive. The kitchen has never been this clean, and I would know." },
  { name: "Grace T.", area: "Hillcrest", text: "They missed the oven once. I sent a photo, someone came back the same afternoon and apologised. That's how you keep a customer." },
  { name: "Lukas B.", area: "Old Harbor", text: "No harsh smell after they leave, which matters with a toddler and a dog. Just a clean flat." },
  { name: "Mei W.", area: "Seagate", text: "The deep clean got limescale off a shower screen I had given up on. I did not know the glass was that clear." },
  { name: "Tom R.", area: "Westbank", text: "I rebook in two taps every month. The same person turns up, says hello to the cat, gets on with it." },
];

export const faqs = [
  {
    q: "Do I need to be home?",
    a: "No. Most customers leave a key in our coded lockbox or with the concierge. Your cleaner texts when they arrive and when they leave.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes: vacuum, mops, cloths and our plant-based products. If you prefer your own products, leave them out and we'll use those.",
  },
  {
    q: "Will it be the same cleaner every time?",
    a: "For regular cleans, yes. If your cleaner is on holiday we send a colleague who has read their notes on your home, and tell you in advance.",
  },
  {
    q: "What if I'm not happy with something?",
    a: "Tell us within 24 hours, ideally with a photo, and we come back to redo it at no charge.",
  },
  {
    q: "How do I cancel or move a booking?",
    a: "Free of charge up to 24 hours before the visit. Later than that we charge half the visit, because your cleaner has kept the time for you.",
  },
  {
    q: "Are your cleaners employed or freelance?",
    a: "Employed, on a proper wage with paid holiday. That's why the same people stay with us for years, and with you.",
  },
];
