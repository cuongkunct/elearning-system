import { AxiosError } from "axios";

export type ApiResponse<T> = {
  statusCode: number;
  message: string | AxiosError<any>;
  content: T;
};

export type ApiError = {
  statusCode: number;
  message: string;
};
