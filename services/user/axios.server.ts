import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const axiosServer: AxiosInstance = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: process.env.NEXT_TOKEN_CYBERSOFT,
  },
});

axiosServer.interceptors.request.use(async (config) => {
  return config;
});

axiosServer.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosServer;
