"use client";

import React, { createContext, useMemo, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "@/components/admin/navbar";
import { AdminSidebar } from "@/components/admin/sidebar";

import type { AdminActionKey } from "./../../types/admin/navbar.type";
import type { TUser } from "@/types/admin/user.type";
import type { DispatchType, RootState } from "@/store";

import AddUserModal from "./addUserModal";
import EditUserModal from "./editUserModal";
import DeleteUserModal from "./deleteUserModal"; // ✅ ADDED

import {
  fetchAdminUser,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser, // ✅ ADDED
  resetCreateState,
  resetUpdateState,
  resetDeleteState, // ✅ ADDED
} from "@/store/admin/user/adminUser.slice";

// ✅ CHANGED: context thêm openDeleteUser
export const AdminModalContext = createContext<{
  openEditUser: (user: TUser) => void;
  openDeleteUser: (user: TUser) => void; // ✅ ADDED
}>({
  openEditUser: () => {},
  openDeleteUser: () => {}, // ✅ ADDED
});

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch: DispatchType = useDispatch();
  const {
    data,
    createLoading,
    createError,
    updateLoading,
    updateError,
    deleteLoading, // ✅ ADDED
    deleteError, // ✅ ADDED
  } = useSelector((s: RootState) => s.adminUser);

  // ✅ CHANGED: modalKey thêm delete_user
  const [modalKey, setModalKey] = useState<
    AdminActionKey | "edit_user" | "delete_user" | null
  >(null);

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const createErrorMessage = useMemo(() => {
    if (!createError) return null;
    return createError.message || "Create user failed";
  }, [createError]);

  const updateErrorMessage = useMemo(() => {
    if (!updateError) return null;
    return updateError.message || "Update user failed";
  }, [updateError]);

  // ✅ ADDED
  const deleteErrorMessage = useMemo(() => {
    if (!deleteError) return null;
    return deleteError.message || "Delete user failed";
  }, [deleteError]);

  const handleActionClick = (key: AdminActionKey) => {
    setModalKey(key);
    dispatch(resetCreateState());
    dispatch(resetUpdateState());
    dispatch(resetDeleteState()); // ✅ ADDED
    onOpen();
  };

  const handleOpenChange = (open: boolean) => {
    if (open) onOpen();
    else onClose();

    if (!open) {
      setModalKey(null);
      setSelectedUser(null);

      dispatch(resetCreateState());
      dispatch(resetUpdateState());
      dispatch(resetDeleteState()); // ✅ ADDED
    }
  };

  // helper refresh list
  const refreshList = (maNhom: string) => {
    const currentPage = data?.currentPage || 1;
    dispatch(fetchAdminUser({ page: currentPage, pageSize: 19, maNhom }));
  };

  // ✅ CHANGED: context value thêm openDeleteUser
  const ctxValue = useMemo(
    () => ({
      openEditUser: (user: TUser) => {
        setSelectedUser(user);
        setModalKey("edit_user");
        dispatch(resetUpdateState());
        onOpen();
      },
      openDeleteUser: (user: TUser) => {
        // ✅ ADDED
        setSelectedUser(user);
        setModalKey("delete_user");
        dispatch(resetDeleteState());
        onOpen();
      },
    }),
    [dispatch, onOpen],
  );

  return (
    <AdminModalContext.Provider value={ctxValue}>
      <div className="relative flex flex-col h-screen pb-12 px-4 py-6">
        <Navbar onActionClick={handleActionClick} />

        <div className="flex flex-1 pt-6 min-h-0">
          <AdminSidebar />

          <main className="flex-1 px-6 min-h-0">
            <div className="mx-auto w-full max-w-8xl h-full min-h-0">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Add user */}
      <AddUserModal
        isOpen={isOpen && modalKey === "add_user"}
        onOpenChange={handleOpenChange}
        defaultGroup="GP01"
        loading={createLoading}
        error={createErrorMessage}
        onSubmit={async (payload) => {
          const action = await dispatch(createAdminUser(payload as any));
          if (createAdminUser.fulfilled.match(action)) {
            refreshList(payload.maNhom);
            handleOpenChange(false);
          }
        }}
      />

      {/* Edit user */}
      <EditUserModal
        isOpen={isOpen && modalKey === "edit_user"}
        onOpenChange={handleOpenChange}
        defaultGroup="GP01"
        user={selectedUser}
        loading={updateLoading}
        error={updateErrorMessage}
        onSubmit={async (payload) => {
          const action = await dispatch(updateAdminUser(payload as any));
          if (updateAdminUser.fulfilled.match(action)) {
            refreshList(payload.maNhom);
            handleOpenChange(false);
          }
        }}
      />

      {/* ✅ ADDED: Delete user confirm modal */}
      <DeleteUserModal
        isOpen={isOpen && modalKey === "delete_user"}
        onOpenChange={handleOpenChange}
        title="Delete user"
        description={
          selectedUser
            ? `Bạn chắc chắn muốn xoá user "${selectedUser.taiKhoan}"? Hành động này không thể hoàn tác.`
            : "Bạn chắc chắn muốn xoá user này?"
        }
        loading={deleteLoading}
        error={deleteErrorMessage}
        onConfirm={async () => {
          if (!selectedUser?.taiKhoan) return;

          const action = await dispatch(deleteAdminUser(selectedUser.taiKhoan));
          if (deleteAdminUser.fulfilled.match(action)) {
            // refresh lại theo nhóm hiện tại (ưu tiên lấy từ selectedUser nếu có)
            refreshList((selectedUser as any)?.maNhom || "GP01");
            handleOpenChange(false);
          }
        }}
      />
    </AdminModalContext.Provider>
  );
}
