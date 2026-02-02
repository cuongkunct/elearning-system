import type { AxiosError } from "axios";

export type SerializableApiError = {
  status?: number;
  message: string;
  raw?: any;
};

function stripLeadingStatus(message: string) {
  // remove "(500) " / "(401)" ở đầu chuỗi
  return message.replace(/^\(\d{3}\)\s*/g, "").trim();
}

export function toSerializableApiError(err: unknown): SerializableApiError {
  const e = err as AxiosError<any>;
  const status = e?.response?.status;
  const data = e?.response?.data;

  let message = "Request failed";

  // Case 1: server trả text/plain -> response.data là string
  if (typeof data === "string") {
    message = stripLeadingStatus(data);
    console.log("message from string data:", message);
  } else {
    // Case 2: server trả object json
    const m = data?.content || data?.message || e?.message || "Request failed";
    message = typeof m === "string" ? stripLeadingStatus(m) : JSON.stringify(m);
    console.log("message from string data:", message);
  }

  return { status, message, raw: data };
}
