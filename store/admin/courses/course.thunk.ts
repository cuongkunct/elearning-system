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
export const updateCourse = createAsyncThunk<
  unknown,
  TUpdateCoursePayload,
  { rejectValue: SerializableApiError }
>("course/updateCourse", async (payload, { rejectWithValue }) => {
  try {
    const res = await courseService.updateCourse(payload);

    return res.data;
  } catch (err) {
    return rejectWithValue(toSerializableApiError(err));
  }
});

// DeleteCourse thunk could be added here similarly if needed
// ✅ ADDED
export const deleteCourse = createAsyncThunk<
  unknown,
  string, // maKhoaHoc
  { rejectValue: SerializableApiError }
>("course/deleteCourse", async (maKhoaHoc, { rejectWithValue }) => {
  try {
    const res = await courseService.deleteCourse(maKhoaHoc);

    return res.data;
  } catch (err) {
    return rejectWithValue(toSerializableApiError(err));
  }
});

// SearchCourse thunk could be added here similarly if needed

// ✅ ADDED
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

// ✅ ADDED
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
