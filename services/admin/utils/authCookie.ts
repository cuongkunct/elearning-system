// src/utils/authCookie.ts
type AnyObj = Record<string, any>;

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;
  return match.substring(name.length + 1);
}

function safeJsonParse(input: string): AnyObj | null {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

/**
 * Hỗ trợ nhiều kiểu cookie:
 * 1) cookie lưu JSON cả object response (như bạn đưa) => { content: { accessToken: "..." } }
 * 2) cookie lưu JSON user => { accessToken: "..." }
 * 3) cookie lưu trực tiếp accessToken => "eyJhbGciOi..."
 * 4) cookie bị encodeURIComponent
 */
export function getAccessTokenFromCookie(
  cookieNames: string[] = [
    "userData",
    "user",
    "auth",
    "currentUser",
    "token",
    "accessToken",
  ],
): string | null {
  for (const name of cookieNames) {
    const raw = getCookieValue(name);
    if (!raw) continue;

    // thử decode
    const decoded = (() => {
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    })();

    // case: cookie là token trực tiếp
    if (decoded.startsWith("eyJ")) return decoded;

    // case: cookie là JSON
    const obj = safeJsonParse(decoded);
    if (!obj) continue;

    // hỗ trợ format bạn đưa: { statusCode, content: { accessToken } }
    const token =
      obj?.content?.accessToken ||
      obj?.accessToken ||
      obj?.token ||
      obj?.content?.token;

    if (typeof token === "string" && token.length > 20) return token;
  }

  return null;
}
