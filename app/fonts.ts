import localFont from "next/font/local";

export const headingFont = localFont({
  src: "./fonts/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-heading",
  weight: "200 800",
  display: "swap",
});

export const bodyFont = localFont({
  src: "./fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "300 900",
  display: "swap",
  // The headline font is the one the first paint waits for; body text can swap in a moment later.
  preload: false,
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;
