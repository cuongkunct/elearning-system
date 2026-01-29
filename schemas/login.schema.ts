import { z } from "zod";
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");
export const loginSchema = z.object({
  taiKhoan: z.string().min(6, "Username must be at least 6 characters"),
  matKhau: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
