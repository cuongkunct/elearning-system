import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// 🔑 Token Cybersoft
const CYBERSOFT_TOKEN: string =
  process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTMiLCJIZXRIYW5TdHJpbmciOiIxOC8wNi8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODE3NDA4MDAwMDAiLCJuYmYiOjE3NjI4ODA0MDAsImV4cCI6MTc4MTg4ODQwMH0.DYatRVH7r1q5E_487BJ23mwTOYDycKumjaNeO7NmC04";

// 🎯 Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// 📤 Request interceptor
// =======================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.set("TokenCybersoft", CYBERSOFT_TOKEN);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// =======================
// 📥 Response interceptor
// =======================
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // ✅ LUÔN return AxiosResponse
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
