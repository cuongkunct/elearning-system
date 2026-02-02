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
import type {
  TCourse,
  TUpdateCoursePayload,
} from "@/types/admin/course/course.type";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  course: TCourse | null;

  loading?: boolean;
  error?: string | null;
  onSubmit: (payload: TUpdateCoursePayload) => Promise<void> | void;
};

export default function EditCourseModal({
  isOpen,
  onOpenChange,
  course,
  loading = false,
  error = null,
  onSubmit,
}: Props) {
  const initial: TUpdateCoursePayload = useMemo(() => {
    return {
      maKhoaHoc: course?.maKhoaHoc || "",
      biDanh: course?.biDanh || "",
      tenKhoaHoc: course?.tenKhoaHoc || "",
      moTa: course?.moTa || "",
      luotXem: Number(course?.luotXem ?? 0),
      danhGia: Number((course as any)?.danhGia ?? 0), // list có thể không có
      hinhAnh: course?.hinhAnh || "",
      maNhom: (course as any)?.maNhom || "GP01",
      ngayTao: course?.ngayTao || "",
      maDanhMucKhoaHoc: course?.danhMucKhoaHoc?.maDanhMucKhoahoc || "",
      taiKhoanNguoiTao: course?.nguoiTao?.taiKhoan || "",
    };
  }, [course]);

  const [form, setForm] = useState<TUpdateCoursePayload>(initial);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initial);
      setSubmitAttempted(false);
    }
  }, [isOpen, initial]);

  const set = (k: keyof TUpdateCoursePayload) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof TUpdateCoursePayload, string>> = {};
    // if (!form.maKhoaHoc.trim()) e.maKhoaHoc = "Mã khóa học là bắt buộc";
    if (!form.tenKhoaHoc.trim()) e.tenKhoaHoc = "Tên khóa học là bắt buộc";
    if (!form.biDanh.trim()) e.biDanh = "Bí danh là bắt buộc";
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
  const showError = (k: keyof TUpdateCoursePayload) =>
    submitAttempted && !!errors[k];

  const handleSubmit = async () => {
    if (loading) return;
    setSubmitAttempted(true);
    if (hasError) return;

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
              Edit Course
              <span className="text-sm font-normal text-default-500">
                Cập nhật thông tin khóa học
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
                  label="Mã khóa học"
                  value={form.maKhoaHoc}
                  isDisabled
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
                  label="Ngày tạo"
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
                Update course
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
