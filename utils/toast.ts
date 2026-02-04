import { addToast } from "@heroui/react";

export type ToastType = "success" | "danger" | "warning" | "default";

interface ToastProps {
  title: string;
  description?: string | any;
  type?: ToastType;
}

export function showToast({ title, description, type = "default" }: ToastProps) {
  let desc: string | undefined;

  if (!description) {
    desc = undefined;
  } else if (typeof description === "string") {
    desc = description;
  } else if ("message" in description) {
    desc = description.message;
  } else if ("content" in description) {
    desc = description.content;
  } else {
    try {
      desc = JSON.stringify(description);
    } catch {
      desc = String(description);
    }
  }

  addToast({
    title,
    description: desc,
    color: type,
  });
}
