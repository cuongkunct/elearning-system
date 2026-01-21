"use client";

import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create();

axiosClient.interceptors.request.use((config) => {
  const userData = Cookies.get("userData");
  if (userData) {
    const { accessToken } = JSON.parse(userData).content;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  config.headers.TokenCybersoft = process.env.NEXT_TOKEN_CYBERSOFT;
  return config;
});
