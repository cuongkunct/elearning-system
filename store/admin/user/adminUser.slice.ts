import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// axiosInstance = api

import { api } from "@/services/admin/api";

import {
  TUser,
  TPaginationResponse,
  TGetUsersQuery,
} from "@/types/admin/user.type";

import { initState, ApiResponse } from "@/types/api.type";
import { AxiosError } from "axios";

export const fetchAdminUser = createAsyncThunk<
  TPaginationResponse<TUser>, // ✅ payload khi fulfilled
  TGetUsersQuery, // ✅ input (page, pageSize, maNhom, tuKhoa)
  { rejectValue: AxiosError } // ✅ payload khi rejected
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
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(rejectWithValue(error as AxiosError));
    return rejectWithValue(error as AxiosError);
  }
});

const initialState: initState<TPaginationResponse<TUser>> = {
  loading: false,
  data: null,
  error: null,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload as AxiosError<any>;
      });
  },
});

export default adminUserSlice.reducer;
