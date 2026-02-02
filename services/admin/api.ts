import axios, { type InternalAxiosRequestConfig } from "axios";
import { getAccessTokenFromCookie } from "./utils/authCookie";

const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT || "";

const withBearer = (token: string) => {
  const t = token.trim();
  return t.toLowerCase().startsWith("bearer ") ? t : `Bearer ${t}`;
};

const mask = (v?: string | null, head = 10, tail = 6) => {
  if (!v) return null;
  if (v.length <= head + tail) return `${v.slice(0, 4)}…`;
  return `${v.slice(0, head)}…${v.slice(-tail)}`;
};

export const api = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = getAccessTokenFromCookie();
    if (TOKEN_CYBERSOFT) config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;
    if (accessToken) config.headers["Authorization"] = withBearer(accessToken);

    // ✅ match swagger/curl
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json-patch+json";

    // console.groupCollapsed("🔎 [API REQUEST]");
    // console.log("URL:", `${config.baseURL}${config.url}`);
    // console.log("METHOD:", config.method?.toUpperCase());
    // console.log("DATA:", config.data);
    // console.log("hasAccessToken:", !!accessToken);
    // console.log(
    //   "Authorization:",
    //   accessToken ? `Bearer ${mask(accessToken)}` : null,
    // );
    // console.log("hasTokenCybersoft:", !!TOKEN_CYBERSOFT);
    // console.log(
    //   "TokenCybersoft:",
    //   TOKEN_CYBERSOFT ? mask(TOKEN_CYBERSOFT, 6, 0) : null,
    // );
    // console.groupEnd();

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // console.groupCollapsed("❌ [API ERROR]");
    // console.log("STATUS:", error?.response?.status);
    // console.log("RESPONSE DATA:", error?.response?.data);
    // console.log("REQUEST URL:", error?.config?.url);
    // console.log("SENT HEADERS:", {
    //   Authorization: error?.config?.headers?.Authorization
    //     ? `Bearer ${mask(String(error.config.headers.Authorization).replace(/^Bearer\s+/i, ""))}`
    //     : null,
    //   TokenCybersoft: error?.config?.headers?.TokenCybersoft
    //     ? mask(String(error.config.headers.TokenCybersoft), 6, 0)
    //     : null,
    //   "Content-Type":
    //     error?.config?.headers?.["Content-Type"] ||
    //     error?.config?.headers?.["content-type"],
    // });
    // console.groupEnd();
    return Promise.reject(error);
  },
);
