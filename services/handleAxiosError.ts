import { AxiosError } from "axios";

import { ApiError } from "./api.type";

export const handleAxiosError = (error: unknown): ApiError => {
  const err = error as AxiosError<any>;

  return {
    statusCode: err.response?.status || 500,
    content: err.response?.data?.message || err || "Something went wrong",
  };
};
