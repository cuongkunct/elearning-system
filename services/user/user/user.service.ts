// import Cookies from "js-cookie";

// import axiosInstance from "@/services/axiosInstance";
// import {
//   UserProfileResponse,
//   UpdateUserProfileResponse,
//   EditUserProfile,
// } from "@/types/user/userProfile/userProfile.type";

// export async function fetchUserProfile(): Promise<UserProfileResponse> {
//   const account = Cookies.get("userData");

//   if (!account) {
//     throw new Error("Unauthorized");
//   }
//   const userData = JSON.parse(account).content;
//   const res = await axiosInstance.post<UserProfileResponse>(
//     `QuanLyNguoiDung/ThongTinTaiKhoan`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${userData.accessToken}`,
//       },
//     },
//   );

//   return res.data;
// }

// export async function fetchUpdateUserProfile(
//   data: EditUserProfile,
// ): Promise<UpdateUserProfileResponse> {
//   const account = Cookies.get("userData");

//   if (!account) {
//     throw new Error("Unauthorized");
//   }
//   const userData = JSON.parse(account).content;
//   const res = await axiosInstance.put<UpdateUserProfileResponse>(
//     `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${userData.accessToken}`,
//       },
//     },
//   );

//   return res.data;
// }
