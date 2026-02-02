import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


import axiosInstance from "@/services/axiosInstance";
import {
  UserRegister,
  UserRegisterResponse,
} from "@/types/user/auth/register.type";
import { UserLogin, UserLoginResponse } from "@/types/user/auth/login.type";
import { handleAxiosError } from "@/services/handleAxiosError";
import { ApiError } from "@/services/api.type";

export const registerUser = createAsyncThunk<
  UserRegisterResponse,
  UserRegister,
  { rejectValue: ApiError }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("QuanLyNguoiDung/DangKy", userData);
    return {
      statusCode: res.status,
      content: res.data,
    };
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const loginUser = createAsyncThunk<
  UserLoginResponse,
  UserLogin,
  { rejectValue: ApiError }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("QuanLyNguoiDung/DangNhap", userData);
    return {
      statusCode: res.status,
      content: res.data,
    };
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

type AuthState = {
  register: {
    data: UserRegisterResponse | null;
    loading: boolean;
    error?: ApiError;
  };
  login: {
    data: UserLoginResponse | null;
    loading: boolean;
    error?: ApiError;
  };
  userData: { accessToken: string; role: string } | null;
};

const initialState: AuthState = {
  register: {
    data: null,
    loading: false,
  },
  login: {
    data: null,
    loading: false,
  },
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData(state, action: PayloadAction<{ accessToken: string; role: string }>) {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true;
        state.register.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.loading = false;
        state.register.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      });
  },
});

export const { logout, setLoginData } = authSlice.actions;
export default authSlice.reducer;
