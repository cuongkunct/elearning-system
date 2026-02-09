export type UserProfileResponse = {
  chiTietKhoaHocGhiDanh: [];
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  matKhau: string;
  soDT: string;
  taiKhoan: string;
};

export type EditUserProfile = {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
  hoTen: string;
  maLoaiNguoiDung: string;
};

export type UpdateUserProfileResponse = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDt: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
  biDanh: null;
  maLoaiNguoiDungNavigation: null;
  hocVienKhoaHoc: [];
  khoaHoc: [];
};
