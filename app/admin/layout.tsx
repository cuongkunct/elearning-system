import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import AdminShell from "../../components/admin/adminShell";

import { siteConfig } from "@/config/admin/site";
import { fontSans } from "@/config/fonts";

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
    <div
      className={clsx(
        "min-h-screen text-foreground bg-[#F9F9F9] font-sans antialiased",
        fontSans.variable,
      )}
    >
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
