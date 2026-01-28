"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import { Course } from "@/types/user/course/course.type";
import SafeImage from "../courses/component/SafeImage";
import Link from "next/link";
import { usePathname } from "next/navigation";

type CourseCardProps = {
  courses: Course[];
};

export default function CourseCard({ courses }: CourseCardProps) {
  const pathname = usePathname();

  const isCategoryPage = pathname.includes("/categories");
  const isSearchPage = pathname.includes("/search");

  return (
    <div
      className={
        isSearchPage
          ? "flex flex-col gap-4"
          : `
            grid gap-2
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            ${isCategoryPage ? "lg:grid-cols-3" : "lg:grid-cols-4"}
          `
      }
    >
      {courses.map((item: Course) => (
        <Link key={item.maKhoaHoc} href={`/course/${item.maKhoaHoc}`}>
          <Card
            isPressable
            shadow="sm"
            className={`cursor-pointer w-full ${
              isSearchPage ? "flex flex-col sm:flex-row items-start gap-3" : ""
            }`}
          >
            {/* IMAGE */}
            <CardBody
              className={`p-0 overflow-hidden shrink-0 flex items-center justify-center ${
                isSearchPage
                  ? "w-full h-[120px] sm:w-[100px] sm:h-[150px]"
                  : "h-[180px]"
              }`}
            >
              <SafeImage
                src={item.hinhAnh}
                alt={item.tenKhoaHoc}
                width={500}
                height={500}
                className="w-full h-full object-cover aspect-square rounded-md"
              />
            </CardBody>

            {/* CONTENT */}
            <CardFooter
              className={`flex flex-col items-start gap-2 w-full ${
                isSearchPage ? "flex-3" : ""
              }`}
            >
              <b className="line-clamp-2 text-base">{item.tenKhoaHoc}</b>

              <div className="flex justify-between w-full text-sm text-default-500">
                <span>👁 {item.luotXem} lượt xem</span>
                <span>👨‍🎓 {item.soLuongHocVien} học viên</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
