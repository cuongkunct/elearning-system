"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar, Card } from "@heroui/react";
import { EditIcon } from "@/components/icons";
import { fetchUserProfile, fetchUpdateUserProfile } from "@/services/user/userAccount/user.service";

export default function ProfilePage() {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
    matKhau: "",
    maNhom: "",
    maLoaiNguoiDung: "",
  });

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const response = await fetchUserProfile();
        if (response) {
          setUserInfo(response);
        }
      }
      getUserProfile();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    setFormData({
      taiKhoan: userInfo.taiKhoan || "",
      hoTen: userInfo.hoTen || "",
      email: userInfo.email || "",
      soDT: userInfo.soDT || "",
      matKhau: userInfo.matKhau || "",
      maNhom: userInfo.maNhom || "",
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung || "",
    });
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchUpdateUserProfile({ data: formData });
    if (res) {
      const response = await fetchUserProfile();
      if (response) {
        setUserInfo(response);
        setIsEdit(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="md:col-span-1 p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <Avatar name={userInfo?.hoTen} className="w-24 h-24" />
            <div className="text-center">
              <p className="font-semibold">{userInfo?.hoTen}</p>
              <p className="text-sm text-gray-500">{userInfo?.email}</p>
            </div>
            <div className="w-full text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Username:</span>{" "}
                {userInfo?.taiKhoan}
              </p>
              <p>
                <span className="font-medium">Group:</span> {userInfo?.maNhom}
              </p>
              <p>
                <span className="font-medium">Role:</span>{" "}
                {userInfo?.maLoaiNguoiDung}
              </p>
            </div>
          </div>
        </Card>
        <Form
          className="md:col-span-4 flex flex-col gap-8 rounded-2xl p-10 shadow-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold uppercase">
            Profile Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Username"
              name="taiKhoan"
              value={formData.taiKhoan}
              isReadOnly
            />
            <Input
              label="Password"
              name="matKhau"
              value={formData.matKhau}
              isReadOnly={!isEdit}
              onChange={handleChange}
              endContent={isEdit ? <EditIcon /> : null}
            />
            <Input
              label="Group"
              name="maNhom"
              value={formData.maNhom}
              isReadOnly
            />
            <Input
              label="User type"
              name="maLoaiNguoiDung"
              value={formData.maLoaiNguoiDung}
              isReadOnly
            />
            <Input
              label="Full name"
              name="hoTen"
              value={formData.hoTen}
              isReadOnly={!isEdit}
              onChange={handleChange}
              endContent={isEdit ? <EditIcon /> : null}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              isReadOnly={!isEdit}
              onChange={handleChange}
              endContent={isEdit ? <EditIcon /> : null}
            />
            <Input
              label="Phone"
              name="soDT"
              value={formData.soDT}
              isReadOnly={!isEdit}
              onChange={handleChange}
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
