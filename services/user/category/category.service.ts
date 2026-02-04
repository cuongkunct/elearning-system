import { getAllCourses } from "../courses/course.service";

import {
  Category,
  CategoryWithCount,
} from "@/types/user/category/category.type";
import { Course } from "@/types/user/course/course.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT;

export async function getListCategory(): Promise<Category[]> {
  try {
    const res = await fetch(`${BACKEND_URL}QuanLyKhoaHoc/LayDanhMucKhoaHoc`, {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT!,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Fetch categories failed: ${res.statusText}`);

    const data: Category[] = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCourseAndCategory() {
  try {
    const [courses, categories] = await Promise.all([
      getAllCourses(),
      getListCategory(),
    ]);

    if (!Array.isArray(courses)) throw new Error("Courses is not an array");
    if (!Array.isArray(categories))
      throw new Error("Categories is not an array");

    return { courses, categories };
  } catch (error) {
    return { courses: [], categories: [] };
  }
}

export function mergeCategoryWithCourseCount(
  courses: Course[],
  categories: Category[],
): CategoryWithCount[] {
  return categories.map((category) => {
    const soLuong = courses.filter(
      (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === category.maDanhMuc,
    ).length;

    return {
      ...category,
      soLuong,
    };
  });
}
