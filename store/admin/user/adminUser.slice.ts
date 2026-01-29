import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { api } from "@/services/admin/api";
import type { initState } from "@/types/api.type";

import type {
  TUser,
  TPaginationResponse,
  TGetUsersQuery,
} from "./../../../types/admin/user.type";

// ✅ payload create user (nên dùng chung type bạn đang đặt ở services)
import type { TCreateUserPayload } from "@/services/api.type";

/* =========================
   1) FETCH LIST (giữ nguyên)
========================= */
export const fetchAdminUser = createAsyncThunk<
  TPaginationResponse<TUser>,
  TGetUsersQuery,
  { rejectValue: AxiosError }
>("admin/fetchAdminUser", async (query, { rejectWithValue }) => {
  try {
    const response = await api.get<TPaginationResponse<TUser>>(
      "QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang",
      {
        params: {
          MaNhom: query.maNhom ?? "GP01",
          page: query.page ?? 1,
          pageSize: query.pageSize ?? 10,
        },
      },
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

/* =========================
   2) CREATE USER (thêm mới)
========================= */
export const createAdminUser = createAsyncThunk<
  unknown, // API create trả gì bạn chưa type => để unknown/any cũng được
  TCreateUserPayload,
  { rejectValue: AxiosError }
>("admin/createAdminUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("QuanLyNguoiDung/ThemNguoiDung", payload);
    return res.data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

/* =========================
   3) STATE: thêm createLoading/createError
========================= */
type AdminUserState = initState<TPaginationResponse<TUser>> & {
  createLoading: boolean;
  createError: AxiosError | null;
};

const initialState: AdminUserState = {
  loading: false,
  data: null,
  error: null,

  createLoading: false,
  createError: null,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== fetch list =====
      .addCase(fetchAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AxiosError;
      })

      // ===== create user =====
      .addCase(createAdminUser.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAdminUser.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAdminUser.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as AxiosError;
      });
  },
});

export const { resetCreateState } = adminUserSlice.actions;
export default adminUserSlice.reducer;
