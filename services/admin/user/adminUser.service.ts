// src/services/admin/user/adminUser.service.ts
import { api } from "../api";
import type { TCreateUserPayload } from "@/services/api.type";
import type { ApiResponse } from "@/services/api.type";

export type TCyberApiResponse<T = any> = {
  statusCode: number;
  message?: string;
  content?: T;
};

export const adminUserService = {
  async createUser(payload: TCreateUserPayload) {
    const res = await api.post<ApiResponse<any>>(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload,
    );
    return res.data;
  },
};
