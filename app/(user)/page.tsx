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
import Button from "../(user)/component/ui/Button";
import { ArrowIcon } from "@/components/icons";
export default async function Home() {
  const { courses, categories } = await getCourseAndCategory();
  const categoryWithCount = mergeCategoryWithCourseCount(courses, categories);
  const topLearnedCategories = courses
    .sort((a, b) => b.soLuongHocVien - a.soLuongHocVien)
    .slice(0, 12);

  const topViewedCategories = courses
    .sort((a, b) => b.luotXem - a.luotXem)
    .slice(0, 12);

  const renderCategory = () => {
    return categoryWithCount.map((category: CategoryWithCount) => (
      <Link href={`/courses?id=${category.maDanhMuc}`} key={category.maDanhMuc}>
        <div
          key={category.maDanhMuc}
          className="
                    w-full p-2 flex items-center cursor-pointer rounded-md border
                    border-gray-300
                    bg-white text-gray-800
                    hover:bg-gray-200 hover:border-gray-400 hover:shadow-sm
                    dark:bg-gray-800 dark:text-white dark:border-gray-600
                    dark:hover:bg-gray-700 dark:hover:border-gray-500
                    transition-all duration-200 ease-in-out
                    "
        >
          <div className="flex items-center gap-4 w-full">
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
      <section className="flex flex-col items-center justify-center md:block">
        <h1 className={`${title({ size: "sm" })}  pb-4`}>Specialized topics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
          {renderCategory()}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center md:block">
        <h1 className={`${title({ size: "sm" })} pt-12 pb-4`}>
          The most popular course
        </h1>
        <CourseCard courses={topLearnedCategories} />
        <div className="flex justify-center items-center mt-8">
          <Link href="/courses">
            <Button>
              See more <ArrowIcon />
            </Button>
          </Link>
        </div>
      </section>
      <section className="">
        <h1 className={`${title({ size: "sm" })} pt-12 pb-4`}>
          The most viewed course
        </h1>
        <CourseCard courses={topViewedCategories} />
        <div className="flex justify-center items-center mt-8">
          <Link href="/courses">
            <Button>
              See more <ArrowIcon />
            </Button>
          </Link>
        </div>
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
