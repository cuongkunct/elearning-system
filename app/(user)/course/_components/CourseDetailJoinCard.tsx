"use client";

import { useEffect, useState } from "react";
import { Course } from "@/types/user/course/course.type";
import { fetchUserProfile } from "@/services/user/userAccount/user.service";
import CourseCardItem from "../../courses/_components/CourseCardItem";

export default function CourseDetailJoinCard({
  course,
}: {
  course: Course;
}) {
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchUserProfile();
        const joined = res?.chiTietKhoaHocGhiDanh?.some(
          (c: Course) => c.maKhoaHoc === course.maKhoaHoc
        );
        setIsJoined(!!joined);
      } catch {
        setIsJoined(false);
      }
    };
    loadProfile();
  }, [course.maKhoaHoc]);

  return (
    <CourseCardItem
      course={course}
      isJoined={isJoined}
      onJoinSuccess={() => setIsJoined(true)}
      onCancelSuccess={() => setIsJoined(false)}
    />
  );
}
