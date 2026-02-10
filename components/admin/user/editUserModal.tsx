"use client";

import type { TUser } from "@/types/admin/user.type";

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

export type EditUserForm = {
  taiKhoan: string;
  matKhau: string; // để trống nếu không đổi
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: TUser | null;
  defaultGroup?: string;
  onSubmit: (
    payload: EditUserForm | Omit<EditUserForm, "matKhau">,
  ) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
};

const validatePassword = (pwd: string) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);

const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

function inferMaLoaiNguoiDung(user: any): string {
  if (user?.maLoaiNguoiDung) return user.maLoaiNguoiDung;
  const t = (user?.tenLoaiNguoiDung || "").toLowerCase();

  if (t.includes("giáo") || t.includes("gv")) return "GV";

  return "HV";
}

export default function EditUserModal({
  isOpen,
  onOpenChange,
  user,
  defaultGroup = "GP01",
  onSubmit,
  loading = false,
  error = null,
}: Props) {
  const initial: EditUserForm = useMemo(
    () => ({
      taiKhoan: user?.taiKhoan || "",
      matKhau: "", // để trống = giữ nguyên
      hoTen: user?.hoTen || "",
      soDT: user?.soDT || "",
      email: user?.email || "",
      maNhom: (user as any)?.maNhom || defaultGroup,
      maLoaiNguoiDung: inferMaLoaiNguoiDung(user),
    }),
    [user, defaultGroup],
  );

  const [form, setForm] = useState<EditUserForm>(initial);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initial);
      setSubmitAttempted(false);
    }
  }, [isOpen, initial]);

  const set = (k: keyof EditUserForm) => (v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof EditUserForm, string>> = {};

    if (!form.hoTen.trim()) e.hoTen = "Họ tên là bắt buộc";
    if (!form.soDT.trim()) e.soDT = "Số điện thoại là bắt buộc";

    if (!form.email.trim()) e.email = "Email là bắt buộc";
    else if (!validateEmail(form.email)) e.email = "Email không hợp lệ";

    if (!form.maNhom.trim()) e.maNhom = "Mã nhóm là bắt buộc";

    if (!form.maLoaiNguoiDung.trim())
      e.maLoaiNguoiDung = "Loại người dùng là bắt buộc";

    // Mật khẩu: KHÔNG bắt buộc khi edit.
    // Chỉ validate nếu user nhập để đổi mật khẩu.
    if (form.matKhau.trim() && !validatePassword(form.matKhau)) {
      e.matKhau = "Mật khẩu ≥ 8 ký tự, có 1 chữ HOA và 1 số";
    }

    return e;
  }, [form]);

  const hasError = useMemo(() => Object.values(errors).some(Boolean), [errors]);
  const showError = (k: keyof EditUserForm) => submitAttempted && !!errors[k];

  const handleSubmit = async () => {
    if (loading) return;

    setSubmitAttempted(true);
    if (hasError) return;

    // Nếu không nhập mật khẩu -> giữ nguyên mật khẩu cũ:
    // Không gửi field matKhau lên API để backend không update mật khẩu.
    const payload =
      form.matKhau.trim().length > 0
        ? form
        : (({ matKhau, ...rest }) => rest)(form);

    await onSubmit(payload);
  };

  return (
    <Modal isOpen={isOpen} radius="lg" size="xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit User
              <span className="text-sm font-normal text-default-500">
                Cập nhật thông tin người dùng
              </span>
            </ModalHeader>

            <ModalBody className="py-6">
              {submitAttempted && hasError ? (
                <p className="mb-3 text-sm text-danger-500">
                  Vui lòng kiểm tra các trường bôi đỏ trước khi cập nhật.
                </p>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isDisabled
                  isRequired
                  label="Tài khoản"
                  value={form.taiKhoan}
                />

                <Input
                  // mật khẩu không bắt buộc khi edit
                  errorMessage={showError("matKhau") ? errors.matKhau : ""}
                  isInvalid={showError("matKhau")}
                  label="Mật khẩu (để trống nếu không đổi)"
                  placeholder="••••••••"
                  type="password"
                  value={form.matKhau}
                  onValueChange={set("matKhau")}
                />

                <Input
                  isRequired
                  className="md:col-span-2"
                  errorMessage={showError("hoTen") ? errors.hoTen : ""}
                  isInvalid={showError("hoTen")}
                  label="Họ tên"
                  value={form.hoTen}
                  onValueChange={set("hoTen")}
                />

                <Input
                  isRequired
                  errorMessage={showError("soDT") ? errors.soDT : ""}
                  isInvalid={showError("soDT")}
                  label="Số điện thoại"
                  value={form.soDT}
                  onValueChange={set("soDT")}
                />

                <Input
                  isRequired
                  errorMessage={showError("email") ? errors.email : ""}
                  isInvalid={showError("email")}
                  label="Email"
                  type="email"
                  value={form.email}
                  onValueChange={set("email")}
                />

                <Select
                  isRequired
                  errorMessage={showError("maNhom") ? errors.maNhom : ""}
                  isInvalid={showError("maNhom")}
                  label="Mã nhóm"
                  selectedKeys={[form.maNhom]}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string;
                    if (v) setForm((p) => ({ ...p, maNhom: v }));
                  }}
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
                  isRequired
                  errorMessage={
                    showError("maLoaiNguoiDung") ? errors.maLoaiNguoiDung : ""
                  }
                  isInvalid={showError("maLoaiNguoiDung")}
                  label="Loại người dùng"
                  selectedKeys={[form.maLoaiNguoiDung]}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string;
                    if (v) setForm((p) => ({ ...p, maLoaiNguoiDung: v }));
                  }}
                >
                  <SelectItem key="HV">HV (Học viên)</SelectItem>
                  <SelectItem key="GV">GV (Giáo vụ)</SelectItem>
                </Select>
              </div>

              {error ? (
                <p className="mt-3 text-sm text-danger-500">{error}</p>
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={loading} variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={loading}
                onPress={handleSubmit}
              >
                Update user
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
