import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/auth/auth.slice";
import userSlice from "./user/userProfile/userProfile.slice";

//Store setup admin/user
const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
