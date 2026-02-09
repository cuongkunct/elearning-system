import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const CYBERSOFT_TOKEN = process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT;

// 🎯 Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(CYBERSOFT_TOKEN);
    config.headers.set("TokenCybersoft", CYBERSOFT_TOKEN);

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosInstance;
