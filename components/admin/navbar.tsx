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

  console.log("activeItem", activeItem);
  // pageTitle: tiêu đề sẽ hiển thị trên Navbar
  // Nếu tìm được item đang active → lấy title của nó
  // Nếu KHÔNG tìm được (activeItem = undefined) → dùng "Admin page" làm mặc định
  const pageTitle = activeItem?.title ?? "Admin page";

  return (
    <HeroUINavbar className="bg-[#F9F9F9]" maxWidth="full" position="sticky">
      {/* ===== Desktop ===== */}
      <NavbarContent justify="start">
        <div className="mx-auto w-full max-w-7xl flex items-center gap-6 px-6">
          {/* Logo */}
          <NavbarBrand className="gap-3 max-w-fit">
            <NextLink className="flex items-center gap-2" href="/admin">
              <Image alt="logo" height={80} src="/logo.png" width={80} />
            </NextLink>
          </NavbarBrand>

          {/* Title */}
          <h1 className="text-4xl font-semibold pl-[133px]">{pageTitle}</h1>
        </div>

        {/* <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-2" href="/admin">
            <Image src="/logo.png" alt="logo" width={80} height={80} />
          </NextLink>
        </NavbarBrand>

        <div className="flex items-center h-16 px-4">
          <h1 className="text-4xl font-semibold">{pageTitle}</h1>
        </div> */}
      </NavbarContent>

      {/* Search */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Hiển thị trên mobile => Nut menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* Search ở giữa */}
        <NavbarItem className="flex-1 px-3">
          <div className="mx-auto max-w-[280px]">{searchInput}</div>
        </NavbarItem>

        {/* Cụm bên phải: ThemeSwitch + chỗ cho toggle */}
        <NavbarItem className="flex items-center gap-2">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>

      {/* MOBILE MENU – BẮT BUỘC */}
      {/* NavbarMenu hoạt động cùng với NavbarMenuToggle cho UI Mobile */}
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
