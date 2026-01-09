"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
  searchKey?: string
};

export default function Pagination({ currentPage, totalPages, searchKey  }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };
  
  const windowSize = 3;
  const half = Math.floor(windowSize / 2);

  let start = Math.max(1, currentPage - half);
  let end = start + windowSize - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - windowSize + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center gap-2 mt-6 items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button onClick={() => goToPage(1)}>1</button>
          {start > 2 && <span>…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${
            page === currentPage ? "bg-black text-white" : ""
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span>…</span>}
          <button onClick={() => goToPage(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
