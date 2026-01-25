"use client";

import { useEffect, useState } from "react";
import { UserIcon, TimerIcon, BookIcon } from "lucide-react";
import Cookies from "js-cookie";

import CourseCardItem from "../../courses/_components/CourseCardItem";
import ButtonJoinCourse from "../../courses/_components/BottonJoinCourse";

import CourseCurriculum from "./CourseCurriculum";

import { Course } from "@/types/user/course/course.type";
import { fetchUserProfile } from "@/services/user/userAccount/user.service";
import {
  joinCourseByMaKhoaHoc,
  cancelCourseByMaKhoaHoc,
} from "@/services/user/courses/course.service";
import NotificationModal from "@/components/user/shared/NotificationModal";

export default function CourseDetailJoinCard({
  course,
  intro,
}: {
  course: Course;
  intro: string;
}) {
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const checkJoined = async () => {
      try {
        const res = await fetchUserProfile();
        const joined = res?.chiTietKhoaHocGhiDanh?.some(
          (c: Course) => c.maKhoaHoc === course.maKhoaHoc,
        );

        setIsJoined(!!joined);
      } catch {
        setIsJoined(false);
      }
    };

    checkJoined();
  }, [course.maKhoaHoc]);

  const handleToggleJoin = async () => {
    const userData = Cookies.get("userData");

    if (!userData) {
      setTitle("Please login");
      setErr("You need to login to join this course.");
      setOpen(true);

      return;
    }

    try {
      setLoading(true);

      if (!isJoined) {
        const res = await joinCourseByMaKhoaHoc(course.maKhoaHoc);

        if (res === "Ghi danh thành công!") {
          setIsJoined(true);
          setTitle("Join course successfully 🎉");
          setErr(null);
          setOpen(true);
        }
      } else {
        const res = await cancelCourseByMaKhoaHoc(course.maKhoaHoc);

        if (res === "Hủy ghi danh thành công!") {
          setIsJoined(false);
          setTitle("Cancel course successfully");
          setErr(null);
          setOpen(true);
        }
      }
    } catch (e: any) {
      setTitle("Action failed");
      setErr(e?.message || "Something went wrong");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-12 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-semibold">Course introduction</h2>
        <p className="leading-relaxed">{intro}</p>
        <CourseCurriculum />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl p-2 shadow-lg border border-gray-100 bg-white">
        <CourseCardItem course={course} />

        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <UserIcon size={18} /> Students: {course.soLuongHocVien}
          </p>
          <p className="flex items-center gap-2">
            <TimerIcon size={18} /> Time: 20 hours
          </p>
          <p className="flex items-center gap-2">
            <BookIcon size={18} /> Lessons: 20 lessons
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <ButtonJoinCourse
            isJoined={isJoined}
            loading={loading}
            onJoin={handleToggleJoin}
          />
        </div>
      </div>
      <NotificationModal
        color={err ? "danger" : "success"}
        isOpen={open}
        title={title}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
