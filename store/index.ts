import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/auth/auth.slice";
import userSlice from "./user/profile/profile.slice";
import adminUserReducer from "./admin/user/adminUser.slice";
import courseReducer from "./admin/courses/courses.slice";

//Store setup admin/user
const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userSlice,
    adminUser: adminUserReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
