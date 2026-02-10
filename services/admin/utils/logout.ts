// src/services/admin/utils/logout.ts
export function clearAuthStorage() {
  // localStorage keys (tuỳ bạn đang dùng key nào)
  const keysToRemove = [
    "USER_LOGIN",
    "ACCESS_TOKEN",
    "accessToken",
    "token",
    "user",
  ];

  try {
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}

  // sessionStorage nếu có
  try {
    keysToRemove.forEach((k) => sessionStorage.removeItem(k));
  } catch {}

  // cookie (cơ bản). Nếu bạn set cookie bằng server action/next-cookies thì cần xoá theo cách đó.
  // Ở client, cách phổ biến là set Max-Age=0
  try {
    document.cookie = `accessToken=; Max-Age=0; path=/`;
    document.cookie = `USER_LOGIN=; Max-Age=0; path=/`;
  } catch {}
}
