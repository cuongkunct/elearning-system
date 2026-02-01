// "use client";

// import {
//   Navbar as HeroUINavbar,
//   NavbarContent,
//   NavbarBrand,
// } from "@heroui/navbar";

// import { Input } from "@heroui/input";
// import NextLink from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// import { siteConfig } from "@/config/admin/site";
// import { SearchIcon } from "@/components/icons";
// import type { NavbarProps, AdminAction } from "./../../types/admin/navbar.type";

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import type { DispatchType } from "@/store";

// import {
//   searchAdminUsers,
//   setSearchKeyword,
//   clearSearch,
// } from "@/store/admin/user/adminUser.slice";

// export const Navbar = ({ onActionClick }: NavbarProps) => {
//   const pathname = usePathname();
//   const dispatch: DispatchType = useDispatch();

//   // ✅ ADDED: controlled keyword
//   const [keyword, setKeyword] = useState("");

//   // ✅ ADDED: debounce search
//   useEffect(() => {
//     const kw = keyword.trim();

//     // sync keyword to store
//     dispatch(setSearchKeyword(kw));

//     const t = setTimeout(() => {
//       if (!kw) {
//         dispatch(clearSearch());
//         return;
//       }

//       dispatch(searchAdminUsers({ maNhom: "GP01", tuKhoa: kw }));
//     }, 400);

//     return () => clearTimeout(t);
//   }, [keyword, dispatch]);

//   const searchInput = (
//     <Input
//       aria-label="Search"
//       classNames={{
//         inputWrapper: "bg-default-200",
//         input: "text-sm",
//       }}
//       labelPlacement="outside"
//       placeholder="Search..."
//       startContent={
//         <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
//       }
//       type="search"
//       value={keyword} // ✅ ADDED
//       onValueChange={setKeyword} // ✅ ADDED
//       isClearable // ✅ ADDED
//       onClear={() => setKeyword("")} // ✅ ADDED
//     />
//   );

//   const getActiveItem = () => {
//     const sortedItems = [...siteConfig.navItems].sort(
//       (a, b) => b.href.length - a.href.length,
//     );
//     return sortedItems.find((item) => pathname.startsWith(item.href));
//   };

//   const activeItem = getActiveItem();
//   const pageTitle = activeItem?.label ?? "Admin page";

//   const action = activeItem?.action as AdminAction | undefined;

//   const renderActionButton = () => {
//     if (!action) return null;

//     return (
//       <button
//         type="button"
//         className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
//         onClick={() => {
//           console.log("Navbar action:", action.key);
//           onActionClick?.(action.key);
//         }}
//       >
//         + {action.label}
//       </button>
//     );
//   };

//   const renderSearchButton = () => {
//     return <div className="w-full">{searchInput}</div>;
//   };

//   return (
//     <HeroUINavbar
//       maxWidth="full"
//       position="sticky"
//       className="bg-[#F9F9F9]"
//       classNames={{
//         wrapper: "px-0 max-w-none",
//       }}
//     >
//       <NavbarContent className="hidden sm:flex w-full p-0">
//         <div className="w-full grid grid-cols-[260px_1fr] h-[88px]">
//           <div className="flex items-center">
//             <NavbarBrand className="gap-3 max-w-fit">
//               <NextLink className="flex items-center gap-2" href="/admin">
//                 <Image src="/logo.png" alt="logo" width={80} height={80} />
//               </NextLink>
//             </NavbarBrand>
//           </div>

//           <div className="px-6 flex items-center justify-between">
//             <h1 className="text-4xl font-semibold">{pageTitle}</h1>

//             <div className="w-[600px] flex justify-center">
//               {renderSearchButton()}
//             </div>

//             <div className="w-[120px]">{renderActionButton()}</div>
//           </div>
//         </div>
//       </NavbarContent>
//     </HeroUINavbar>
//   );
// };

"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";

import { Input } from "@heroui/input";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/admin/site";
import { SearchIcon } from "@/components/icons";
import type { NavbarProps, AdminAction } from "./../../types/admin/navbar.type";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/store";

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
      onValueChange={setKeyword}
      isClearable
      onClear={() => setKeyword("")}
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
        type="button"
        className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
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
      maxWidth="full"
      position="sticky"
      className="bg-[#F9F9F9]"
      classNames={{
        wrapper: "px-0 max-w-none",
      }}
    >
      <NavbarContent className="hidden sm:flex w-full p-0">
        <div className="w-full grid grid-cols-[260px_1fr] h-[88px]">
          <div className="flex items-center">
            <NavbarBrand className="gap-3 max-w-fit">
              <NextLink className="flex items-center gap-2" href="/admin">
                <Image src="/logo.png" alt="logo" width={80} height={80} />
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
