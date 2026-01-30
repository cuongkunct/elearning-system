export type ApiResponse<T> = {
  statusCode: number;
  content: T;
};

export type ApiError = {
  statusCode: number;
  content: string;
};

// src/services/admin/user/api.type.ts
export type TMaLoaiNguoiDung = "HV" | "GV" | "QuanTri" | "KhachHang";

export type TCreateUserPayload = {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string; // GP01
  hoTen: string;
  maLoaiNguoiDung: TMaLoaiNguoiDung; // thường HV/GV
};

// ✅ update payload giống create
export type TUpdateUserPayload = TCreateUserPayload;
