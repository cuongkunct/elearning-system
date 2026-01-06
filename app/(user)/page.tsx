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
      <Link href={`/category/${category.maDanhMuc}`} key={category.maDanhMuc}>
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
      <section className="mt-6">
        <h1 className={title({ size: "sm" })}>Specialized topics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  items-center justify-between gap-2  p-8">
          {renderCategory()}
        </div>
      </section>
      <section className="py-8 ">
        <h1 className={title({ size: "sm" })}>The most popular course</h1>
        <CourseCard courses={topLearnedCategories} />
      </section>
      <section className="py-8">
        <h1 className={title({ size: "sm" })}>The most viewed course</h1>
        <CourseCard courses={topViewedCategories} />
      </section>

      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className={title({ size: "sm" })}>
              Gitiho For Leading Business – Nền tảng kiến tạo tổ chức học tập
              theo đuổi hiệu suất cao
            </p>

            <p className="mt-6  max-w-xl">
              Giúp cho tổ chức của bạn phát triển đột phá, chinh phục các mục
              tiêu khát khao qua con đường đào tạo và phát triển đội ngũ.
            </p>

            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 transition">
              Trở thành giảng viên
            </button>
          </div>
          <div className="relative flex justify-center">
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
              Gitiho For Leading Business – Nền tảng kiến tạo tổ chức học tập
              theo đuổi hiệu suất cao
            </p>

            <p className="mt-6  max-w-xl">
              Giúp cho tổ chức của bạn phát triển đột phá, chinh phục các mục
              tiêu khát khao qua con đường đào tạo và phát triển đội ngũ.
            </p>

            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 transition">
              Đăng ký cho doanh nghiệp
            </button>
          </div>
        </div>
      </section>

      <section className="py-4">
        <StudentReviewSlider />
      </section>
    </div>
  );
}
