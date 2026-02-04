import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import {
  UserProfileResponse,
  UpdateUserProfileResponse,
  EditUserProfile,
} from "@/types/user/userProfile/userProfile.type";
import { ApiError } from "@/services/api.type";
import { handleAxiosError } from "@/services/handleAxiosError";


export const getUserProfile = createAsyncThunk<
  UserProfileResponse,
  { token: string },
  { rejectValue: ApiError }
>("user/getProfile", async ({ token }, { rejectWithValue }) => {
  try {
    if (!token) rejectWithValue(handleAxiosError("Unauthorized"));

    const res = await axiosInstance.post<UserProfileResponse>(
      `QuanLyNguoiDung/ThongTinTaiKhoan`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateUserProfile = createAsyncThunk<
  UpdateUserProfileResponse,
  { data: EditUserProfile; token: string },
  { rejectValue: ApiError }
>("user/updateProfile", async ({ data, token }, { rejectWithValue }) => {
  try {
    if (!token) rejectWithValue(handleAxiosError("Unauthorized"));
    const res = await axiosInstance.put<UpdateUserProfileResponse>(
      `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

type UserState = {
  profile: {
    data: UserProfileResponse | null;
    loading: boolean;
    error?: ApiError;
  };
  update: {
    data: UpdateUserProfileResponse | null;
    loading: boolean;
    error?: ApiError;
  };
};

const initialState: UserState = {
  profile: { data: null, loading: false },
  update: { data: null, loading: false },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      /*Get user profile */
      .addCase(getUserProfile.pending, (state) => {
        state.profile.loading = true;
        state.profile.error = undefined;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.profile.data = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profile.loading = false;
        state.profile.error = action.payload;
      })
      /*Update user profile */
      .addCase(updateUserProfile.pending, (state) => {
        state.update.loading = true;
        state.update.error = undefined;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });
  },
});

export default userSlice.reducer;