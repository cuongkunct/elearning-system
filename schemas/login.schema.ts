import { z } from "zod";
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");
// .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter");
// .regex(
//   /[!@#$%^&*(),.?":{}|<>]/,
//   "Password must contain at least 1 special character",
// )
// .regex(/[0-9]/, "Password must contain at least 1 number");

export const loginSchema = z.object({
  taiKhoan: z.string().min(6, "Username must be at least 6 characters"),
  matKhau: passwordSchema,
});
// Chỗ này validate comfirm password
//   .refine((data) => data.matKhau === data.matKhauXacNhan, {
//     message: "Passwords do not match",
//     path: ["matKhauXacNhan"],
//   });

export type LoginFormData = z.infer<typeof loginSchema>;
