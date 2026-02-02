export type TCourseCreator = {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
};

export type TCourseCategory = {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
};

export type TCourse = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string; // "29/01/2026"
  soLuongHocVien: number;
  nguoiTao: TCourseCreator;
  danhMucKhoaHoc: TCourseCategory;
};

export type TPaginationResponse<T> = {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: T[];
};

export type TGetCoursesQuery = {
  page?: number;
  pageSize?: number;
  maNhom?: string;
};

export type TAddCoursePayload = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string; // ví dụ "01/02/2026"
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
};

// ✅ ADDED
export type TUpdateCoursePayload = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
};
