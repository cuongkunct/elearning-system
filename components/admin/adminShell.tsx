// "use client";

// import { useState } from "react";
// import {
//   useDisclosure,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
// } from "@heroui/react";

// import { Navbar } from "@/components/admin/navbar";
// import { AdminSidebar } from "@/components/admin/sidebar";
// import type { AdminActionKey } from "./../../types/admin/navbar.type";

// import AddUserModal from "./addUserModal";

// import { useDispatch, useSelector } from "react-redux";
// import type { DispatchType, RootState } from "@/store";
// import {
//   createAdminUser,
//   fetchAdminUser,
//   resetCreateState,
// } from "@/store/admin/user/adminUser.slice";

// export default function AdminShell({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [modalKey, setModalKey] = useState<AdminActionKey | null>(null);

//   return (
//     <>
//       <div className="relative flex flex-col h-screen pb-12 px-4 py-6">
//         <Navbar
//           onActionClick={(key) => {
//             console.log("Layout received:", key);
//             setModalKey(key);
//             onOpen();
//           }}
//         />

//         <div className="flex flex-1 pt-6 min-h-0">
//           <AdminSidebar />

//           <main className="flex-1 px-6 min-h-0">
//             <div className="mx-auto w-full max-w-8xl h-full min-h-0">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>

//       <AddUserModal
//         isOpen={isOpen && modalKey === "add_user"}
//         onOpenChange={onOpenChange}
//         defaultGroup="GP01"
//         onSubmit={async (payload) => {
//           console.log("SUBMIT ADD USER:", payload);
//         }}
//       />
//     </>
//   );
// }

//=============================================================================================================================================
"use client";

import { useMemo, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "@/components/admin/navbar";
import { AdminSidebar } from "@/components/admin/sidebar";
import AddUserModal from "./addUserModal";

import type { AdminActionKey } from "./../../types/admin/navbar.type";
import type { DispatchType, RootState } from "@/store";

import {
  createAdminUser,
  fetchAdminUser,
  resetCreateState,
} from "@/store/admin/user/adminUser.slice";

import type { AddUserForm } from "./addUserModal"; // nếu bạn export type

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [modalKey, setModalKey] = useState<AdminActionKey | null>(null);

  const dispatch: DispatchType = useDispatch();
  const { data, createLoading, createError } = useSelector(
    (s: RootState) => s.adminUser,
  );

  const isAddUserOpen = isOpen && modalKey === "add_user";

  const createErrorMessage = useMemo(() => {
    if (!createError) return null;
    return (
      (createError as any)?.response?.data?.content ||
      (createError as any)?.response?.data?.message ||
      (createError as any)?.message ||
      "Create user failed"
    );
  }, [createError]);

  const handleActionClick = (key: AdminActionKey) => {
    console.log("Layout received:", key);
    setModalKey(key);
    dispatch(resetCreateState());
    onOpen();
  };

  const handleAddUserOpenChange = (open: boolean) => {
    // Đồng bộ với disclosure
    if (open) onOpen();
    else onClose();

    // Khi đóng thì reset
    if (!open) {
      dispatch(resetCreateState());
      setModalKey(null);
    }
  };

  const handleSubmitAddUser = async (payload: AddUserForm) => {
    // ✅ payload đang đúng schema (soDT)
    const action = await dispatch(createAdminUser(payload as any));

    if (createAdminUser.fulfilled.match(action)) {
      const currentPage = data?.currentPage || 1;

      // refresh list sau khi tạo
      dispatch(
        fetchAdminUser({
          page: currentPage,
          pageSize: 19,
          maNhom: payload.maNhom,
        }),
      );

      handleAddUserOpenChange(false);
    }
  };

  return (
    <>
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

      <AddUserModal
        isOpen={isOpen && modalKey === "add_user"}
        onOpenChange={handleAddUserOpenChange}
        defaultGroup="GP01"
        loading={createLoading}
        error={createErrorMessage}
        onSubmit={handleSubmitAddUser}
      />
    </>
  );
}
