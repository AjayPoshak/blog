import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

// Body & UI — humanist, quietly technical
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Display / headings — elegant editorial serif
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-display",
});

// Applied to <html> so globals.scss can read var(--font-body) / var(--font-display)
export const fontClassName = `${plexSans.variable} ${sourceSerif.variable}`;
