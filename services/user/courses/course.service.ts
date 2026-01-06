import {
  Course,
  CoursePaginationResponse,
} from "@/types/user/course/course.type";

const BACKEND_URL = process.env.NEXT_BACKEND_URL;
const TOKEN_CYBERSOFT = process.env.NEXT_TOKEN_CYBERSOFT;
/* service to get courses with pagination */
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
/* service to get all courses */
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
/* service to get course detail by course maKhoaHoc */
export async function getCourseDetail(maKhoaHoc: string) {
  const res = await fetch(
    `${BACKEND_URL}QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
    {
      headers: { TokenCybersoft: TOKEN_CYBERSOFT! },
      next: {
        revalidate: 60, // ISR – 60s cập nhật
      },
    }
  );
  console.log(
    "Fetch URL:",
    `${BACKEND_URL}QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch course detail");
  }
  return res.json();
}

/* service to get related courses by maDanhMuc */
export async function getRelatedCourses(maDanhMuc: string) {
  const res = await fetch(
    `${BACKEND_URL}QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`,
    {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT || "",
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch related courses");
  }
  return res.json();
}
