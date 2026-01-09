import {
  Course,
  CoursePaginationResponse,
} from "@/types/user/course/course.type";
const BACKEND_URL = process.env.NEXT_BACKEND_URL;
const TOKEN_CYBERSOFT = process.env.NEXT_TOKEN_CYBERSOFT;

/* service to get courses with pagination */
export async function getCoursesPagination(
  page: number,
  searchKey?: string
): Promise<CoursePaginationResponse> {
  const url = new URL(
    `${BACKEND_URL}QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang`
  );
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("MaNhom", "GP01");
  if (searchKey) {
    url.searchParams.set("tenKhoaHoc", searchKey);
  }
  console.log(" url:", url);
  const res = await fetch(url,
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
