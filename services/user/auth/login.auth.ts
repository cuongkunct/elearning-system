import axios from "axios";
import { UserLogin } from "@/types/user.type";

export const loginAuth = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/api/auth/login", {
      taiKhoan: credentials.username,
      matKhau: credentials.password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
