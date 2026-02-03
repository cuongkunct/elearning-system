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
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { LogoIcon, SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/user/site";
import { RootState } from "@/store";
import { getListCategory } from "@/services/user/category/category.service";
import { Category } from "@/types/user/category/category.type";
import { useDispatch } from "react-redux";
import { setLoginData } from "@/store/user/auth/auth.slice";
export const Navbar = () => {
  const rout = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");
  const userSession = useSelector((state: RootState) => state.auth.userData);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getListCategory();

        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      dispatch(setLoginData(null));
    }
  };

  const categoriesMemo = useMemo(() => {
    return categories.map((cat) => (
      <li key={cat.maDanhMuc}>
        <NextLink
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
          href={`/courses/?id=${cat.maDanhMuc}`}
        >
          {cat.tenDanhMuc}
        </NextLink>
      </li>
    ));
  }, [categories]);

  useEffect(() => {
    if (pathname !== "/search") {
      setSearchKey("");
    }
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchKey.trim()) return;
    rout.push(`/search?key=${searchKey}`);
    setMenuOpen(false);
  };

  const searchInput = (
    <form
      className="flex items-center justify-center gap-2 px-2"
      onSubmit={handleSubmit}
    >
      <Input
        aria-label="Search"
        className="w-[400px]"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search 200 + courses..."
        type="search"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />

      <Button
        isIconOnly
        aria-label="Take a photo"
        color="primary"
        type="submit"
        variant="faded"
      >
        <SearchIcon />
      </Button>
    </form>
  );

  return (
    <HeroUINavbar
      isMenuOpen={menuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-1" href="/">
            <LogoIcon />
            <p className="font-bold text-inherit">TOT</p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-4 ml-2 items-center">
          {siteConfig.navItems.map((item) => {
            if (item.label === "Courses") {
              return (
                <li key={item.label} className="relative group">
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "px-2 py-1 flex items-center gap-1",
                      pathname.startsWith("/courses")
                        ? "text-primary border-b border-primary font-medium"
                        : "",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>

                  <div className="absolute left-0 top-full pt-2 w-max min-w-[320px] invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                    <div className="rounded-md border shadow-lg bg-white border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                      <ul className="grid grid-cols-2 gap-1 p-2">
                        {categoriesMemo}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }

            if (item.children) {
              return (
                <li key={item.label} className="relative group">
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "px-2 py-1 flex items-center gap-1",
                      pathname === item.href
                        ? "text-primary border-b border-primary font-medium"
                        : "",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                  <div className="absolute left-0 top-full pt-2 w-max min-w-[320px] invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                    <div className="rounded-md border shadow-lg bg-white border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                      <ul className="grid grid-cols-2 gap-1 p-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NextLink
                              className="block rounded px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                              href={child.href}
                            >
                              {child.label}
                            </NextLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "p-2",
                    pathname === item.href
                      ? "text-primary border-b border-primary font-medium"
                      : "",
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className={userSession ? "hidden" : ""}>
          <Button as={Link} color="primary" href="/auth/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className={userSession ? "hidden" : ""}>
          <Button as={Link} color="default" href="/auth/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem className={userSession ? "" : "hidden"}>
          <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  onClick={() => rout.push("/profile")}
                >
                  <p className="font-semibold">My Profile</p>
                </DropdownItem>

                <DropdownItem key="admin" onClick={() => rout.push("/admin")}>
                  Admin
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarMenuItem key={item.label}>
              <button
                className={`w-full text-left px-4 py-2 rounded`}
                onClick={() => {
                  rout.push(item.href);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button
              as={Link}
              color="primary"
              variant="flat"
              onPress={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
