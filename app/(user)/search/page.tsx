import CourseListPagination from "../courses/_components/CourseListPagination";

import CourseCard from "../courses/_components/CourseList";

import { getCoursesPagination } from "@/services/user/courses/course.service";

export default async function Search(props: any) {
  const { key, page, sort } = await props.searchParams;
  const courses = await getCoursesPagination(page || 1, key);

  if (sort === "viewed") {
    courses.items.sort((a, b) => b.luotXem - a.luotXem);
  } else if (sort === "joined") {
    courses.items.sort((a, b) => b.soLuongHocVien - a.soLuongHocVien);
  }

  return (
    <div>
      <div className="">
        <p className="text-2xl font-semibold flex items-center justify-start mr-4">
          Search Results
        </p>
      </div>
      <p className="text-lg font-medium mb-4">
        {courses?.items?.length} search results for &quot;{key}&quot;
      </p>
      <CourseCard courses={courses.items} />
      <div className="flex justify-center items-center py-8">
        <CourseListPagination
          currentPage={courses.currentPage}
          totalPages={courses.totalPages}
        />
      </div>
    </div>
  );
}
