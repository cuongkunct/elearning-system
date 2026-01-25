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
        { label: "Frontend", href: "/courses/?id=FrontEnd" },
        { label: "Backend", href: "/courses/?id=BackEnd" },
        { label: "Fullstack", href: "/courses/?id=FullStack" },
        { label: "Design", href: "/courses/?id=Design" },
        { label: "Mobile", href: "/courses/?id=Mobile" },
        { label: "Thinking", href: "/courses/?id=TuDuy" },
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
    { label: "Profile", href: "/profile" },
  ],
};
