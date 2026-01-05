import { AxiosError } from "axios";

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type ApiError = {
  statusCode: number;
  message: string | AxiosError;
};
