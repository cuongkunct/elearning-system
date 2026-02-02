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
  maLoaiNguoiDung: string; // HV | GV
  maNhom: string; // GP01...
  email: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: AddUserForm) => Promise<void> | void;
  defaultGroup?: string;
  loading?: boolean;
  error?: string | null; // server error
};

type FieldErrors = Partial<Record<keyof AddUserForm, string>>;
type Touched = Partial<Record<keyof AddUserForm, boolean>>;

// ===== validation helpers =====
const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

// >=8 ký tự, có 1 chữ HOA, có 1 số
const validatePassword = (pwd: string) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);

const validateUsername = (username: string) => {
  const v = username.trim();
  if (v.length < 6) return "Tài khoản tối thiểu 6 ký tự";
  if (/\s/.test(v)) return "Tài khoản không được chứa khoảng trắng";
  return "";
};

export default function AddUserModal({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultGroup = "GP01",
  loading = false,
  error = null,
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

  // ✅ NEW: track touched + submit attempt
  const [touched, setTouched] = useState<Touched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!isOpen) {
      setForm(initial);
      setFieldErrors({});
      setTouched({});
      setSubmitAttempted(false);
    }
  }, [isOpen, initial]);

  const validateForm = (): FieldErrors => {
    const errs: FieldErrors = {};

    // taiKhoan
    if (!form.taiKhoan.trim()) errs.taiKhoan = "Tài khoản là bắt buộc";
    else {
      const userErr = validateUsername(form.taiKhoan);
      if (userErr) errs.taiKhoan = userErr;
    }

    // matKhau
    if (!form.matKhau.trim()) errs.matKhau = "Mật khẩu là bắt buộc";
    else if (!validatePassword(form.matKhau))
      errs.matKhau = "Mật khẩu ≥ 8 ký tự, có 1 chữ HOA và 1 số";

    // hoTen
    if (!form.hoTen.trim()) errs.hoTen = "Họ tên là bắt buộc";

    // email
    if (!form.email.trim()) errs.email = "Email là bắt buộc";
    else if (!validateEmail(form.email)) errs.email = "Email không hợp lệ";

    // soDT
    if (!form.soDT.trim()) errs.soDT = "Số điện thoại là bắt buộc";
    else if (!/^\d{8,15}$/.test(form.soDT.trim()))
      errs.soDT = "Số điện thoại phải là số (8–15 ký tự)";

    // maNhom
    if (!form.maNhom.trim()) errs.maNhom = "Mã nhóm là bắt buộc";

    // maLoaiNguoiDung
    if (!form.maLoaiNguoiDung.trim())
      errs.maLoaiNguoiDung = "Loại người dùng là bắt buộc";

    return errs;
  };

  // ✅ NEW: compute current errors (for banner + final submit)
  const currentErrors = useMemo(() => validateForm(), [form]);
  const hasAnyError = useMemo(
    () => Object.values(currentErrors).some(Boolean),
    [currentErrors],
  );

  // ✅ NEW: show field error only when touched OR submitAttempted
  const showError = (key: keyof AddUserForm) =>
    !!currentErrors[key] && (submitAttempted || touched[key]);

  const setField = (k: keyof AddUserForm) => (v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setTouched((prev) => ({ ...prev, [k]: true })); // ✅ NEW
  };

  const handleSubmit = async () => {
    if (loading) return;

    setSubmitAttempted(true); // ✅ NEW: show errors banner

    // set errors into state so UI can render
    setFieldErrors(currentErrors);

    if (hasAnyError) return;

    await onSubmit(form);
    // ✅ Không tự đóng ở đây: parent đóng khi create success
  };

  // ✅ NEW: banner message (one red line)
  const bannerMessage = useMemo(() => {
    if (!submitAttempted) return null;
    if (!hasAnyError) return null;
    return "Vui lòng kiểm tra các trường bôi đỏ trước khi tạo user.";
  }, [submitAttempted, hasAnyError]);

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
              {/* ✅ NEW: red banner line */}
              {bannerMessage ? (
                <p className="mb-3 text-sm text-danger-500">{bannerMessage}</p>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tài khoản"
                  value={form.taiKhoan}
                  onValueChange={setField("taiKhoan")}
                  isRequired
                  isInvalid={showError("taiKhoan")}
                  errorMessage={
                    showError("taiKhoan") ? currentErrors.taiKhoan : ""
                  }
                />

                <Input
                  label="Mật khẩu"
                  type="password"
                  value={form.matKhau}
                  onValueChange={setField("matKhau")}
                  isRequired
                  isInvalid={showError("matKhau")}
                  errorMessage={
                    showError("matKhau") ? currentErrors.matKhau : ""
                  }
                />

                <Input
                  className="md:col-span-2"
                  label="Họ tên"
                  value={form.hoTen}
                  onValueChange={setField("hoTen")}
                  isRequired
                  isInvalid={showError("hoTen")}
                  errorMessage={showError("hoTen") ? currentErrors.hoTen : ""}
                />

                <Input
                  label="Số điện thoại"
                  value={form.soDT}
                  onValueChange={setField("soDT")}
                  isRequired // ✅ hiện dấu * đỏ
                  isInvalid={showError("soDT")} // ✅ đỏ khi sai/thiếu
                  errorMessage={showError("soDT") ? currentErrors.soDT : ""}
                />

                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onValueChange={setField("email")}
                  isRequired
                  isInvalid={showError("email")}
                  errorMessage={showError("email") ? currentErrors.email : ""}
                />

                <Select
                  label="Mã nhóm"
                  selectedKeys={[form.maNhom]}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string;
                    if (v) {
                      setForm((p) => ({ ...p, maNhom: v }));
                      setTouched((prev) => ({ ...prev, maNhom: true })); // ✅ NEW
                    }
                  }}
                  isRequired
                  isInvalid={showError("maNhom")}
                  errorMessage={showError("maNhom") ? currentErrors.maNhom : ""}
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
                    if (v) {
                      setForm((p) => ({ ...p, maLoaiNguoiDung: v }));
                      setTouched((prev) => ({
                        ...prev,
                        maLoaiNguoiDung: true,
                      })); // ✅ NEW
                    }
                  }}
                  isRequired
                  isInvalid={showError("maLoaiNguoiDung")}
                  errorMessage={
                    showError("maLoaiNguoiDung")
                      ? currentErrors.maLoaiNguoiDung
                      : ""
                  }
                >
                  <SelectItem key="HV">HV (Học viên)</SelectItem>
                  <SelectItem key="GV">GV (Giáo vụ)</SelectItem>
                </Select>
              </div>

              {/* server error */}
              {error ? (
                <p className="mt-3 text-sm text-danger-500">{error}</p>
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose} isDisabled={loading}>
                Cancel
              </Button>

              {/* ✅ CHANGED: không disable theo canSubmit nữa */}
              <Button
                color="primary"
                isDisabled={loading}
                isLoading={loading}
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
