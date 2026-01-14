import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import {
  ProfileResponse,
  updateUserProfileRequest,
  updateUserProfileResponse,
} from "@/types/user/userProfile/userProfile.type";

// 1 - Đăng ký
export const fetchGetUserProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: { statusCode: number; content: string } }
>("getProfileInfoThunk", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      "QuanLyNguoiDung/ThongTinTaiKhoan"
    );
    return {
      statusCode: response.status,
      content: response.data,
    } as ProfileResponse;
  } catch (error: any) {
    return rejectWithValue({
      statusCode: error.response?.status || 500,
      content: error?.message || "An error occurred",
    });
  }
});

export const fetchUpdateUserProfile = createAsyncThunk<
  updateUserProfileResponse,
  updateUserProfileRequest,
  { rejectValue: { statusCode: number; content: string } }
>(
  "updateProfileInfoThunk",
  async (updateUserProfileRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        updateUserProfileRequest
      );
      return {
        statusCode: response.status,
        content: response.data,
      } as updateUserProfileResponse;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue({
        statusCode: error.response?.status || 500,
        content: error?.message || "An error occurred",
      });
    }
  }
);

interface SliceState {
  userProfile: ProfileResponse | null;
  userProfileLoading: boolean;
  userProfileError:
    | {
        statusCode: number;
        content: string;
      }
    | undefined;

  updateUserProfile: updateUserProfileResponse | null;
  updateUserProfileLoading: boolean;
  updateUserProfileError:
    | {
        statusCode: number;
        content: string;
      }
    | undefined;
}

const initialState: SliceState = {
  userProfile: null,
  userProfileLoading: false,
  userProfileError: undefined,

  updateUserProfile: null,
  updateUserProfileLoading: false,
  updateUserProfileError: undefined,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUserProfile.pending, (state) => {
        state.userProfileLoading = true;
        state.userProfileError = {
          statusCode: 500,
          content: "",
        };
      })
      .addCase(fetchGetUserProfile.fulfilled, (state, action) => {
        state.userProfileLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchGetUserProfile.rejected, (state, action) => {
        state.userProfileLoading = false;
        state.userProfileError = action.payload;
      })
      .addCase(fetchUpdateUserProfile.pending, (state) => {
        state.updateUserProfileLoading = true;
        state.updateUserProfileError = {
          statusCode: 500,
          content: "",
        };
      })
      .addCase(fetchUpdateUserProfile.fulfilled, (state, action) => {
        state.updateUserProfileLoading = false;
        state.updateUserProfile = action.payload;
      })
      .addCase(fetchUpdateUserProfile.rejected, (state, action) => {
        state.updateUserProfileLoading = false;
        state.updateUserProfileError = action.payload;
      });
  },
});

export default userSlice.reducer;
