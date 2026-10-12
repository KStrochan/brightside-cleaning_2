import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Brightside Cleaning",
  description:
    "Home and office cleaning in Harborview with the same vetted cleaner every visit, a fixed price up front and our own eco products.",
  url: "https://brightside-cleaning.vercel.app",
  locale: "en",
  routes: ["/", "/quote", "/contact"],
  nav: [
    { href: "/#services", label: "Services" },
    { href: "/#rooms", label: "What we clean" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
  contact: {
    phone: "+1 (555) 014-2290",
    address: "48 Mariner Street, Harborview",
    hours: "Cleans Mon to Sat 8:00 to 19:00, phones open 7:30 to 20:00",
  },
  photoCredits: [
    { author: "Minh Pham", url: "https://unsplash.com/@minhphamdesign" },
    { author: "Naomi Hébert", url: "https://unsplash.com/@naomish" },
    { author: "Phil Hearing", url: "https://unsplash.com/@philhearing" },
    { author: "Spacejoy", url: "https://unsplash.com/@spacejoy" },
    { author: "Josue Michel", url: "https://unsplash.com/@josuemichelphotography" },
  ],
};
