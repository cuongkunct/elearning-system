import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./user/course/course.slice";
//Store setup admin/user
const store = configureStore({
  reducer: {
    // user
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
