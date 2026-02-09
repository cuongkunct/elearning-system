import { Metadata } from "next";

import CourseListPagination from "./_components/CourseListPagination";
import CategoriesIntro from "./_components/CategoriesIntro";


import { Course } from "@/types/user/course/course.type";
import {
  getRelatedCourses,
  getCoursesPagination,
} from "@/services/user/courses/course.service";
import { getListCategory } from "@/services/user/category/category.service";
import CourseListWithFilter from "./_components/CourseListWithFilter";

export const metadata: Metadata = {
  title: "Online Courses",
  description:
    "Browse our collection of online courses in programming, design, and technology.",
};
type CategoriesPageProps = {
  searchParams?: Promise<{
    id?: string;
    page?: string;
    sort?: string;
  }>;
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { id, page, sort } = (await searchParams) ?? {};
  const currentPage = Number(page) || 1;
  const categories = await getListCategory();
  let courseList: {
    items: Course[];
    currentPage?: number;
    totalPages?: number;
  };

  if (!id) {
    const res = await getCoursesPagination(currentPage);

    courseList = {
      items: res.items,
      currentPage: res.currentPage,
      totalPages: res.totalPages,
    };
  } else {
    const res = await getRelatedCourses(id);

    courseList = {
      items: res,
    };
  }
  if (sort === "viewed") {
    courseList.items.sort((a, b) => b.luotXem - a.luotXem);
  } else if (sort === "joined") {
    courseList.items.sort((a, b) => b.soLuongHocVien - a.soLuongHocVien);
  }

  return (
    <div>
      <div className="">
        <CourseListWithFilter
          categories={categories}
          courses={courseList.items}
        >
          {/* Showw pagination */}
          {!id && (
            <div className="flex justify-center p-4">
              <CourseListPagination
                currentPage={currentPage}
                totalPages={courseList.totalPages}
              />
            </div>
          )}
        </CourseListWithFilter>

        {!id && (
          <div className="py-18">
            <CategoriesIntro />
          </div>
        )}
      </div>
    </div>
  );
}
