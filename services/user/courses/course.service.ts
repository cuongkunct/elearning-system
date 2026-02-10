import {
  Course,
  CoursePaginationResponse,
} from "@/types/user/course/course.type";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT;

// service to get course pagination
export async function getCoursesPagination(
  page: number,
  searchKey?: string,
): Promise<CoursePaginationResponse> {
  const url = new URL(
    `${BACKEND_URL}QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang`,
  );

  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("MaNhom", "GP01");
  if (searchKey) {
    url.searchParams.set("tenKhoaHoc", searchKey);
  }

  const res = await fetch(url, {
    headers: { TokenCybersoft: TOKEN_CYBERSOFT! },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fetch courses failed");

  return res.json();
}
// service to get all course
export async function getAllCourses(): Promise<Course[]> {
  const res = await fetch(
    `${BACKEND_URL}QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`,
    {
      headers: { TokenCybersoft: TOKEN_CYBERSOFT! },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) throw new Error("Fetch courses failed");

  return res.json();
}

// service to get course detail
export async function getCourseDetail(maKhoaHoc: string) {
  const res = await fetch(
    `${BACKEND_URL}QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
    {
      headers: { TokenCybersoft: TOKEN_CYBERSOFT! },
      next: {
        revalidate: 60, // cache 60s
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch course detail");
  }

  return res.json();
}

// service to get related courses
export async function getRelatedCourses(maDanhMuc?: string) {
  const url = new URL(
    `${BACKEND_URL}QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?MaNhom=GP01`,
  );

  if (maDanhMuc) {
    url.searchParams.set("maDanhMuc", maDanhMuc);
  }
  const res = await fetch(url, {
    headers: {
      TokenCybersoft: TOKEN_CYBERSOFT || "",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch related courses");
  }

  return res.json();
}
