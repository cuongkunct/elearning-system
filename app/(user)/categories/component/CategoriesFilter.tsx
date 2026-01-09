"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  categories: {
    maDanhMuc: string;
    tenDanhMuc: string;
  }[];
};

export default function CategoriesFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Update URL khi selectedCategory thay đổi
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("categories_idid", selectedCategory);
    } else {
      params.delete("categories_idid");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedCategory, router, searchParams]);

  const handleSelectCategory = (maDanhMuc: string) => {
    setSelectedCategory((prev) => (prev === maDanhMuc ? "" : maDanhMuc));
  };

  return (
    <div className="flex-[3] flex flex-col gap-3 border rounded-md p-4">
      {categories.map((c) => {
        const isActive = selectedCategory === c.maDanhMuc;
        return (
          <p
            key={c.maDanhMuc}
            onClick={() => handleSelectCategory(c.maDanhMuc)}
            className={`
              cursor-pointer p-4 border rounded-md text-center 
              transition-transform transform duration-200
              ${isActive ? "bg-gray-200 text-gray-800" : "bg-amber-600 text-white"}
              hover:scale-105 hover:bg-amber-500
            `}
          >
            {c.tenDanhMuc}
          </p>
        );
      })}
    </div>
  );
}
