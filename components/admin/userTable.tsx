import React from "react";
import { TUser } from "./../../types/admin/user.type";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { EditIcon, DeleteIcon } from "./icon";

interface UserTableProps {
  data: TUser[];
  onEdit?: (user: TUser) => void; // ✅ ADDED
  onDelete?: (user: TUser) => void; // ✅ ADDED
}

const UserTable: React.FC<UserTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <Table
      aria-label="User data table"
      removeWrapper
      classNames={{
        table: "w-full",
        th: "bg-[#F9F9F9] border-b border-[#F9F9F9] text-sm font-medium",
        td: "border-b border-[#F9F9F9] text-sm",
        tr: "hover:bg-default-50",
      }}
    >
      <TableHeader>
        <TableColumn key="taiKhoan">Tài Khoản</TableColumn>
        <TableColumn key="hoTen">Họ Tên</TableColumn>
        <TableColumn key="soDT">Số Điện Thoại</TableColumn>
        <TableColumn key="email">Email</TableColumn>
        <TableColumn key="tenLoaiNguoiDung">Loại Người Dùng</TableColumn>
        <TableColumn key="action" align="center">
          Action
        </TableColumn>
      </TableHeader>

      <TableBody>
        {data.map((user) => (
          <TableRow key={user.taiKhoan}>
            <TableCell>{user.taiKhoan}</TableCell>
            <TableCell>{user.hoTen}</TableCell>
            <TableCell>{user.soDT}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.tenLoaiNguoiDung}</TableCell>

            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onEdit?.(user)} // ✅ ADDED
                  className="inline-flex items-center justify-center p-2 rounded-md text-default-400 hover:text-default-600 hover:bg-default-100 transition"
                  aria-label={`Edit ${user.taiKhoan}`}
                >
                  <EditIcon className="text-lg" />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete?.(user)} // ✅ ADDED
                  className="inline-flex items-center justify-center p-2 rounded-md text-danger-500 hover:text-danger-600 hover:bg-danger-50 transition"
                  aria-label={`Delete ${user.taiKhoan}`}
                >
                  <DeleteIcon className="text-lg" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
