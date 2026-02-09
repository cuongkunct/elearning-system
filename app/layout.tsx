import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata } from "next";
import { cookies } from "next/headers";

import { Providers } from "./providers";
import { AuthHydrator } from "./(user)/auth/login/_components/AuthHydrator";

import { fontSans } from "@/config/fonts";
import GoToTop from "@/components/user/layout/GoToTop";

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
    url: "https://elearning-system-seven.vercel.app",
    siteName: "E-Learning Platform",
    title: "E-Learning Platform | Learn Anytime, Anywhere",
    description:
      "Join thousands of learners and upgrade your skills with high-quality online courses.",
    images: [
      {
        url: "https://elearning-system-seven.vercel.app/logo.png",
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
    images: ["https://elearning-system-seven.vercel.app/logo.png"],
  },

  alternates: {
    canonical: "https://elearning-system-seven.vercel.app/courses",
  },

  category: "education",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get("sessionToken")?.value;
  const role = cookieStore.get("userRole")?.value;

  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AuthHydrator cookieSession={cookieSession} role={role}>
            {children}
            <GoToTop />
          </AuthHydrator>
        </Providers>
      </body>
    </html>
  );
}
