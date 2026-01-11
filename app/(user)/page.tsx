import SlideShow from "@/components/user/SlideShow";
import { title } from "@/components/primitives";
import PartnerList from "./component/PartnerList";
import CourseCard from "../(user)/component/CourseCard";
import { CategoryWithCount } from "@/types/user/category/category.type";
import {
  getCourseAndCategory,
  mergeCategoryWithCourseCount,
} from "@/services/user/category/category.service";
import Link from "next/link";
import Image from "next/image";
import StudentReviewSlider from "./component/StudentReviewSlider";
import BusinessList from "./component/Business";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "TOT - E-Learning Platform | Learn Anytime, Anywhere",
    template: "%s | E-Learning Platform",
  },
  description:
    "TOT - E-Learning platform offering high-quality online courses in programming, design, business, and technology. Learn anytime, anywhere with expert instructors.",
  keywords: [
    "e-learning",
    "tot",
    "online courses",
    "programming courses",
    "learn online",
    "education platform",
    "web development",
    "frontend",
    "backend",
    "react",
    "nextjs",
  ],
  authors: [{ name: "TOT Team" }],
  creator: "TOT - E-Learning Platform",
  publisher: "TOT - E-Learning Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-elearning.com",
    siteName: "E-Learning Platform",
    title: "E-Learning Platform | Learn Anytime, Anywhere",
    description:
      "Join thousands of learners and upgrade your skills with high-quality online courses.",
    images: [
      {
        url: "https://your-elearning.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "E-Learning Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "E-Learning Platform | Learn Anytime, Anywhere",
    description:
      "High-quality online courses in programming, design, and business.",
    images: ["https://your-elearning.com/og-image.png"],
  },

  alternates: {
    canonical: "https://your-elearning.com/elearning",
  },

  category: "education",
};
export default async function Home() {
  const { courses, categories } = await getCourseAndCategory();
  const categoryWithCount = mergeCategoryWithCourseCount(courses, categories);
  const topLearnedCategories = courses
    .sort((a, b) => b.soLuongHocVien - a.soLuongHocVien)
    .slice(0, 10);

  const topViewedCategories = courses
    .sort((a, b) => b.luotXem - a.luotXem)
    .slice(0, 10);

  const renderCategory = () => {
    return categoryWithCount.map((category: CategoryWithCount) => (
      <Link
        href={`/categories?id=${category.maDanhMuc}`}
        key={category.maDanhMuc}
      >
        <div
          className="border border-gray-400 rounded-md w-60 h-10 p-2 flex items-center  cursor-pointer "
          key={category.maDanhMuc}
        >
          <div className="flex items-center gap-4">
            <p className="font-normal">{category.tenDanhMuc}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
              <p className="font-normal">{category.soLuong}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      <SlideShow />
      <section className="flex flex-col gap-2 items-center justify-center pt-4">
        <p className={title({ size: "sm" })}>
          <strong className="text-red-500">3.288 </strong>
          business & <strong className="text-red-500"> 664.443 </strong>
          learners have chosen
        </p>
        <p>
          To transform knowledge into personal strength, organizational
          performance, and national resilience.
        </p>
      </section>
      <PartnerList />
      <section className="">
        <h1 className={`${title({ size: "sm" })} pt-12 pb-4`}>
          Specialized topics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  items-center justify-between gap-2">
          {renderCategory()}
        </div>
      </section>
      <section className="">
        <h1 className={`${title({ size: "sm" })} pt-12 pb-4`}>
          The most popular course
        </h1>
        <CourseCard courses={topLearnedCategories} />
      </section>
      <section className="">
        <h1 className={`${title({ size: "sm" })} pt-12 pb-4`}>
          The most viewed course
        </h1>
        <CourseCard courses={topViewedCategories} />
      </section>

      <section className="">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="pt-12 pb-4">
            <p className={`${title({ size: "sm" })}`}>
              TOT Teacher - Where experts become inspirational figures.
            </p>

            <p className="mt-6  max-w-xl">
              Become a TOT instructor – where you can spread knowledge, share
              valuable skills and experiences with learners. Transform your own
              value into inspiration and expand your influence within the
              professional community.
            </p>

            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 transition">
              Become a teacher
            </button>
            <p className="mt-6  max-w-xl text-primary font-semibold">
              Teaching 664,967 students with TOT
            </p>
          </div>
          <div className="relative flex justify-center pt-12 pb-4">
            <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden">
              <Image
                src="/thumb_gv.png"
                alt="Học online"
                width={420}
                height={280}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            {/* Image 1 */}
            <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden">
              <Image
                src="/thumb_biz.png"
                alt="Học online"
                width={420}
                height={280}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className={title({ size: "sm" })}>
              TOT For Leading Business – A platform for creating high-performing
              learning organizations pursuing high performance
            </p>

            <p className="mt-6  max-w-xl">
              Help your organization achieve breakthrough growth and conquer
              your ambitious goals through team training and development.
            </p>

            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 transition">
              Explore TOT for Business
            </button>
            <p className="mt-6  max-w-xl text-primary font-semibold">
              3,288 businesses have registered their personnel.
            </p>
            <BusinessList />
          </div>
        </div>
      </section>

      <section className="py-4">
        <StudentReviewSlider />
      </section>
    </div>
  );
}
