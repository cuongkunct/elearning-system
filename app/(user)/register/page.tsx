"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import NotificationModal from "../../../components/user/shared/NotificationModal";

import { DispatchType } from "@/store";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { RegisterFormData, registerSchema } from "@/schemas/register.schema";
import { registerUser } from "@/store/user/auth/auth.slice";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch<DispatchType>();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      maNhom: "GP01",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();

      if (res.statusCode === 200) {
        setErr(null);
        setOpen(true);
      }
    } catch (err: any) {
      console.log("Vào đây làm gì ");
      setErr(err.content || "Register failed");
      setOpen(true);
    }
  };

  return (
    <Form
      className="
          w-[700px]
          flex flex-col gap-4
          justify-center
          items-center
          rounded-2xl
          py-10
          shadow-2xl
          border border-gray-200
          "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-semibold text-center  uppercase">
        Register Account
      </h1>
      {/* ===== Grid 2 columns ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-8">
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          placeholder="Enter your username"
          type="text"
          {...register("taiKhoan")}
          errorMessage={errors.taiKhoan?.message}
          isInvalid={!!errors.taiKhoan}
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
          className="w-full"
          errorMessage={errors.matKhau?.message}
          isInvalid={!!errors.matKhau}
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
        />

        <Input
          isRequired
          label="Full Name"
          labelPlacement="outside"
          {...register("hoTen")}
          errorMessage={errors.hoTen?.message}
          isInvalid={!!errors.hoTen}
          placeholder="Enter your full name"
          type="text"
        />

        <Input
          isRequired
          label="Phone Number"
          labelPlacement="outside"
          {...register("soDT")}
          errorMessage={errors.soDT?.message}
          isInvalid={!!errors.soDT}
          placeholder="Enter your phone number"
          type="tel"
        />

        <Input
          disabled
          isRequired
          label="Group Code"
          labelPlacement="outside"
          placeholder="Enter your group code"
          type="text"
          value={"GP01"}
        />

        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          placeholder="Enter your email"
          type="email"
        />
      </div>
      <NotificationModal
        color={err ? "danger" : "success"}
        isOpen={open}
        title={err ?? "Register successfully"}
        onClose={() => {
          setOpen(false);
          router.push("/login");
        }}
      />
      {/* ===== Actions ===== */}
      <div className="flex justify-end gap-3">
        <Button type="reset" variant="flat">
          Reset
        </Button>
        <Button color="primary" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
