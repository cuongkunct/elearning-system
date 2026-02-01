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
} from "@heroui/react";

import type { TAddCoursePayload } from "@/types/admin/course/course.type";

function formatDDMMYYYY(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function getTaiKhoanFromUserDataCookie(): string {
  if (typeof document === "undefined") return "";
  const cookie = document.cookie
    .split("; ")
    .find((x) => x.startsWith("userData="));
  if (!cookie) return "";
  const raw = cookie.substring("userData=".length);
  try {
    const decoded = decodeURIComponent(raw);
    const obj = JSON.parse(decoded);
    return obj?.content?.taiKhoan || "";
  } catch {
    return "";
  }
}

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: TAddCoursePayload) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
  defaultGroup?: string;
};

export default function AddCourseModal({
  isOpen,
  onOpenChange,
  onSubmit,
  loading = false,
  error = null,
  defaultGroup = "GP01",
}: Props) {
  const initial: TAddCoursePayload = useMemo(
    () => ({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: defaultGroup,
      ngayTao: formatDDMMYYYY(new Date()),
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: getTaiKhoanFromUserDataCookie(),
    }),
    [defaultGroup],
  );

  const [form, setForm] = useState<TAddCoursePayload>(initial);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm(initial);
      setSubmitAttempted(false);
    }
  }, [isOpen, initial]);

  const set = (k: keyof TAddCoursePayload) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof TAddCoursePayload, string>> = {};
    if (!form.maKhoaHoc.trim()) e.maKhoaHoc = "Mã khóa học là bắt buộc";
    if (!form.biDanh.trim()) e.biDanh = "Bí danh là bắt buộc";
    if (!form.tenKhoaHoc.trim()) e.tenKhoaHoc = "Tên khóa học là bắt buộc";
    if (!form.moTa.trim()) e.moTa = "Mô tả là bắt buộc";
    if (!form.hinhAnh.trim()) e.hinhAnh = "Hình ảnh là bắt buộc";
    if (!form.maNhom.trim()) e.maNhom = "Mã nhóm là bắt buộc";
    if (!form.ngayTao.trim()) e.ngayTao = "Ngày tạo là bắt buộc";
    if (!form.maDanhMucKhoaHoc.trim())
      e.maDanhMucKhoaHoc = "Mã danh mục là bắt buộc";
    if (!form.taiKhoanNguoiTao.trim())
      e.taiKhoanNguoiTao = "Tài khoản người tạo là bắt buộc";
    return e;
  }, [form]);

  const hasError = Object.values(errors).some(Boolean);
  const showError = (k: keyof TAddCoursePayload) =>
    submitAttempted && !!errors[k];

  const handleSubmit = async () => {
    if (loading) return;
    setSubmitAttempted(true);
    if (hasError) return;

    // numbers đảm bảo là number
    await onSubmit({
      ...form,
      luotXem: Number(form.luotXem) || 0,
      danhGia: Number(form.danhGia) || 0,
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg" size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Course
              <span className="text-sm font-normal text-default-500">
                Nhập thông tin theo schema API
              </span>
            </ModalHeader>

            <ModalBody className="py-6">
              {submitAttempted && hasError ? (
                <p className="mb-3 text-sm text-danger-500">
                  Vui lòng kiểm tra các trường bôi đỏ trước khi tạo khóa học.
                </p>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Mã khóa học"
                  value={form.maKhoaHoc}
                  onValueChange={set("maKhoaHoc")}
                  isRequired
                  isInvalid={showError("maKhoaHoc")}
                  errorMessage={showError("maKhoaHoc") ? errors.maKhoaHoc : ""}
                />

                <Input
                  label="Bí danh"
                  value={form.biDanh}
                  onValueChange={set("biDanh")}
                  isRequired
                  isInvalid={showError("biDanh")}
                  errorMessage={showError("biDanh") ? errors.biDanh : ""}
                />

                <Input
                  className="md:col-span-2"
                  label="Tên khóa học"
                  value={form.tenKhoaHoc}
                  onValueChange={set("tenKhoaHoc")}
                  isRequired
                  isInvalid={showError("tenKhoaHoc")}
                  errorMessage={
                    showError("tenKhoaHoc") ? errors.tenKhoaHoc : ""
                  }
                />

                <Input
                  className="md:col-span-2"
                  label="Mô tả"
                  value={form.moTa}
                  onValueChange={set("moTa")}
                  isRequired
                  isInvalid={showError("moTa")}
                  errorMessage={showError("moTa") ? errors.moTa : ""}
                />

                <Input
                  label="Lượt xem"
                  value={String(form.luotXem)}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, luotXem: Number(v) || 0 }))
                  }
                />

                <Input
                  label="Đánh giá"
                  value={String(form.danhGia)}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, danhGia: Number(v) || 0 }))
                  }
                />

                <Input
                  className="md:col-span-2"
                  label="Hình ảnh (URL)"
                  value={form.hinhAnh}
                  onValueChange={set("hinhAnh")}
                  isRequired
                  isInvalid={showError("hinhAnh")}
                  errorMessage={showError("hinhAnh") ? errors.hinhAnh : ""}
                />

                <Input
                  label="Mã nhóm"
                  value={form.maNhom}
                  onValueChange={set("maNhom")}
                  isRequired
                  isInvalid={showError("maNhom")}
                  errorMessage={showError("maNhom") ? errors.maNhom : ""}
                />

                <Input
                  label="Ngày tạo (dd/MM/yyyy)"
                  value={form.ngayTao}
                  onValueChange={set("ngayTao")}
                  isRequired
                  isInvalid={showError("ngayTao")}
                  errorMessage={showError("ngayTao") ? errors.ngayTao : ""}
                />

                <Input
                  label="Mã danh mục khóa học"
                  value={form.maDanhMucKhoaHoc}
                  onValueChange={set("maDanhMucKhoaHoc")}
                  isRequired
                  isInvalid={showError("maDanhMucKhoaHoc")}
                  errorMessage={
                    showError("maDanhMucKhoaHoc") ? errors.maDanhMucKhoaHoc : ""
                  }
                />

                <Input
                  label="Tài khoản người tạo"
                  value={form.taiKhoanNguoiTao}
                  onValueChange={set("taiKhoanNguoiTao")}
                  isRequired
                  isInvalid={showError("taiKhoanNguoiTao")}
                  errorMessage={
                    showError("taiKhoanNguoiTao") ? errors.taiKhoanNguoiTao : ""
                  }
                />
              </div>

              {error ? (
                <p className="mt-3 text-sm text-danger-500">{error}</p>
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={loading}
                onPress={handleSubmit}
              >
                Create course
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
