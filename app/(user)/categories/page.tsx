import { getListCategory } from "@/services/user/category/category.service";
import CategoriesFilter from "./component/CategoriesFilter";
import {
  getRelatedCourses,
  getCoursesPagination,
} from "@/services/user/courses/course.service";
import CourseCard from "../component/CourseCard";
import CourseListPagination from "../courses/component/CourseListPagination";
import CategoriesIntro from "../component/CategoriesIntro";
import SortButtons from "./component/SortButtons";
import { Course } from "@/types/user/course/course.type";
import { Metadata } from "next";

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
  let showPagination = false;
  if (!id) {
    const res = await getCoursesPagination(currentPage);
    courseList = {
      items: res.items,
      currentPage: res.currentPage,
      totalPages: res.totalPages,
    };
    showPagination = true;
  } else {
    const res = await getRelatedCourses(id);
    courseList = {
      items: res,
    };
  }

  // sort
  if (sort === "viewed") {
    courseList.items.sort((a, b) => b.luotXem - a.luotXem);
  } else if (sort === "joined") {
    courseList.items.sort((a, b) => b.soLuongHocVien - a.soLuongHocVien);
  }

  return (
    <div>
      <div className="lg:flex w-full gap-4">
        {/* CATEGORY FILTER */}
        <aside className="">
          {categories?.length > 0 && (
            <CategoriesFilter categories={categories} />
          )}
        </aside>
        <main className="flex-[7]">
          <SortButtons />
          <div className="flex justify-end mb-2">
            <p className="text-gray-700 text-sm font-semibold mb-2 mr-0">
              {courseList?.items?.length
                ? `${courseList.items.length} course${courseList.items.length > 1 ? "s" : ""} found`
                : "No courses found"}
            </p>
          </div>
          {showPagination ? (
            <>
              <CourseCard courses={courseList.items} />
              <div className="flex items-center justify-center p-4">
                <CourseListPagination
                  items={courseList.items}
                  currentPage={courseList.currentPage}
                  totalPages={courseList.totalPages}
                />
              </div>
            </>
          ) : (
            <>
              <CourseCard courses={courseList?.items} />
            </>
          )}
        </main>
      </div>
      {showPagination ? (
        <div>
          <CategoriesIntro />
        </div>
      ) : null}
    </div>
  );
}
