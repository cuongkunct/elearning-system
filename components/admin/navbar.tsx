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
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/admin/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { NavbarProps } from "@/types/admin/navbar.type";
import type { AdminAction } from "@/types/admin/navbar.type";



export const Navbar = ({ onActionClick }: NavbarProps) => {
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-200",
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
    const sortedItems = [...siteConfig.navItems].sort(
      (a, b) => b.href.length - a.href.length
    );

    return sortedItems.find((item) => pathname.startsWith(item.href));
  };

  const activeItem = getActiveItem();

  // pageTitle: tiêu đề sẽ hiển thị trên Navbar
  // Nếu tìm được item đang active → lấy title của nó
  // Nếu KHÔNG tìm được (activeItem = undefined) → dùng "Admin page" làm mặc định
  const pageTitle = activeItem?.label ?? "Admin page";

  // ACTION
  // action: { key, label } | undefined
  const action = activeItem?.action as AdminAction | undefined;

  const renderActionButton = () => {
    if (!action) return null;

    return (
      <button
        type="button"
        className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
        onClick={() => {
          console.log("Navbar action:", action.key);
          onActionClick?.(action.key)}}
      >
        + {action.label}
      </button>
    );
  };

  const renderSearchButton = () => {
    return <div className="w-full">{searchInput}</div>;
  };

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="bg-[#F9F9F9]"
      classNames={{
        wrapper: "px-0 max-w-none", // QUAN TRỌNG: bỏ px-6 mặc định
      }}
    >
      <NavbarContent className="hidden sm:flex w-full p-0">
        <div className="w-full grid grid-cols-[260px_1fr] h-[88px]">
          <div className=" flex items-center">
            <NavbarBrand className="gap-3 max-w-fit">
              <NextLink className="flex items-center gap-2" href="/admin">
                <Image src="/logo.png" alt="logo" width={80} height={80} />
              </NextLink>
            </NavbarBrand>
          </div>

          <div className=" px-6 flex items-center justify-between">
            <h1 className="text-4xl font-semibold">{pageTitle}</h1>
            <div className="w-[600px] flex justify-center">
              {renderSearchButton()}
            </div>
            <div className="w-[120]">{renderActionButton()}</div>
          </div>
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};

