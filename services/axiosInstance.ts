import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
//. env
const CYBERSOFT_TOKEN: string =
  process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📤 Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.set("TokenCybersoft", CYBERSOFT_TOKEN);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 📥 Response interceptor
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => {
    return response.data;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
