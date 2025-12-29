import { Outfit, DM_Sans } from "next/font/google";

export const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontMono = DM_Sans({
  subsets: ["latin"],
  variable: "--font-mono",
});
