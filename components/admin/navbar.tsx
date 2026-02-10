"use client";

import type { NavbarProps, AdminAction } from "./../../types/admin/navbar.type";
import type { DispatchType } from "@/store";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { siteConfig } from "@/config/admin/site";
import { SearchIcon } from "@/components/icons";

// User search (đã có)
import {
  searchAdminUsers,
  setSearchKeyword,
  clearSearch,
} from "@/store/admin/user/adminUser.slice";

// ✅ Course search (thêm)
import { searchCourseByMaKhoaHoc } from "@/store/admin/courses/course.thunk";
import {
  setCourseSearchKeyword,
  clearCourseSearch,
} from "@/store/admin/courses/courses.slice";

export const Navbar = ({ onActionClick }: NavbarProps) => {
  const pathname = usePathname();
  const dispatch: DispatchType = useDispatch();

  const [keyword, setKeyword] = useState("");

  // ✅ Xác định trang hiện tại để search đúng slice
  const isCoursePage = useMemo(
    () => pathname.startsWith("/admin/course"),
    [pathname],
  );
  const isUserPage = useMemo(
    () => pathname === "/admin" || pathname.startsWith("/admin/"),
    [pathname],
  );
  // (user page của bạn đang là /admin. Nếu bạn có nhiều route admin khác, vẫn ok.)

  // ✅ Khi đổi route: clear keyword + clear search state đúng nơi
  useEffect(() => {
    setKeyword("");
    dispatch(clearSearch());
    dispatch(clearCourseSearch());
  }, [pathname, dispatch]);

  // ✅ debounce search: route nào thì dispatch route đó
  useEffect(() => {
    const kw = keyword.trim();

    const t = setTimeout(() => {
      // clear khi rỗng
      if (!kw) {
        if (isCoursePage) {
          dispatch(setCourseSearchKeyword(""));
          dispatch(clearCourseSearch());
        } else {
          dispatch(setSearchKeyword(""));
          dispatch(clearSearch());
        }

        return;
      }

      // ---- COURSE SEARCH ----
      if (isCoursePage) {
        dispatch(setCourseSearchKeyword(kw));
        dispatch(searchCourseByMaKhoaHoc({ maKhoaHoc: kw }));

        return;
      }

      // ---- USER SEARCH (default) ----
      dispatch(setSearchKeyword(kw));
      dispatch(searchAdminUsers({ maNhom: "GP01", tuKhoa: kw }));
    }, 400);

    return () => clearTimeout(t);
  }, [keyword, isCoursePage, dispatch]);

  const searchPlaceholder = isCoursePage
    ? "Search course by maKhoaHoc..."
    : "Search user...";
  const searchInput = (
    <Input
      isClearable
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-200",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder={searchPlaceholder}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={keyword}
      onClear={() => setKeyword("")}
      onValueChange={setKeyword}
    />
  );

  const getActiveItem = () => {
    const sortedItems = [...siteConfig.navItems].sort(
      (a, b) => b.href.length - a.href.length,
    );

    return sortedItems.find((item) => pathname.startsWith(item.href));
  };

  const activeItem = getActiveItem();
  const pageTitle = activeItem?.label ?? "Admin page";
  const action = activeItem?.action as AdminAction | undefined;

  const renderActionButton = () => {
    if (!action) return null;

    return (
      <button
        className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
        type="button"
        onClick={() => {
          console.log("Navbar action:", action.key);
          onActionClick?.(action.key);
        }}
      >
        + {action.label}
      </button>
    );
  };

  return (
    <HeroUINavbar
      className="bg-[#F9F9F9]"
      classNames={{
        wrapper: "px-0 max-w-none",
      }}
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="hidden sm:flex w-full p-0">
        <div className="w-full grid grid-cols-[260px_1fr] h-[88px]">
          <div className="flex items-center">
            <NavbarBrand className="gap-3 max-w-fit">
              <NextLink className="flex items-center gap-2" href="/admin">
                <Image alt="logo" height={80} src="/logo.png" width={80} />
              </NextLink>
            </NavbarBrand>
          </div>

          <div className="px-6 flex items-center justify-between">
            <h1 className="text-4xl font-semibold">{pageTitle}</h1>

            <div className="w-[600px] flex justify-center">{searchInput}</div>

            <div className="w-[120px]">{renderActionButton()}</div>
          </div>
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};
