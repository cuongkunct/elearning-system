import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/auth/auth.slice";
import adminUserReducer from "./admin/user/adminUser.slice";
import courseReducer from "./admin/courses/courses.slice";

//Store setup admin/user
const store = configureStore({
  reducer: {
    auth: authSlice,
    adminUser: adminUserReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
