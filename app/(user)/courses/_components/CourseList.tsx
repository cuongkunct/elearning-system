"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/react";

import { Course } from "@/types/user/course/course.type";
import CourseCardItem from "@/app/(user)/courses/_components/CourseCardItem";
import { fetchUserProfile } from "@/services/user/userAccount/user.service";
import Cookies from "js-cookie";

type CourseCardProps = {
  courses: Course[];
};

export default function CourseCard({ courses }: CourseCardProps) {
  const [joinedCourse, setJoinedCourse] = useState<Course[]>([]);

  const handleJoinSuccess = (course: Course) => {
    setJoinedCourse((prev) => [...prev, course]);
  };

  const handleCancelSuccess = (maKhoaHoc: string) => {
    setJoinedCourse((prev) => prev.filter((c) => c.maKhoaHoc !== maKhoaHoc));
  };

  const joinedCourseSet = useMemo(() => {
    return new Set(joinedCourse.map((c) => c.maKhoaHoc));
  }, [joinedCourse]);

  useEffect(() => {
    const loadProfile = async () => {
      const account = Cookies.get("userData");
      if (!account) {
        return;
      }
      try {
        const response = await fetchUserProfile(); // fetchUserProfile đã tự lấy token
        if (!response?.chiTietKhoaHocGhiDanh) return;
        setJoinedCourse(response.chiTietKhoaHocGhiDanh);
      } catch (err: any) {
        addToast({
          title: "Error fetching user profile",
          description: err instanceof Error ? err.message : String(err),
          color: "danger",
        });
      }
    };
    loadProfile();
  }, []);

  const pathname = usePathname();
  const isCategoryPage = pathname.includes("/courses");

  return (
    <div
      className={`
            grid 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-4
            w-full
            ${isCategoryPage ? "lg:grid-cols-3" : "lg:grid-cols-4"}
          `
      }
    >
      {courses && (
        courses.map((item: Course) =>
          item ? (
            <CourseCardItem
              key={item.maKhoaHoc}
              course={item}
              isJoined={joinedCourseSet.has(item.maKhoaHoc)}
              onCancelSuccess={handleCancelSuccess}
              onJoinSuccess={handleJoinSuccess}
            />
          ) : null
        )
      )}
    </div>
  );
}
