"use client";

import type { Course } from "@/types/user/course/course.type";

import { useEffect, useState } from "react";

import CourseCard from "../courses/_components/CourseList";

import { fetchUserProfile } from "@/services/user/userAccount/user.service";
import SkeletonCard from "@/components/user/shared/SkeletonCard";
import { LogoIcon } from "@/components/icons";

export default function MyCoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await fetchUserProfile();

        if (!response?.chiTietKhoaHocGhiDanh) return;
        setCourses(response.chiTietKhoaHocGhiDanh);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-gray-400">
        <SkeletonCard numberCard={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-500">
        {error}
      </div>
    );
  }
  if (courses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-gray-400">You have not enrolled in any courses</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-start gap-4 my-4">
        <LogoIcon />
        <h2 className="text-3xl font-bold ">My joined course</h2>
      </div>

      <CourseCard courses={courses} />
    </section>
  );
}
