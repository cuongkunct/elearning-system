import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "../providers";

import { siteConfig } from "@/config/admin/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/admin/navbar";
import Footer from "../../components/user/layout/Footer";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
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
          "min-h-screen text-foreground bg-[#F9F9F9] font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen pb-12 px-4 py-6">
            <Navbar />
            <div className="flex flex-1 pt-6">
              <AdminSidebar />
              <main className="flex-1 px-6">
                <div className="mx-auto w-full max-w-7xl">{children}</div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
