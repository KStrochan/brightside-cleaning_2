# Brightside Cleaning

Demo website for Brightside Cleaning, a home and office cleaning company I made up for my portfolio. The business, people, reviews and prices are fictional; the code is real.

Home and office cleaning in Harborview with the same vetted cleaner every visit, a fixed price up front and our own eco products.

## Status

Live at https://brightside-cleaning.vercel.app

What is built:

- Home: services with animated illustrations, a room-by-room checklist, how it works, numbers, the team, reviews and FAQ
- Quote and booking (`/quote`): property, rooms, type of clean, frequency and extras, with the price, team size and time updating as you go, then a day and time from a demo diary, sent as a booking request
- Contact page (`/contact`) with a message form

## Motion

The site is animation-heavy on purpose, and all of it is CSS plus a few small hooks in `lib/motion.ts`. No animation library ships to the browser.

- Hero: the photo starts behind fogged glass and a squeegee wipes it clear on load, then sparkles and two text messages from the cleaner pop in
- Soap bubbles drifting up behind the hero, the numbers band and the inner pages
- A tilted ticker of promises, and two rows of reviews scrolling in opposite directions
- Service illustrations drawn in SVG that loop: a spray bottle misting, a vacuum gliding over dust, a mop swinging over a bucket, a steaming mug on a desk
- Room tabs with a sliding pill, a wipe between photos and checkmarks that draw themselves
- A wavy line between the three steps that draws with the scroll position
- Counters that count up when they come into view
- On the quote page, prices roll into place digit by digit, the team grows and shrinks, and the booking confirmation draws a tick with a burst of sparks

Everything respects the visitor's reduced motion setting: animations jump to their end state and nothing loops.

## Design

Clean and cheerful: soap blue and sponge yellow on a cool white, with dark cobalt text and soft, rounded shapes.

| Token | Value |
| --- | --- |
| bg | `#F4F7FC` |
| surface | `#E3EAF8` |
| fg | `#16205B` |
| muted | `#4A5480` |
| border | `#CBD5EE` |
| accent | `#2F4BFF` |
| on accent | `#FFFFFF` |
| sponge | `#FFD54A` |
| bubble | `#BFE8FF` |
| error | `#B42318` |

Headings use Bricolage Grotesque, body text uses Figtree. Both are self-hosted from `app/fonts` through `next/font/local`.

## Stack

- Next.js 16 (App Router), React 19
- TypeScript in strict mode
- Tailwind CSS 4
- zod for form validation
- Vitest and Testing Library
- Lighthouse CI

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run check` | Type check, lint and tests |
| `npm run lighthouse` | Builds the site, runs Lighthouse five times on mobile and fails if the median score in any category drops below 95 or the median LCP goes above 2.5 s |

## Pricing

The quote logic lives in `lib/quote.ts` and is covered by `tests/quote.test.ts`. Work is estimated in cleaner-hours from the property type, rooms and bathrooms, multiplied for a deep or move clean, plus extras. It is billed at $42 an hour with a $95 minimum, minus 10, 15 or 20 percent for monthly, fortnightly or weekly cleans. Jobs over four hours get a second cleaner and over eight a third.

## Contact form

Enquiries go to a Telegram chat. Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Without them the form runs in demo mode and tells the visitor that nothing was sent.

## Deploying

Import the repository in Vercel and add the two Telegram variables if the form should deliver leads. If the domain changes, update `url` in `content/site.ts` and `tests/metadata.test.ts`.

## Credits

Fonts are licensed under the SIL Open Font License; the license texts are in `app/fonts`. Photos are hotlinked from Unsplash and credited in the site footer.

## License

Code: MIT
