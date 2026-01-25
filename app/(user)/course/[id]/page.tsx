import type { Metadata } from "next";

import Link from "next/link";
import { Button } from "@heroui/button";
import { BookAIcon } from "lucide-react";

import {
  categorySeoMap,
  courseIntroductionByCategory,
} from "../../../../components/user/sections/SeoDescription";
import CourseCard from "../../courses/_components/CourseList";
import CourseDetailJoinCard from "../_components/CourseDetailJoinCard";

import {
  getCourseDetail,
  getRelatedCourses,
} from "@/services/user/courses/course.service";
import { Course } from "@/types/user/course/course.type";
import { ArrowIcon, LogoIcon } from "@/components/icons";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params; // ✅ phải await
  const course = await getCourseDetail(id);

  if (!course) {
    return {
      title: "Khóa học không tồn tại",
      description: "Khóa học bạn đang tìm kiếm không tồn tại.",
    };
  }

  const categoryCode = course.danhMucKhoaHoc.maDanhMucKhoahoc;
  const categoryDescription = categorySeoMap[categoryCode] || course.moTa;

  return {
    title: `${course.tenKhoaHoc} | ${course.danhMucKhoaHoc.tenDanhMucKhoaHoc}`,
    description: categoryDescription,
    openGraph: {
      title: `${course.tenKhoaHoc} | ${course.danhMucKhoaHoc.tenDanhMucKhoaHoc}`,
      description: categoryDescription,
      images: [course.hinhAnh],
    },
  };
}

const CourseDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const course = await getCourseDetail(id);

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-600">
            The course you are looking for does not exist or has been deleted.
          </p>
        </div>
      </main>
    );
  }

  const relatedCourses = await getRelatedCourses(
    course.danhMucKhoaHoc.maDanhMucKhoahoc,
  );

  const filteredCourses = relatedCourses
    .filter((item: Course) => item.maKhoaHoc !== course.maKhoaHoc)
    .slice(0, 8);

  const categoryDescription =
    categorySeoMap[course.danhMucKhoaHoc.maDanhMucKhoahoc] || course.moTa;

  const intro =
    courseIntroductionByCategory[course.danhMucKhoaHoc.maDanhMucKhoahoc] ||
    course.moTa;

  return (
    <>
      <div className="min-h-screen dark:bg-gray-900">
        <section className="bg-gradient-to-r from-green-200 to-blue-500 rounded-br-3xl rounded-tl-3xl">
          <div className="max-w-6xl mx-auto px-6 py-16 text-black">
            <p className="text-sm uppercase opacity-80">
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 flex items-center gap-2">
              <LogoIcon />
              {course.tenKhoaHoc}
            </h1>
            <p className="mt-4 max-w-2xl text-lg opacity-90 flex items-center gap-2">
              <BookAIcon />
              {categoryDescription}
            </p>
            <p className="mt-4 max-w-2xl text-lg opacity-90">{course.moTa}</p>
            <div className="mt-6 flex gap-6 text-sm">
              <span>{course.luotXem} views</span>
              <span>{course.soLuongHocVien} students</span>
            </div>
          </div>
        </section>

        <CourseDetailJoinCard course={course} intro={intro} />
      </div>

      {filteredCourses.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-6">Related courses</h2>
          <CourseCard courses={filteredCourses} />
          <div className="flex justify-center items-center mt-8">
            <Link href="/courses">
              <Button>
                See more <ArrowIcon />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseDetailPage;
