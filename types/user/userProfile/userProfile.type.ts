export type ProfileResponse = {
  statusCode: number;
  content: {
    chiTietKhoaHocGhiDanh: [];
    email: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    maNhom: string;
    matKhau: string;
    soDT: string;
    taiKhoan: string;
  };
};

export type updateUserProfileRequest = {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
  hoTen: string;
};

export type updateUserProfileResponse = {
  statusCode: number;
  content: {
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
};
