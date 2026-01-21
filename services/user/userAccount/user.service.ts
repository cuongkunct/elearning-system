import Cookies from "js-cookie";

import axiosInstance from "@/services/axiosInstance";

export async function fetchUserProfile() {
  const account = Cookies.get("userData");

  if (!account) {
    throw new Error("Unauthorized");
  }
  const userData = JSON.parse(account).content;
  const res = await axiosInstance.post(
    `QuanLyNguoiDung/ThongTinTaiKhoan`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    },
  );

  return res.data;
}

export async function fetchUpdateUserProfile({ data }: any) {
  const account = Cookies.get("userData");

  if (!account) {
    throw new Error("Unauthorized");
  }
  const userData = JSON.parse(account).content;
  const res = await axiosInstance.put(
    `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    data,
    {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    },
  );

  return res.data;
}
