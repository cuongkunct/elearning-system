"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const userData = localStorage.getItem("userData");
  if (!userData) {
    router.replace("/login");
  }
  return <>{children}</>;
}
