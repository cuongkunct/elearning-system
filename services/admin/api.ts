import axios, { type InternalAxiosRequestConfig } from "axios";
import { getAccessTokenFromCookie } from "./utils/authCookie";

const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT || "";

export const api = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api", // bỏ "/" cuối để tránh //...
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (TOKEN_CYBERSOFT) config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;

    const accessToken = getAccessTokenFromCookie();
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);
