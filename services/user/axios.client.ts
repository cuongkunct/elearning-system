import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: process.env.NEXT_TOKEN_CYBERSOFT,
  },
  withCredentials: true, //Tự động gửi cookie trên client
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosClient;
