"use client";
import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { loginUser } from "@/store/user/auth/auth.slice";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/store";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<DispatchType>();
  const [action, setAction] = React.useState<string | null>(null);

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
      onReset={() => setAction("reset")}
      onSubmit={async (e) => {
        e.preventDefault();
        let data: any = JSON.parse(
          JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))
        );
        console.log("User dtaa:", data);
        try {
          const res = await dispatch(loginUser(data)).unwrap();
          if (res.statusCode === 200) {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
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
        isRequired
        errorMessage="Please enter a valid password"
        label="Password"
        labelPlacement="outside"
        name="matKhau"
        placeholder="Enter your password"
        type="password"
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
