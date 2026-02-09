"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { siteConfig } from "@/config/admin/site";

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  const getItemClassName = (active: boolean) => {
    return clsx(
      "w-full rounded-xl px-3 py-3 text-sm transition-colors",
      "bg-[#F9F9F9] hover:bg-default-100",
      active && "bg-default-200 font-medium",
    );
  };

  const renderNavItem = (item: { href: string; label: string }) => {
    const active = isActive(item.href);

    return (
      <NextLink
        key={item.href}
        href={item.href}
        // className="w-full rounded-xl px-3 py-3 text-sm bg-[#F9F9F9] hover:bg-default-100"
        className={getItemClassName(active)}
      >
        {item.label}
      </NextLink>
    );
  };

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col p-4 bg-white rounded-[8] shadow-sm ">
      <nav className="flex flex-col gap-4">
        {siteConfig.navItems.map(renderNavItem)}
      </nav>

      <button
        className="mt-auto w-full rounded-xl px-3 py-2 text-sm border border-default-200 text-danger-600 hover:bg-danger-50"
        type="button"
      >
        Logout
      </button>
    </aside>
  );
}
