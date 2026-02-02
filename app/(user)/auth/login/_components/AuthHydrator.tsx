"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoginData } from "@/store/user/auth/auth.slice";

export function AuthHydrator({
  cookieSession,
  role,
  children,
}: {
  cookieSession?: string;
  role?: string;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookieSession && role) {
      dispatch(setLoginData({ accessToken: cookieSession, role }));
    }
  }, [cookieSession, role, dispatch]);

  return <>{children}</>;
}
