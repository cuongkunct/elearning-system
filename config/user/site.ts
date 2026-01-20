export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { label: "Home", href: "/" },

    {
      label: "Courses",
      href: "/courses",
      children: [
        { label: "Frontend", href: "/courses/frontend" },
        { label: "Backend", href: "/courses/backend" },
        { label: "Fullstack", href: "/courses/fullstack" },
      ],
    },

    { label: "About Us", href: "/about" },
  ],
  navMenuItems: [
    { label: "Home", href: "/" },
    {
      label: "Courses",
      href: "/courses",
      children: [
        { label: "Frontend", href: "/courses/frontend" },
        { label: "Backend", href: "/courses/backend" },
        { label: "Fullstack", href: "/courses/fullstack" },
      ],
    },

    { label: "About Us", href: "/about" },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
