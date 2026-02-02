import { publicApi } from "../publicApi";
import type {
  TPaginationResponse,
  TCourse,
  TGetCoursesQuery,
} from "@/types/admin/course/course.type";

import { api } from "../api"; // ✅ dùng api có TokenCybersoft
import { getAccessTokenFromCookie } from "../utils/authCookie";
import type { TAddCoursePayload } from "@/types/admin/course/course.type";
import type { TUpdateCoursePayload } from "@/types/admin/course/course.type";

// helper đảm bảo prefix Bearer
const withBearer = (token: string) =>
  token.trim().toLowerCase().startsWith("bearer ")
    ? token.trim()
    : `Bearer ${token.trim()}`;

export const courseService = {
  getCoursesPagination(query: TGetCoursesQuery) {
    return publicApi.get<TPaginationResponse<TCourse>>(
      "QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang",
      {
        params: {
          page: query.page ?? 1,
          pageSize: query.pageSize ?? 10,
          MaNhom: query.maNhom ?? "GP01",
        },
      },
    );
  },

  // ✅ ADDED: add course (cần Bearer token + TokenCybersoft -> api)

  async addCourse(payload: TAddCoursePayload) {
    const token = getAccessTokenFromCookie();

    return api.post("QuanLyKhoaHoc/ThemKhoaHoc", payload, {
      // ✅ bắt buộc: Bearer + accessToken từ cookie
      headers: token ? { Authorization: withBearer(token) } : undefined,
    });
  },

  async updateCourse(payload: TUpdateCoursePayload) {
    // chỉ TokenCybersoft -> publicApi
    return publicApi.put("QuanLyKhoaHoc/CapNhatKhoaHoc", payload);
    // Nếu swagger của bạn là POST thì đổi thành:
    // return publicApi.post("QuanLyKhoaHoc/CapNhatKhoaHoc", payload);
  },

  // ✅ ADDED
  async deleteCourse(maKhoaHoc: string) {
    const token = getAccessTokenFromCookie();

    return api.delete("QuanLyKhoaHoc/XoaKhoaHoc", {
      params: { MaKhoaHoc: maKhoaHoc }, // ✅ đúng param
      headers: token ? { Authorization: withBearer(token) } : undefined,
    });
  },

  // ✅ ADDED
  async getCourseInfo(maKhoaHoc: string) {
    return publicApi.get<TCourse>("QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: { maKhoaHoc },
    });
  },

  // ✅ ADDED
  async uploadCourseImage(file: File, tenKhoaHoc: string) {
    const frm = new FormData();
    frm.append("file", file);
    frm.append("tenKhoaHoc", tenKhoaHoc);

    return publicApi.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", frm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
