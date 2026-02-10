import type {
  TPaginationResponse,
  TCourse,
  TGetCoursesQuery,
} from "@/types/admin/course/course.type";
import type { SerializableApiError } from "@/services/admin/utils/apiError";
import type { TAddCoursePayload } from "@/types/admin/course/course.type";
import type { TUpdateCoursePayload } from "@/types/admin/course/course.type";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { courseService } from "@/services/admin/course/course.service";
import { toSerializableApiError } from "@/services/admin/utils/apiError";

export const fetchCourses = createAsyncThunk<
  TPaginationResponse<TCourse>,
  TGetCoursesQuery,
  { rejectValue: AxiosError }
>("course/fetchCourses", async (query, { rejectWithValue }) => {
  try {
    const res = await courseService.getCoursesPagination(query);
    return res.data;
  } catch (err) {
    return rejectWithValue(err as AxiosError);
  }
});

// ✅ addCourse
export const addCourse = createAsyncThunk<
  unknown,
  TAddCoursePayload,
  { rejectValue: SerializableApiError }
>("course/addCourse", async (payload, { rejectWithValue }) => {
  try {
    const res = await courseService.addCourse(payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(toSerializableApiError(err));
  }
});

// ✅ updateCourse
/**
 * ✅ CHANGED:
 * - Trả về payload để slice patch UI ngay (searchResult + data.items)
 * - Không phụ thuộc backend trả về gì
 */
export const updateCourse = createAsyncThunk<
  TUpdateCoursePayload,
  TUpdateCoursePayload,
  { rejectValue: SerializableApiError }
>("course/updateCourse", async (payload, { rejectWithValue }) => {
  try {
    await courseService.updateCourse(payload);
    return payload;
  } catch (err) {
    return rejectWithValue(toSerializableApiError(err));
  }
});

// ✅ deleteCourse
/**
 * ✅ CHANGED:
 * Trả về { maKhoaHoc } để slice biết xoá course nào khỏi UI
 */
export const deleteCourse = createAsyncThunk<
  { maKhoaHoc: string },
  string, // maKhoaHoc
  { rejectValue: SerializableApiError }
>("course/deleteCourse", async (maKhoaHoc, { rejectWithValue }) => {
  try {
    await courseService.deleteCourse(maKhoaHoc);
    return { maKhoaHoc };
  } catch (err) {
    return rejectWithValue(toSerializableApiError(err));
  }
});

// ✅ searchCourseByMaKhoaHoc
export const searchCourseByMaKhoaHoc = createAsyncThunk<
  TCourse,
  { maKhoaHoc: string },
  { rejectValue: SerializableApiError }
>(
  "course/searchCourseByMaKhoaHoc",
  async ({ maKhoaHoc }, { rejectWithValue }) => {
    try {
      const res = await courseService.getCourseInfo(maKhoaHoc);
      return res.data;
    } catch (err) {
      return rejectWithValue(toSerializableApiError(err));
    }
  },
);

// ✅ uploadCourseImage
export const uploadCourseImage = createAsyncThunk<
  unknown,
  { file: File; tenKhoaHoc: string },
  { rejectValue: SerializableApiError }
>(
  "course/uploadCourseImage",
  async ({ file, tenKhoaHoc }, { rejectWithValue }) => {
    try {
      const res = await courseService.uploadCourseImage(file, tenKhoaHoc);
      return res.data;
    } catch (err) {
      return rejectWithValue(toSerializableApiError(err));
    }
  },
);
