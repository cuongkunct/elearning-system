import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "@/services/axiosInstance";
import { handleAxiosError } from "@/services/handleAxiosError";
import { ApiError } from "@/services/api.type";

type CourseActionPayload = {
  maKhoaHoc: string;
  taiKhoan: string;
  token: string;
};

type CourseActionState = {
  loading: boolean;
  success: boolean;
  error?: ApiError;
};

type CourseState = {
  join: CourseActionState;
  cancel: CourseActionState;
};
// join course thunk
export const joinCourse = createAsyncThunk<
  any,
  CourseActionPayload,
  { rejectValue: ApiError }
>(
  "course/join",
  async ({ maKhoaHoc, taiKhoan, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "QuanLyKhoaHoc/DangKyKhoaHoc",
        { maKhoaHoc, taiKhoan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

// cancel course thunk
export const cancelCourse = createAsyncThunk<
  any,
  CourseActionPayload,
  { rejectValue: ApiError }
>(
  "course/cancel",
  async ({ maKhoaHoc, taiKhoan, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "QuanLyKhoaHoc/HuyGhiDanh",
        { maKhoaHoc, taiKhoan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

const initialState: CourseState = {
  join: {
    loading: false,
    success: false,
  },
  cancel: {
    loading: false,
    success: false,
  },
};

const userCourseReducer = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourseState(state) {
      state.join.success = false;
      state.cancel.success = false;
      state.join.error = undefined;
      state.cancel.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // join course
      .addCase(joinCourse.pending, (state) => {
        state.join.loading = true;
        state.join.error = undefined;
      })
      .addCase(joinCourse.fulfilled, (state) => {
        state.join.loading = false;
        state.join.success = true;
      })
      .addCase(joinCourse.rejected, (state, action) => {
        state.join.loading = false;
        state.join.error = action.payload;
      })
      // cancel course
      .addCase(cancelCourse.pending, (state) => {
        state.cancel.loading = true;
        state.cancel.error = undefined;
      })
      .addCase(cancelCourse.fulfilled, (state) => {
        state.cancel.loading = false;
        state.cancel.success = true;
      })
      .addCase(cancelCourse.rejected, (state, action) => {
        state.cancel.loading = false;
        state.cancel.error = action.payload;
      });
  },
});

export const { resetCourseState } = userCourseReducer.actions;
export default userCourseReducer.reducer;
