"use client";
import { Checkbox } from "@heroui/react";
import { Category } from "@/types/user/category/category.type";

type Props = {
  categories: Category[];
};

export default function CategoriesFilter({ categories }: Props) {
  return (
    <div className="flex-[3] flex flex-col gap-4 border rounded-md p-4">
      {categories.map((c) => (
        <Checkbox key={c.maDanhMuc}>{c.tenDanhMuc}</Checkbox>
      ))}
    </div>
  );
}
