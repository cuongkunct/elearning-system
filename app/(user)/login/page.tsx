"use client";
import React, { useState } from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import NotificationModal from "../../../components/user/shared/NotificationModal";

import { DispatchType } from "@/store";
import { loginUser } from "@/store/user/auth/auth.slice";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<DispatchType>();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form
      className="
        w-[400px]
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
        let data: any = JSON.parse(
          JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
        );

        try {
          const res = await dispatch(loginUser(data)).unwrap();

          if (res.statusCode === 200) {
            addToast({
              title: "Login Successful",
              description: "You have login successfully.",
              color: "success",
            });
            router.push("/");
          }
        } catch (err: any) {
          setOpen(true);
          setErr(err.content);
        }
      }}
    >
      <h1 className="text-2xl font-semibold text-center  uppercase">
        Login Account
      </h1>

      <Input
        isRequired
        errorMessage="Please enter a valid username"
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
        label="Password"
        labelPlacement="outside"
        name="matKhau"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
      />
      <NotificationModal
        color={err ? "danger" : "success"}
        isOpen={open}
        title={err ?? "Registration Failed"}
        onClose={() => setOpen(false)}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
}
