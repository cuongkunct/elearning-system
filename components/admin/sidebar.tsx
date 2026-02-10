// "use client";

// import NextLink from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";

// import { siteConfig } from "@/config/admin/site";

// export function AdminSidebar() {
//   const pathname = usePathname();

//   const isActive = (href: string) => {
//     return pathname === href;
//   };

//   const getItemClassName = (active: boolean) => {
//     return clsx(
//       "w-full rounded-xl px-3 py-3 text-sm transition-colors",
//       "bg-[#F9F9F9] hover:bg-default-100",
//       active && "bg-default-200 font-medium",
//     );
//   };

//   const renderNavItem = (item: { href: string; label: string }) => {
//     const active = isActive(item.href);

//     return (
//       <NextLink
//         key={item.href}
//         href={item.href}
//         // className="w-full rounded-xl px-3 py-3 text-sm bg-[#F9F9F9] hover:bg-default-100"
//         className={getItemClassName(active)}
//       >
//         {item.label}
//       </NextLink>
//     );
//   };

//   return (
//     <aside className="hidden lg:flex w-[260px] shrink-0 flex-col p-4 bg-white rounded-[8] shadow-sm ">
//       <nav className="flex flex-col gap-4">
//         {siteConfig.navItems.map(renderNavItem)}
//       </nav>

//       <button
//         className="mt-auto w-full rounded-xl px-3 py-2 text-sm border border-default-200 text-danger-600 hover:bg-danger-50"
//         type="button"
//       >
//         Logout
//       </button>
//     </aside>
//   );
// }

"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import { siteConfig } from "@/config/admin/site";
import { clearAuthStorage } from "@/services/admin/utils/logout";

// (OPTIONAL) nếu bạn muốn clear search state để không còn data cũ khi logout/login lại
// import { useDispatch } from "react-redux";
// import type { DispatchType } from "@/store";
// import { clearSearch } from "@/store/admin/user/adminUser.slice";
// import { clearCourseSearch } from "@/store/admin/courses/courses.slice";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // const dispatch: DispatchType = useDispatch();

  const isActive = (href: string) => pathname === href;

  const getItemClassName = (active: boolean) =>
    clsx(
      "w-full rounded-xl px-3 py-3 text-sm transition-colors",
      "bg-[#F9F9F9] hover:bg-default-100",
      active && "bg-default-200 font-medium",
    );

  const renderNavItem = (item: { href: string; label: string }) => {
    const active = isActive(item.href);

    return (
      <NextLink
        key={item.href}
        href={item.href}
        className={getItemClassName(active)}
      >
        {item.label}
      </NextLink>
    );
  };

  const handleLogout = () => {
    // 1) clear token/user (localStorage + cookie)
    clearAuthStorage();

    // 2) (optional) reset redux state để không còn UI cũ
    // dispatch(clearSearch());
    // dispatch(clearCourseSearch());

    // 3) về trang chủ và không cho back lại admin
    router.replace("/");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col p-4 bg-white rounded-[8] shadow-sm ">
      <nav className="flex flex-col gap-4">
        {siteConfig.navItems.map(renderNavItem)}
      </nav>

      <button
        className="mt-auto w-full rounded-xl px-3 py-2 text-sm border border-default-200 text-danger-600 hover:bg-danger-50"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}
