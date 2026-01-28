import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import {
  UserRegister,
  UserRegisterResponse,
} from "@/types/user/auth/register.type";
import { UserLogin, UserLoginResponse } from "@/types/user/auth/login.type";
import { log } from "console";


// 1 - Đăng ký
export const registerUser = createAsyncThunk<
  UserRegisterResponse,
  UserRegister,
  { rejectValue: { statusCode: number; content: string } }
>("createUserThunk", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`QuanLyNguoiDung/DangKy`, userData);
    return {
      statusCode: response.status,
      content: response.data,
    };
  } catch (error: any) {
    return rejectWithValue({
    statusCode: error.response?.status || 500,
     content: error || "An error occurred",
  });
  }
});

export const loginUser = createAsyncThunk<
  UserLoginResponse,
  UserLogin,
  { rejectValue: { statusCode: number; content: string } }
>("loginUserThunk", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      `QuanLyNguoiDung/DangNhap`,
      userData
    );
    return {
      statusCode: response.status,
      content: response.data,
    };
  } catch (error: any) {
    return rejectWithValue({
      statusCode: error.response?.status || 500,
      content: error || "Login failed",
    });
  }
}) 

interface SliceState {
  registerData: UserRegisterResponse | null;
  registerLoading: boolean;
  registerError: {
    statusCode: number;
    content: string;
  } | undefined;

  loginData: UserLoginResponse | null;
  loginLoading: boolean;
  loginError: {
    statusCode: number;
    content: string;
  } | undefined;
}

const initialState: SliceState = {
  registerData: null,
  registerLoading: false,
  registerError: undefined,
  // Login
  loginData: typeof window !== "undefined" && localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") as string)
    : null,
  loginLoading: false,
  loginError: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
 logout: (state) => {
  state.loginData = null;
  localStorage.removeItem("userData");
 }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = {
          statusCode: 500,
          content: "",
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginData = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
