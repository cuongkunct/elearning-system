"use client";
import React, { useState } from "react";
import { Form, Input, Button, useDisclosure } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "@/store";
import { registerUser } from "@/store/user/auth/auth.slice";
import { useRouter } from "next/navigation";
import NotificationModal from "../../../components/user/shared/NotificationModal";
import { addToast, ToastProvider } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch<DispatchType>();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Form
      className="
            w-[600px]
        mx-auto
    flex flex-col gap-8
    justify-center
    items-center
    rounded-2xl
    p-10
    shadow-2xl
    border border-gray-200
  "
      onSubmit={async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
          const res = await dispatch(
            registerUser(JSON.parse(JSON.stringify(data))),
          ).unwrap();
          console.log("Register successful:", res);
          if (res.statusCode === 200) {
            setOpen(true);
            setErr("Register successful");
            addToast({
              title: "Registration Successful",
              description: "You have registered successfully.",
              color: "success",
            });
            router.push("/login");
          }
        } catch (err: any) {
          setOpen(true);
          setErr(err.content);
        }
      }}
    >
      <h1 className="text-2xl font-semibold text-center  uppercase">
        Register Account
      </h1>
      {/* ===== Grid 2 columns ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          name="taiKhoan"
          placeholder="Enter your username"
          type="text"
        />

        <Input
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          name="matKhau"
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
        />

        <Input
          isRequired
          label="Full Name"
          labelPlacement="outside"
          name="hoTen"
          placeholder="Enter your full name"
          type="text"
        />

        <Input
          isRequired
          label="Phone Number"
          labelPlacement="outside"
          name="soDT"
          placeholder="Enter your phone number"
          type="tel"
        />

        <Input
          isRequired
          label="Group Code"
          labelPlacement="outside"
          value={"GP01"}
          name="maNhom"
          placeholder="Enter your group code"
          type="text"
        />

        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
      </div>
      <NotificationModal
        title={err ?? "Registration Failed"}
        color={err ? "danger" : "success"}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      {/* ===== Actions ===== */}
      <div className="flex justify-end gap-3">
        <Button type="reset" variant="flat">
          Reset
        </Button>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
