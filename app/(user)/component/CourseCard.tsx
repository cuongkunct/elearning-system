"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import { Course } from "@/types/user/course/course.type";
import SafeImage from "../courses/component/SafeImage";
import Link from "next/link";

type CourseCardProps = {
  courses: Course[];
};

export default function CourseCard({ courses }: CourseCardProps) {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
      {courses.map((item: Course, index: number) => (
        /* eslint-disable no-console */
        <Link href={`/khoa-hoc/${item.maKhoaHoc}`}>
          <Card isPressable shadow="sm" className="cursor-pointer">
            <CardBody className="overflow-hidden p-0 h-[180px]">
              <SafeImage
                src={item.hinhAnh}
                alt={item.tenKhoaHoc}
                width={500}
                height={340}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </CardBody>

            <CardFooter className="flex flex-col items-start gap-1">
              <b className="line-clamp-1">{item.tenKhoaHoc}</b>
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
