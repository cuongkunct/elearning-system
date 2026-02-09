import axios, { type InternalAxiosRequestConfig } from "axios";

const TOKEN_CYBERSOFT =
  process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTMiLCJIZXRIYW5TdHJpbmciOiIxOC8wNi8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODE3NDA4MDAwMDAiLCJuYmYiOjE3NjI4ODA0MDAsImV4cCI6MTc4MTg4ODQwMH0.DYatRVH7r1q5E_487BJ23mwTOYDycKumjaNeO7NmC04";

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
