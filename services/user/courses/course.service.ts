import {
  Course,
  CoursePaginationResponse,
} from "@/types/user/course/course.type";

const BACKEND_URL = process.env.NEXT_BACKEND_URL;
const TOKEN_CYBERSOFT = process.env.NEXT_TOKEN_CYBERSOFT;

export async function getCoursesPagination(
  page: number
): Promise<CoursePaginationResponse> {
  const res = await fetch(
    `${BACKEND_URL}QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=10&MaNhom=GP01`,
    {
      headers: { TokenCybersoft: TOKEN_CYBERSOFT! },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Fetch courses failed");
  return res.json();
}

export async function getAllCourses(): Promise<Course[]> {
  const res = await fetch(
    `${BACKEND_URL}QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`,
    {
      headers: { TokenCybersoft: TOKEN_CYBERSOFT! },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Fetch courses failed");
  return res.json();
}
