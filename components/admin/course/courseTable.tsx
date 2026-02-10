import type { TCourse } from "@/types/admin/course/course.type";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { EditIcon, DeleteIcon } from "@/components/admin/icon";

interface CourseTableProps {
  data: TCourse[];
  onEdit?: (course: TCourse) => void;
  onDelete?: (course: TCourse) => void;
  onUpload?: (course: TCourse, file: File) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  data,
  onEdit,
  onDelete,
  onUpload, // ✅ FIX: destructure
}) => {
  return (
    <Table
      removeWrapper
      aria-label="Course data table"
      classNames={{
        table: "w-full",
        th: "bg-[#F9F9F9] border-b border-[#F9F9F9] text-sm font-medium",
        td: "border-b border-[#F9F9F9] text-sm",
        tr: "hover:bg-default-50",
      }}
    >
      <TableHeader>
        <TableColumn key="maKhoaHoc">Mã</TableColumn>
        <TableColumn key="tenKhoaHoc">Tên khoá học</TableColumn>
        <TableColumn key="danhMuc">Danh mục</TableColumn>
        <TableColumn key="ngayTao">Ngày tạo</TableColumn>
        <TableColumn key="luotXem" align="end">
          Lượt xem
        </TableColumn>
        <TableColumn key="hocVien" align="end">
          Học viên
        </TableColumn>
        <TableColumn key="nguoiTao">Người tạo</TableColumn>
        <TableColumn key="action" align="center">
          Action
        </TableColumn>
      </TableHeader>

      <TableBody>
        {data.map((course) => {
          // ✅ FIX: tạo id riêng cho input của từng row
          const inputId = `upload-${course.maKhoaHoc || course.biDanh}`;

          return (
            <TableRow key={course.maKhoaHoc || course.biDanh}>
              <TableCell>{course.maKhoaHoc}</TableCell>
              <TableCell>{course.tenKhoaHoc}</TableCell>
              <TableCell>{course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</TableCell>
              <TableCell>{course.ngayTao}</TableCell>
              <TableCell className="text-right">{course.luotXem}</TableCell>
              <TableCell className="text-right">
                {course.soLuongHocVien}
              </TableCell>
              <TableCell>{course.nguoiTao?.hoTen}</TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {/* Edit */}
                  <button
                    aria-label={`Edit ${course.maKhoaHoc}`}
                    className="inline-flex items-center justify-center p-2 rounded-md text-default-400 hover:text-default-600 hover:bg-default-100 transition"
                    type="button"
                    onClick={() => {
                      console.log("✅ [CourseTable] EDIT CLICK:", {
                        maKhoaHoc: course.maKhoaHoc,
                        tenKhoaHoc: course.tenKhoaHoc,
                      });
                      onEdit?.(course);
                    }}
                  >
                    <EditIcon className="text-lg" />
                  </button>

                  {/* Delete */}
                  <button
                    aria-label={`Delete ${course.maKhoaHoc}`}
                    className="inline-flex items-center justify-center p-2 rounded-md text-danger-500 hover:text-danger-600 hover:bg-danger-50 transition"
                    type="button"
                    onClick={() => {
                      console.log("✅ [CourseTable] DELETE CLICK:", {
                        maKhoaHoc: course.maKhoaHoc,
                        tenKhoaHoc: course.tenKhoaHoc,
                      });
                      onDelete?.(course);
                    }}
                  >
                    <DeleteIcon className="text-lg" />
                  </button>

                  {/* Upload */}
                  <button
                    aria-label={`Upload image for ${course.maKhoaHoc}`}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-md text-primary hover:bg-primary-50 transition text-sm font-medium"
                    type="button"
                    onClick={() => {
                      console.log("✅ [CourseTable] UPLOAD CLICK:", {
                        maKhoaHoc: course.maKhoaHoc,
                        tenKhoaHoc: course.tenKhoaHoc,
                      });
                      const el = document.getElementById(
                        inputId,
                      ) as HTMLInputElement | null;

                      el?.click(); // ✅ mở file picker
                    }}
                  >
                    Upload
                  </button>

                  {/* input file (ẩn để UI đẹp) */}
                  <input
                    accept="image/*"
                    id={inputId}
                    style={{ display: "none" }} // ✅ dùng style thay vì className hidden cũng ok
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      console.log("✅ [CourseTable] FILE SELECTED:", {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                      });

                      onUpload?.(course, file);

                      // reset để chọn lại cùng file vẫn trigger
                      e.currentTarget.value = "";
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CourseTable;
