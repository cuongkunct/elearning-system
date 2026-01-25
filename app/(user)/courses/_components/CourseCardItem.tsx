"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";
import { User2Icon } from "lucide-react";

import SafeImage from "./SafeImage";

import { Course } from "@/types/user/course/course.type";

export default function CourseCardItem({ course }: { course: Course }) {
  return (
    <Card className="cursor-pointer w-full">
      <Link href={`/course/${course.maKhoaHoc}`}>
        <CardBody className="p-0 overflow-hidden shrink-0 flex items-center justify-center h-[180px]">
          <SafeImage
            alt={course.tenKhoaHoc}
            className="w-full h-full object-cover aspect-square rounded-md"
            height={500}
            src={course.hinhAnh}
            width={500}
          />
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-3 w-full">
          <h3 className="text-lg font-bold leading-snug line-clamp-2">
            {course.tenKhoaHoc}
          </h3>

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <span className="font-medium text-gray-700">Course:</span>{" "}
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </p>
            <p>
              <span className="font-medium text-gray-700">Teacher:</span>{" "}
              {course.nguoiTao.hoTen}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span>
              <span className="font-medium text-gray-700">
                {(Math.random() * (5 - 4) + 4).toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User2Icon />
              {(Math.random() * 1000).toFixed(0)}
              <span>students</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-red-500">$30</span>
            <span className="text-sm text-gray-400 line-through">$40</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
