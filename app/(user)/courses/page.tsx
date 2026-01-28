import { getCoursesPagination } from "@/services/user/courses/course.service";
import CourseCard from "../component/CourseCard";
import Pagination from "./component/Pagination";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function CoursePage({ searchParams }: Props) {
  const params = await searchParams; // ✅ BẮT BUỘC await
  const page = Number(params.page) || 1;

  const result = await getCoursesPagination(page);

  return (
    <>
      <div className="">
        <CourseCard courses={result.items} />
        <Pagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
        />
      </div>
    </>
  );
}
