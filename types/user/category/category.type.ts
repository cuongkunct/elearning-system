export type Category = {
  maDanhMuc: string;
  tenDanhMuc: string;
};

export type CategoryWithCount = Category & {
  soLuong: number;
};
