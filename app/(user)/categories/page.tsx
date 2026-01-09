import { getListCategory } from "@/services/user/category/category.service";
import CategoriesFilter from "./component/CategoriesFilter";
import { getAllCourses } from "@/services/user/courses/course.service";
import { Course } from "@/types/user/course/course.type";
import CourseCard from "../component/CourseCard";

export default async function CategoriesPage(props: any) {
  const { categories_ids } = await props.searchParams;
  console.log(" categories_ids:", categories_ids);
  const categories = await getListCategory();
  const courseList = await getAllCourses();
  const selectedCategories = categories_ids ? categories_ids.split(",") : [];
  

const filteredCourses =
  selectedCategories.length === 0
    ? courseList
    : courseList.filter((item) =>
        selectedCategories.includes(
          item.danhMucKhoaHoc.maDanhMucKhoahoc
        )
      );

  return (
    <div className="flex w-full px-8 py-8 gap-4">
      {/* Categories (Client Component) */}
      <CategoriesFilter categories={categories} />

      {/* Content SEO */}
      <div className="flex-[7] border rounded-md p-4">
        <h1 className="text-xl font-semibold">Content</h1>
        <CourseCard courses={filteredCourses} />
      </div>
    </div>
  );
}
