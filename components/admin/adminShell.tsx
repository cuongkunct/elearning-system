"use client";

import { useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";

import { Navbar } from "@/components/admin/navbar";
import { AdminSidebar } from "@/components/admin/sidebar";
import type { AdminActionKey } from "@/types/admin/navbar.type";
import AddUserModal from "./addUserModal";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalKey, setModalKey] = useState<AdminActionKey | null>(null);

  return (
    <>
      <div className="relative flex flex-col h-screen pb-12 px-4 py-6">
        <Navbar
          onActionClick={(key) => {
            console.log("Layout received:", key);
            setModalKey(key);
            onOpen();
          }}
        />

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
        onOpenChange={onOpenChange}
        defaultGroup="GP01"
        onSubmit={async (payload) => {
          console.log("SUBMIT ADD USER:", payload);
        }}
      />
    </>
  );
}
