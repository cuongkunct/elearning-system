"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast, Form } from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import { User2Icon } from "lucide-react";
import { EditIcon } from "@/components/icons";

import { useDispatch, useSelector } from "react-redux";
import { RootState, DispatchType } from "@/store";
import { updateUserProfile } from "@/store/user/profile/profile.slice";


type Props = {
  userSession?: string
  onUpdate?: () => void;
};

export default function Profile({ userSession, onUpdate }: Props) {
  const dispatch = useDispatch<DispatchType>();
  const profileState = useSelector((state: RootState) => state.userProfile.profile);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
    matKhau: "",
    maNhom: "",
    maLoaiNguoiDung: "",
  });


  const userDataMemo = useMemo(() => profileState.data, [profileState.data]);


  useEffect(() => {
    if (!userDataMemo) return;

    setFormData({
      taiKhoan: userDataMemo.taiKhoan || "",
      hoTen: userDataMemo.hoTen || "",
      email: userDataMemo.email || "",
      soDT: userDataMemo.soDT || "",
      matKhau: userDataMemo.matKhau || "",
      maNhom: userDataMemo.maNhom || "",
      maLoaiNguoiDung: userDataMemo.maLoaiNguoiDung || "",
    });
  }, [userDataMemo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userSession) {
      addToast({
        title: "Unauthorized",
        description: "No access token found",
        color: "danger",
      });
      return;
    }

    try {
      await dispatch(
        updateUserProfile({ data: formData, token: userSession })
      ).unwrap();

      addToast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        color: "success",
      });

      setIsEdit(false);
      onUpdate?.();
    } catch (err: any) {
      addToast({
        title: "Error updating profile",
        description: err?.message || err,
        color: "danger",
      });
    }
  };

  return (
    <section className="w-full mx-auto px-6">
      <div className="flex items-center justify-start gap-4 my-4">
        <User2Icon />
        <h2 className="text-3xl font-bold ">Your profile</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Form
          className="md:col-span-4 flex flex-col gap-8 p-10 rounded-2xl  min-h-screen"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              isReadOnly
              label="Username"
              name="taiKhoan"
              value={formData.taiKhoan}
            />
            <Input
              endContent={isEdit ? <EditIcon /> : null}
              isReadOnly={!isEdit}
              label="Password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
            />
            <Input
              isReadOnly
              label="Group"
              name="maNhom"
              value={formData.maNhom}
            />
            <Input
              isReadOnly
              label="User type"
              name="maLoaiNguoiDung"
              value={formData.maLoaiNguoiDung}
            />
            <Input
              endContent={isEdit ? <EditIcon /> : null}
              isReadOnly={!isEdit}
              label="Full name"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
            />
            <Input
              endContent={isEdit ? <EditIcon /> : null}
              isReadOnly={!isEdit}
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              endContent={isEdit ? <EditIcon /> : null}
              isReadOnly={!isEdit}
              label="Phone"
              name="soDT"
              value={formData.soDT}
              onChange={handleChange}
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
    </section>
  );
}
