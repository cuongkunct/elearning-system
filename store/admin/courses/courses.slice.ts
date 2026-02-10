import type { AxiosError } from "axios";
import type {
  TPaginationResponse,
  TCourse,
} from "@/types/admin/course/course.type";
import type { SerializableApiError } from "@/services/admin/utils/apiError";

import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  searchCourseByMaKhoaHoc,
} from "./course.thunk";

type CourseState = {
  loading: boolean;
  data: TPaginationResponse<TCourse> | null;
  error: AxiosError | null;

  addLoading: boolean;
  addError: SerializableApiError | null;

  updateLoading: boolean;
  updateError: SerializableApiError | null;

  deleteLoading: boolean;
  deleteError: SerializableApiError | null;

  searchKeyword: string;
  searchLoading: boolean;
  searchError: SerializableApiError | null;
  searchResult: TCourse | null;
};

const initialState: CourseState = {
  loading: false,
  data: null,
  error: null,

  addLoading: false,
  addError: null,

  updateLoading: false,
  updateError: null,

  deleteLoading: false,
  deleteError: null,

  searchKeyword: "",
  searchLoading: false,
  searchError: null,
  searchResult: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetAddCourseState: (state) => {
      state.addLoading = false;
      state.addError = null;
    },
    resetUpdateCourseState: (state) => {
      state.updateLoading = false;
      state.updateError = null;
    },
    resetDeleteCourseState: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
    },

    setCourseSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    clearCourseSearch: (state) => {
      state.searchKeyword = "";
      state.searchLoading = false;
      state.searchError = null;
      state.searchResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== fetch =====
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as AxiosError) ?? null;
      })

      // ===== add =====
      .addCase(addCourse.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addCourse.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload ?? { message: "Add course failed" };
      })

      // ===== update =====
      .addCase(updateCourse.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updated = action.payload; // TUpdateCoursePayload (from thunk)

        // ✅ patch searchResult if matches
        if (
          state.searchResult &&
          state.searchResult.maKhoaHoc === updated.maKhoaHoc
        ) {
          state.searchResult = {
            ...state.searchResult,
            ...updated,
          } as any;
        }

        // ✅ patch list item if exists
        if (state.data?.items?.length) {
          state.data.items = state.data.items.map((c) =>
            c.maKhoaHoc === updated.maKhoaHoc
              ? ({ ...c, ...updated } as any)
              : c,
          );
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload ?? {
          message: "Update course failed",
        };
      })

      // ===== delete =====
      .addCase(deleteCourse.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.deleteLoading = false;

        const { maKhoaHoc } = action.payload; // ✅ requires thunk return {maKhoaHoc}

        // ✅ nếu đang search đúng khoá đó -> clear ngay
        if (state.searchResult?.maKhoaHoc === maKhoaHoc) {
          state.searchResult = null;
        }

        // ✅ remove khỏi list phân trang
        if (state.data?.items?.length) {
          state.data.items = state.data.items.filter(
            (c) => c.maKhoaHoc !== maKhoaHoc,
          );
          state.data.totalCount = Math.max(0, state.data.totalCount - 1);
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload ?? {
          message: "Delete course failed",
        };
      })

      // ===== search =====
      .addCase(searchCourseByMaKhoaHoc.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchResult = null;
      })
      .addCase(searchCourseByMaKhoaHoc.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchCourseByMaKhoaHoc.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload ?? {
          message: "Search course failed",
        };
      });
  },
});

export const {
  resetAddCourseState,
  resetUpdateCourseState,
  resetDeleteCourseState,
  setCourseSearchKeyword,
  clearCourseSearch,
} = courseSlice.actions;

export default courseSlice.reducer;
