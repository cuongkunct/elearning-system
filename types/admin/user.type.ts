/**
 * 1) TUser (Type Alias)
 * "Type Alias" = đặt tên cho một kiểu dữ liệu.
 *
 * TUser mô tả CHÍNH XÁC shape (cấu trúc) của 1 user nằm trong mảng `items`.
 */

export type TUser = {
  taiKhoan: string;
  hoTen: string;
  soDT: string | null; // có thể null / "" theo data bạn gửi
  maNhom: string | null;
  email: string;
  maLoaiNguoiDung: "HV" | "GV" | string; // mở rộng nếu API có loại khác
  tenLoaiNguoiDung: string;
};

/**
 * 2) TPaginationResponse<T> (Generic Type)
 *
 * <T> gọi là **Generic Type Parameter** (tham số kiểu tổng quát).
 *
 * Ý nghĩa:
 * - Đây là 1 "khuôn" response phân trang.
 * - "items" có thể là danh sách user, hoặc danh sách course, hoặc bất kỳ entity nào.
 * - Khi dùng: TPaginationResponse<TUser> => items sẽ là TUser[]
 *
 * Vì sao cần generic?
 * - Để tái sử dụng: cùng 1 format phân trang, chỉ thay kiểu item.
 */

export type TPaginationResponse<T> = {
  currentPage: number; // trang hiện tại
  count: number; // số phần tử mỗi trang (pageSize)
  totalPages: number; // tổng số trang
  totalCount: number; // tổng số record
  items: T[]; // danh sách item của trang đó (T là kiểu bạn truyền vào)
};

/**
 * 3) TGetUsersQuery (Type Alias cho query params)
 *
 * Đây là kiểu dữ liệu cho "đầu vào" khi bạn gọi API phân trang:
 * VD: page=1, pageSize=10, tuKhoa="abc", maNhom="GP01"
 *
 * Dùng `?` nghĩa là Optional (không bắt buộc):
 * - vì có thể bạn gọi API với chỉ page/pageSize
 * - hoặc có lúc chưa search nên tuKhoa không cần gửi
 */
export type TGetUsersQuery = {
  page?: number; // currentPage
  pageSize?: number; // count
  tuKhoa?: string; // nếu API hỗ trợ search
  maNhom?: string; // nếu API cần group
};
