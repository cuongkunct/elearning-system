"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/admin/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";

export const Navbar = () => {
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const getActiveItem = () => {
    return siteConfig.navItems.find((item) => {
      return pathname === item.href;
    });
  };

  const activeItem = getActiveItem();
  const pageTitle = activeItem?.title ?? "Admin page";

  return (
    <HeroUINavbar className="bg-[#F9F9F9]" maxWidth="full" position="sticky">
      <NavbarContent justify="start">
        <div className="mx-auto w-full max-w-7xl flex items-center gap-6 px-6">
          <NavbarBrand className="gap-3 max-w-fit">
            <NextLink className="flex items-center gap-2" href="/admin">
              <Image alt="logo" height={80} src="/logo.png" width={80} />
            </NextLink>
          </NavbarBrand>

          <h1 className="text-4xl font-semibold pl-[133px]">{pageTitle}</h1>
        </div>
      </NavbarContent>

      {/* Search */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="flex-1 px-3">
          <div className="mx-auto max-w-[280px]">{searchInput}</div>
        </NavbarItem>

        <NavbarItem className="flex items-center gap-2">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="sm:hidden">
        <div className="px-4 py-3">
          {siteConfig.navMenuItems.map((item) => (
            // Đây là item chuẩn cho menu mobile
            <NavbarMenuItem key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
