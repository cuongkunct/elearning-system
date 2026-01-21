export type Course = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string | null;
    hoTen: string | null;
    maLoaiNguoiDung: string | null;
    tenLoaiNguoiDung: string | null;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
};

export type CoursePaginationResponse = {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: Course[];
};
