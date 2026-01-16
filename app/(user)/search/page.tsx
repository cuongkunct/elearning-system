import CourseListPagination from "../categories/component/CourseListPagination";
import { getCoursesPagination } from "@/services/user/courses/course.service";
import CourseCard from "../component/CourseCard";
import SortButtons from "../categories/component/SortButtons";

export default async function Search(props: any) {
  const { key, page, sort } = await props.searchParams;
  const courses = await getCoursesPagination(page || 1, key);

  // sort
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
        {/* <SearchInput /> */}
        <div className="flex justify-end">
          <SortButtons />
        </div>
      </div>
      <p className="text-lg font-medium mb-4">
        {courses?.items?.length} search results for "{key}"
      </p>
      <CourseCard courses={courses.items} />
      <div className="flex justify-center items-center py-8">
        <CourseListPagination
          items={courses.items}
          currentPage={courses.currentPage}
          totalPages={courses.totalPages}
        />
      </div>
    </div>
  );
}
