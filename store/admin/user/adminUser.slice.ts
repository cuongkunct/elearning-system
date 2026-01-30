import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { api } from "@/services/admin/api";
import { publicApi } from "@/services/admin/publicApi"; // ✅ ADDED: search chỉ dùng TokenCybersoft
import type { initState } from "@/types/api.type";

import type {
  TUser,
  TPaginationResponse,
  TGetUsersQuery,
} from "./../../../types/admin/user.type";

import type { TCreateUserPayload } from "@/services/api.type";
import type { TUpdateUserPayload } from "@/services/api.type";

import {
  toSerializableApiError,
  type SerializableApiError,
} from "@/services/admin/utils/apiError";

// ✅ ADDED: query type cho search
export type TSearchUserQuery = {
  maNhom: string;
  tuKhoa: string;
};

/* =========================
   1) FETCH LIST
========================= */
export const fetchAdminUser = createAsyncThunk<
  TPaginationResponse<TUser>,
  TGetUsersQuery,
  { rejectValue: AxiosError }
>("admin/fetchAdminUser", async (query, { rejectWithValue }) => {
  try {
    const response = await api.get<TPaginationResponse<TUser>>(
      "QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang",
      {
        params: {
          MaNhom: query.maNhom ?? "GP01",
          page: query.page ?? 1,
          pageSize: query.pageSize ?? 10,
        },
      },
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

/* =========================
   2) CREATE USER
========================= */
export const createAdminUser = createAsyncThunk<
  unknown,
  TCreateUserPayload,
  { rejectValue: SerializableApiError }
>("admin/createAdminUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("QuanLyNguoiDung/ThemNguoiDung", payload);
    return res.data;
  } catch (error) {
    return rejectWithValue(toSerializableApiError(error));
  }
});

/* =========================
   3) UPDATE USER
========================= */
export const updateAdminUser = createAsyncThunk<
  unknown,
  TUpdateUserPayload,
  { rejectValue: SerializableApiError }
>("admin/updateAdminUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      payload,
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(toSerializableApiError(error));
  }
});

/* =========================
   4) DELETE USER
========================= */
export const deleteAdminUser = createAsyncThunk<
  unknown,
  string, // taiKhoan
  { rejectValue: SerializableApiError }
>("admin/deleteAdminUser", async (taiKhoan, { rejectWithValue }) => {
  try {
    const res = await api.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: { TaiKhoan: taiKhoan },
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(toSerializableApiError(error));
  }
});

/* =========================
   5) SEARCH USERS
========================= */
// ✅ ADDED
export const searchAdminUsers = createAsyncThunk<
  TUser[],
  TSearchUserQuery,
  { rejectValue: SerializableApiError }
>("admin/searchAdminUsers", async (query, { rejectWithValue }) => {
  try {
    const res = await publicApi.get<TUser[]>(
      "QuanLyNguoiDung/TimKiemNguoiDung",
      {
        params: {
          MaNhom: query.maNhom,
          tuKhoa: query.tuKhoa,
        },
      },
    );

    // normalize soDT/soDt
    const normalized = (res.data || []).map((u: any) => ({
      ...u,
      soDT: u.soDT ?? u.soDt ?? "",
    }));

    return normalized as TUser[];
  } catch (error) {
    return rejectWithValue(toSerializableApiError(error));
  }
});

/* =========================
   6) STATE
========================= */
type AdminUserState = initState<TPaginationResponse<TUser>> & {
  createLoading: boolean;
  createError: SerializableApiError | null;

  updateLoading: boolean;
  updateError: SerializableApiError | null;

  deleteLoading: boolean;
  deleteError: SerializableApiError | null;

  // ✅ ADDED: search state
  searchKeyword: string;
  searchLoading: boolean;
  searchError: SerializableApiError | null;
  searchResults: TUser[];
};

const initialState: AdminUserState = {
  loading: false,
  data: null,
  error: null,

  createLoading: false,
  createError: null,

  updateLoading: false,
  updateError: null,

  deleteLoading: false,
  deleteError: null,

  // ✅ ADDED
  searchKeyword: "",
  searchLoading: false,
  searchError: null,
  searchResults: [],
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
    },
    resetUpdateState: (state) => {
      state.updateLoading = false;
      state.updateError = null;
    },
    resetDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
    },

    // ✅ ADDED: search reducers
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    clearSearch: (state) => {
      state.searchKeyword = "";
      state.searchResults = [];
      state.searchLoading = false;
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== fetch list =====
      .addCase(fetchAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AxiosError;
      })

      // ===== create user =====
      .addCase(createAdminUser.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAdminUser.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAdminUser.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload ?? { message: "Create user failed" };
      })

      // ===== update user =====
      .addCase(updateAdminUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateAdminUser.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateAdminUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload ?? { message: "Update user failed" };
      })

      // ===== delete user =====
      .addCase(deleteAdminUser.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteAdminUser.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAdminUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload ?? { message: "Delete user failed" };
      })

      // ✅ ADDED: search reducers
      .addCase(searchAdminUsers.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchAdminUsers.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchAdminUsers.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload ?? { message: "Search failed" };
      });
  },
});

// ✅ CHANGED: export thêm setSearchKeyword/clearSearch
export const {
  resetCreateState,
  resetUpdateState,
  resetDeleteState,
  setSearchKeyword,
  clearSearch,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
