"use client";
import { usePathname } from "next/navigation";

import { Course } from "@/types/user/course/course.type";
import CourseCardItem from "@/app/(user)/courses/_components/CourseCardItem";

type CourseCardProps = {
  courses: Course[];
};

export default function CourseCard({ courses }: CourseCardProps) {
  const pathname = usePathname();
  const isCategoryPage = pathname.includes("/courses");
  const isProfilePage = pathname.includes("/profile");

  return (
    <div
      className={`
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    gap-4
    w-full
    ${
      isProfilePage
        ? "lg:grid-cols-3"
        : isCategoryPage
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4"
    }
  `}
    >
      {courses &&
        courses.map((item: Course) =>
          item ? <CourseCardItem key={item.maKhoaHoc} course={item} /> : null,
        )}
    </div>
  );
}
