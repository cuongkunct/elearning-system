import { configureStore } from "@reduxjs/toolkit";

//Store setup admin/user
const store = configureStore({
  reducer: {
    // user
    // admin
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
