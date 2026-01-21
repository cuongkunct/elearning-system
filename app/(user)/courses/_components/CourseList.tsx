"use client";
import { Course } from "@/types/user/course/course.type";
import { usePathname } from "next/navigation";
import CourseCardItem from "@/app/(user)/courses/_components/CourseCardItem";
import { useEffect, useMemo, useState } from "react";
import { fetchUserProfile } from "@/services/user/userAccount/user.service";

type CourseCardProps = {
  courses: Course[];
};

export default function CourseCard({ courses }: CourseCardProps) {
  const [joinedCourse, setJoinedCourse] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      try {
        const response = await fetchUserProfile();
        if (!response?.chiTietKhoaHocGhiDanh) return;
        setJoinedCourse(response.chiTietKhoaHocGhiDanh);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      }
    };
    loadProfile();
  }, []);

  const pathname = usePathname();
  const isCategoryPage = pathname.includes("/courses");
  const isSearchPage = pathname.includes("/search");
  return (
    <div
      className={
        isSearchPage
          ? "flex flex-col gap-4"
          : `
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
      {courses.map((item: Course) => (
        <CourseCardItem
          key={item.maKhoaHoc}
          course={item}
          isJoined={joinedCourseSet.has(item.maKhoaHoc)}
          onJoinSuccess={handleJoinSuccess}
          onCancelSuccess={handleCancelSuccess}
        />
      ))}
    </div>
  );
}
