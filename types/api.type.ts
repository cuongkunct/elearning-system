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

export type initState<T> = {
  loading: boolean;
  data: T | null;
  error: AxiosError<any> | null;
};
