"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar, Card } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "@/store";
import { EditIcon } from "@/components/icons";

export default function ProfilePage() {
  const dispatch = useDispatch<DispatchType>();
  const user = useSelector((state: RootState) => state.auth.loginData?.content);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
    maNhom: "",
    maLoaiNguoiDung: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        taiKhoan: user.taiKhoan,
        hoTen: user.hoTen,
        email: user.email,
        soDT: user.soDT,
        maNhom: user.maNhom,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
      });
    }
  }, [user]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      // dispatch(updateUser(formData))
      setIsEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="md:col-span-1 p-6 rounded-2xl shadow">
          <div className="flex flex-col items-center gap-4">
            <Avatar name={formData.hoTen} className="w-24 h-24" />
            <div className="text-center">
              <p className="font-semibold">{formData.hoTen}</p>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
            <div className="w-full text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Username:</span>{" "}
                {formData.taiKhoan}
              </p>
              <p>
                <span className="font-medium">Group:</span> {formData.maNhom}
              </p>
              <p>
                <span className="font-medium">Role:</span>{" "}
                {formData.maLoaiNguoiDung}
              </p>
            </div>
          </div>
        </Card>

        <Form
          className="md:col-span-4 flex flex-col gap-8 rounded-2xl p-10 shadow-xl border"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold uppercase">
              Profile Information
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Username"
              value={formData.taiKhoan}
              color="danger"
              isReadOnly
            />
            <Input
              label="Group"
              color="danger"
              value={formData.maNhom}
              isReadOnly
            />
            <Input
              label="User type"
              color="danger"
              value={formData.maLoaiNguoiDung}
              isReadOnly
            />

            <Input
              label="Full name"
              value={formData.hoTen}
              isReadOnly={!isEdit}
              onChange={(e) => handleChange("hoTen", e.target.value)}
              endContent={isEdit ? <EditIcon /> : null}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              isReadOnly={!isEdit}
              onChange={(e) => handleChange("email", e.target.value)}
              endContent={isEdit ? <EditIcon /> : null}
            />
            <Input
              label="Phone"
              value={formData.soDT}
              isReadOnly={!isEdit}
              onChange={(e) => handleChange("soDT", e.target.value)}
              endContent={isEdit ? <EditIcon /> : null}
            />
          </div>
          {!isEdit ? (
            <Button
              color="primary"
              variant="flat"
              onPress={() => setIsEdit(true)}
            >
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="flat" onPress={() => setIsEdit(false)}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Save
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
