import axios from "axios";

export const axiosServer = axios.create();

axiosServer.interceptors.request.use((config) => {
  config.headers.TokenCybersoft = process.env.NEXT_TOKEN_CYBERSOFT;
  return config;
});
