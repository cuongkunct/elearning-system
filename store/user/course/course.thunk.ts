import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import { ApiResponse, ApiError } from "@/types/api.type";
import { Course } from "./course.type";

export const fetchCourseList = createAsyncThunk<
  ApiResponse<Course[]>,
  void,
  { rejectValue: ApiError }
>("course/fetchCourseList", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(
      "QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error);
  }
});
