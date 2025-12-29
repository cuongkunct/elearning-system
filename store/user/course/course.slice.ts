import { createSlice } from "@reduxjs/toolkit";
import { fetchCourseList } from "./course.thunk";
import { SliceState, Course } from "./course.type";

const initialState: SliceState<Course[]> = {
  data: null,
  loading: false,
  error: undefined,
};

const courseReducer = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseReducer.reducer;
export const {} = courseReducer.actions;
