// types/admin/navbar.type.ts

/** Các action mà Navbar có thể bắn ra */
export type AdminActionKey =
  | "add_user"
  | "add_course"
  | "add_blog";

/** Object action để render nút */
export type AdminAction = {
  key: AdminActionKey;
  label: string;
};

export type AdminNavItem = {
  label: string;
  href: string;
  action?: AdminAction; 
};

/** Props dùng cho Navbar (chỉ phần shared) */
export type NavbarProps = {
  onActionClick?: (key: AdminActionKey) => void;
};
