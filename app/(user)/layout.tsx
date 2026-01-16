import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Providers } from "../providers";
import { siteConfig } from "@/config/user/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/user/navbar";
import Footer from "./component/Footer";

export const metadata: Metadata = {
  title: {
    default: "TOT - E-Learning Platform | Learn Anytime, Anywhere",
    template: "%s | E-Learning Platform",
  },
  icons: {
    icon: "/logo.png",
  },
  description:
    "TOT - E-Learning platform offering high-quality online courses in programming, design, business, and technology. Learn anytime, anywhere with expert instructors.",
  keywords: [
    "e-learning",
    "tot",
    "online courses",
    "programming courses",
    "learn online",
    "education platform",
    "web development",
    "frontend",
    "backend",
    "react",
    "nextjs",
  ],
  authors: [{ name: "TOT Team" }],
  creator: "TOT - E-Learning Platform",
  publisher: "TOT - E-Learning Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000/",
    siteName: "E-Learning Platform",
    title: "E-Learning Platform | Learn Anytime, Anywhere",
    description:
      "Join thousands of learners and upgrade your skills with high-quality online courses.",
    images: [
      {
        url: "http://localhost:3000/logo.png",
        width: 1200,
        height: 630,
        alt: "E-Learning Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "E-Learning Platform | Learn Anytime, Anywhere",
    description:
      "High-quality online courses in programming, design, and business.",
    images: ["http://localhost:3000/logo.png"],
  },

  alternates: {
    canonical: "https://your-elearning.com/elearning",
  },

  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen ">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
