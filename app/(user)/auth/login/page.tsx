"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DispatchType } from "@/store";
import { loginUser } from "@/store/user/auth/auth.slice";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import NotificationModal from "@/components/user/shared/NotificationModal";
import { setLoginData } from "@/store/user/auth/auth.slice";
import { showToast } from "@/utils/toast";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<DispatchType>();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<any>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();

      if (res.statusCode === 200) {
        showToast({
          title: "Login Successful",
          description: "You have login successfully.",
          type: "success",
        });
        if (res.content.maLoaiNguoiDung === "GV") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        const resultFromServer = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(res?.content),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (res) => {
          if (!res.ok) {
            throw res;
          }

          return res.json();
        });

        dispatch(
          setLoginData({
            accessToken: resultFromServer?.res?.accessToken,
            role: resultFromServer?.res?.maLoaiNguoiDung,
          }),
        );
      }
    } catch (err: any) {
      setOpen(true);
      setErr(err.content);
    }
  };

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
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-semibold text-center  uppercase">
        Login Account
      </h1>

      <Input
        isRequired
        label="Username"
        labelPlacement="outside"
        {...register("taiKhoan")}
        errorMessage={errors.taiKhoan?.message}
        isInvalid={!!errors.taiKhoan}
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
        {...register("matKhau")}
        errorMessage={errors.matKhau?.message}
        isInvalid={!!errors.matKhau}
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
      />

      <NotificationModal
        color={err ? "danger" : "success"}
        isOpen={open}
        title={err?.content || err || "Login successful"}
        onClose={() => setOpen(false)}
      />

      <div className="flex gap-2">
        <Button color="primary" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
}
