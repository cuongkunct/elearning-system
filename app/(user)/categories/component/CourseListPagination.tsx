"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  items: any[];
  currentPage?: number;
  totalPages?: number;
};

export default function CourseListPagination({
  items,
  currentPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Pagination
        page={currentPage}
        total={totalPages}
        showControls
        onChange={onChangePage}
      />
    </>
  );
}
