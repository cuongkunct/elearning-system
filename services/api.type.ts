export type ApiResponse<T> = {
  statusCode: number;
  content: T;
};

export type ApiError = {
  statusCode: number;
  content: string;
};
