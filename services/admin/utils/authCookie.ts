// src/utils/authStorage.ts

/**
 * Lấy accessToken từ Local Storage với key 'sessionToken'
 */
export function getAccessTokenFromStorage(): string | null {
  // Kiểm tra xem có đang ở môi trường trình duyệt không (tránh lỗi SSR trong Next.js)
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("sessionToken");

    if (!raw) return null;

    // 1. Nếu lưu trực tiếp chuỗi token (thường bắt đầu bằng eyJ...)
    if (raw.startsWith("eyJ")) {
      return raw;
    }

    // 2. Nếu lỡ lưu dưới dạng JSON object
    try {
      const obj = JSON.parse(raw);
      const token = obj?.accessToken || obj?.content?.accessToken || obj?.token;

      if (typeof token === "string") return token;
    } catch {
      // Nếu không phải JSON thì trả về raw luôn (nếu nó thỏa mãn độ dài token)
      return raw.length > 20 ? raw : null;
    }
  } catch (error) {
    console.error("Lỗi khi truy cập LocalStorage:", error);

    return null;
  }

  return null;
}
