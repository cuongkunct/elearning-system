import React from "react";
import { Pagination as HeroUIPagination } from "@heroui/react";

interface PaginationProps {
  currentPage: number; // Trang hiện tại
  totalPages: number; // Tổng số trang
  onPageChange: (page: number) => void; // Hàm callback khi chuyển trang
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <HeroUIPagination
        initialPage={currentPage} // Trang hiện tại
        total={totalPages} // Tổng số trang
        variant="bordered" // Bạn có thể thay đổi variant tùy ý (flat, bordered, faded, light)
        onChange={(page) => onPageChange(page)} // Hàm callback khi chuyển trang
      />
    </div>
  );
};

export default Pagination;
