import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import {
  UserRegister,
  UserRegisterResponse,
} from "@/types/user/auth/register.type";

// 1 - Đăng ký
export const registerUser = createAsyncThunk<
  UserRegisterResponse,
  UserRegister,
  { rejectValue: string }
>("createUserThunk", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      `/QuanLyNguoiDung/DangKy`,
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

interface SliceState {
  data: UserRegisterResponse | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: SliceState = {
  data: null,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState(state) {
      state.data = null;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
