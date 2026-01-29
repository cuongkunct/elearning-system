import type { AdminNavItem } from "./../../types/admin/navbar.type";

export const navItems: AdminNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "User management",
    href: "/docs",
    action: { key: "add_user", label: "Add user" },
  },
  {
    label: "Course management",
    href: "/pricing",
    action: { key: "add_course", label: "Add course" },
  },
  { label: "Blog Admin", href: "/blog" },
  { label: "About Admin", href: "/about" },
];

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems, // ✅ dùng navItems đã typed
  navMenuItems: [
    { label: "Profile", href: "/profile" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Calendar", href: "/calendar" },
    { label: "Settings", href: "/settings" },
    { label: "Help & Feedback", href: "/help-feedback" },
    { label: "Logout", href: "/logout" },
  ],
};

export type SiteConfig = typeof siteConfig;
