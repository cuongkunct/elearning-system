import axios, { type InternalAxiosRequestConfig } from "axios";

const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT || "";

export const publicApi = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
});

publicApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (TOKEN_CYBERSOFT) config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;
    return config;
  },
  (error) => Promise.reject(error),
);
