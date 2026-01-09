import CourseListPagination from "../courses/component/CourseListPagination";
import { getCoursesPagination } from "@/services/user/courses/course.service";
import CourseCard from "../component/CourseCard";

export default async function Search(props: any) {
  const {key,page} = await props.searchParams;
  const courses = await getCoursesPagination(page || 1, key);
  return (
    <div>
      <CourseCard courses={courses.items} />
      <div className="flex justify-center items-center py-8">
         <CourseListPagination items={courses.items} currentPage={courses.currentPage} totalPages={courses.totalPages}/>
      </div>
     
    </div>
  );
}
