export type UserRegister = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
};

export type UserRegisterResponse = {
  statusCode: number;
  content: {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDT: string;
    maNhom: string;
    hoTen: string;
  };
};
