"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

export type AddUserForm = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string; // HV | GV (hoặc theo bạn)
  maNhom: string; // GP01...
  email: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void; // ✅ giữ boolean vì Modal gọi vậy
  onSubmit: (payload: AddUserForm) => Promise<void> | void;
  defaultGroup?: string;
  loading?: boolean;
  error?: string | null;
};

export default function AddUserModal({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultGroup = "GP01",
}: Props) {
  const initial: AddUserForm = useMemo(
    () => ({
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "HV",
      maNhom: defaultGroup,
      email: "",
    }),
    [defaultGroup],
  );

  const [form, setForm] = useState<AddUserForm>(initial);

  // reset form khi đóng modal
  useEffect(() => {
    if (!isOpen) setForm(initial);
  }, [isOpen, initial]);

  const set = (k: keyof AddUserForm) => (v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const canSubmit =
    form.taiKhoan.trim() &&
    form.matKhau.trim() &&
    form.hoTen.trim() &&
    form.email.trim() &&
    form.maNhom.trim() &&
    form.maLoaiNguoiDung.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    if (onSubmit) await onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg" size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add User
              <span className="text-sm font-normal text-default-500">
                Nhập thông tin theo schema API
              </span>
            </ModalHeader>

            <ModalBody className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tài khoản"
                  value={form.taiKhoan}
                  onValueChange={set("taiKhoan")}
                  isRequired
                />
                <Input
                  label="Mật khẩu"
                  type="password"
                  value={form.matKhau}
                  onValueChange={set("matKhau")}
                  isRequired
                />

                <Input
                  className="md:col-span-2"
                  label="Họ tên"
                  value={form.hoTen}
                  onValueChange={set("hoTen")}
                  isRequired
                />

                <Input
                  label="Số điện thoại"
                  value={form.soDT}
                  onValueChange={set("soDT")}
                />

                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onValueChange={set("email")}
                  isRequired
                />

                <Select
                  label="Mã nhóm"
                  selectedKeys={[form.maNhom]}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string;
                    if (v) setForm((p) => ({ ...p, maNhom: v }));
                  }}
                  isRequired
                >
                  {[
                    "GP01",
                    "GP02",
                    "GP03",
                    "GP04",
                    "GP05",
                    "GP06",
                    "GP07",
                    "GP08",
                  ].map((g) => (
                    <SelectItem key={g}>{g}</SelectItem>
                  ))}
                </Select>

                <Select
                  label="Loại người dùng"
                  selectedKeys={[form.maLoaiNguoiDung]}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string;
                    if (v) setForm((p) => ({ ...p, maLoaiNguoiDung: v }));
                  }}
                  isRequired
                >
                  <SelectItem key="HV">HV (Học viên)</SelectItem>
                  <SelectItem key="GV">GV (Giáo vụ)</SelectItem>
                </Select>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={!canSubmit}
                onPress={handleSubmit}
              >
                Create user
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
