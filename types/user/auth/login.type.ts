export type UserLogin = {
  taiKhoan: string;
  matKhau: string;
};

export type UserLoginResponse = {
  statusCode: number,
  content : {
            "taiKhoan": string,
            "email": string,
            "soDT": string,
            "maNhom": string,
            "maLoaiNguoiDung": string,
            "hoTen": string,
            "accessToken": string
            }
};