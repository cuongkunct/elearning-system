module.exports = [
"[project]/config/admin/site.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "siteConfig",
    ()=>siteConfig
]);
const siteConfig = {
    name: "Next.js + HeroUI",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "User",
            title: "User management",
            href: "/admin",
            action: {
                key: "add_user",
                label: "Add user"
            }
        },
        {
            label: "Course",
            title: "Course management",
            href: "/admin/course",
            action: {
                key: "add_course",
                label: "Add course"
            }
        },
        {
            label: "Blog",
            title: "Blog Admin",
            href: "/admin/blog"
        },
        {
            label: "About",
            title: "About Admin",
            href: "/admin/about"
        }
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile"
        },
        {
            label: "Dashboard",
            href: "/dashboard"
        },
        {
            label: "Projects",
            href: "/projects"
        },
        {
            label: "Team",
            href: "/team"
        },
        {
            label: "Calendar",
            href: "/calendar"
        },
        {
            label: "Settings",
            href: "/settings"
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback"
        },
        {
            label: "Logout",
            href: "/logout"
        }
    ],
    links: {
        github: "https://github.com/heroui-inc/heroui",
        twitter: "https://twitter.com/hero_ui",
        docs: "https://heroui.com",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev"
    }
};
}),
"[project]/app/admin/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$admin$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/admin/site.ts [app-rsc] (ecmascript)");
;
;
const metadata = {
    title: {
        default: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$admin$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].name,
        template: `%s - ${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$admin$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].name}`
    },
    description: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$admin$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].description,
    icons: {
        icon: "/favicon.ico"
    }
};
const viewport = {
    themeColor: [
        {
            media: "(prefers-color-scheme: light)",
            color: "white"
        },
        {
            media: "(prefers-color-scheme: dark)",
            color: "black"
        }
    ]
};
function RootLayout({ children }) {} // return (
 //   <html suppressHydrationWarning lang="en">
 //     <head />
 //     <body
 //       className={clsx(
 //         "min-h-screen text-foreground bg-[#F9F9F9] font-sans antialiased",
 //         fontSans.variable,
 //       )}
 //     >
 //       <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
 //         <div className="relative flex flex-col h-screen pb-12 px-4 py-6">
 //           <Navbar />
 //           <div className="flex flex-1 pt-6 min-h-0">
 //             <AdminSidebar />
 //             <main className="flex-1 px-6 min-h-0">
 //               <div className="mx-auto w-full max-w-8xl h-full min-h-0">
 //                 {children}
 //               </div>
 //             </main>
 //           </div>
 //         </div>
 //       </Providers>
 //     </body>
 //   </html>
 // );
}),
];

//# sourceMappingURL=_619beb78._.js.map