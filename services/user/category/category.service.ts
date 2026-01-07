import {
  Category,
  CategoryWithCount,
} from "@/types/user/category/category.type";
import { getAllCourses } from "../courses/course.service";
import { Course } from "@/types/user/course/course.type";

// 2 - Lấy danh mục khóa học
const BACKEND_URL = process.env.NEXT_BACKEND_URL;
const TOKEN_CYBERSOFT = process.env.NEXT_TOKEN_CYBERSOFT;
console.log("BACKEND_URL:", BACKEND_URL);
export async function getListCategory(): Promise<Category[]> {
  const res = await fetch(`${BACKEND_URL}QuanLyKhoaHoc/LayDanhMucKhoaHoc`, {
    headers: {
      TokenCybersoft: TOKEN_CYBERSOFT!,
    },
  });
  if (!res.ok) throw new Error("Fetch courses failed");
  return res.json();
}

export async function getCourseAndCategory() {
  const [courses, categories] = await Promise.all([
    getAllCourses(),
    getListCategory(),
  ]);

  return {
    courses,
    categories,
  };
}

export function mergeCategoryWithCourseCount(
  courses: Course[],
  categories: Category[]
): CategoryWithCount[] {
  return categories.map((category) => {
    const soLuong = courses.filter(
      (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === category.maDanhMuc
    ).length;

    return {
      ...category,
      soLuong,
    };
  });
}
