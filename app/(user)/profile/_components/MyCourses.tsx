"use client";

import type { Course } from "@/types/user/course/course.type";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Cookies from "js-cookie";
import { CalendarIcon, TimerIcon } from "lucide-react";

import { LogoIcon } from "@/components/icons";
import { UserProfileResponse } from "@/types/user/userProfile/userProfile.type";
import { cancelCourseByMaKhoaHoc } from "@/services/user/courses/course.service";
import NotificationModal from "@/components/user/shared/NotificationModal";
type Props = {
  userData?: UserProfileResponse;
  onCancel?: () => void;
};

export default function MyCoursePage({ userData, onCancel }: Props) {
  const [courses, setCourses] = useState<Course[]>(
    userData?.chiTietKhoaHocGhiDanh || [],
  );
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const handleCancelCourse = async (id: string) => {
    const userData = Cookies.get("userData");

    if (!userData) {
      setTitle("Please login");
      setErr("You need to login to join this course.");
      setOpen(true);

      return;
    }
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));
      const res = await cancelCourseByMaKhoaHoc(id);

      if (res === "Hủy ghi danh thành công!") {
        onCancel?.();
        setCourses((prev) => prev.filter((c) => c.maKhoaHoc !== id));
        setLoading((prev) => ({ ...prev, [id]: false }));
        setTitle("Cancel course successfully");
        setErr(null);
        setOpen(true);
      }
    } catch (e: any) {
      setTitle("Action failed");
      setErr(e?.message || "Something went wrong");
      setOpen(true);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };
  const courseMemo = useMemo(() => courses, [courses]);

  if (courseMemo.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-gray-400">You have not enrolled in any courses</p>
      </div>
    );
  }

  return (
    <section className="w-full mx-auto px-6">
      <div className="flex items-center justify-start gap-4 my-4">
        <LogoIcon />
        <h2 className="text-3xl font-bold ">My joined course</h2>
      </div>

      <div className="space-y-4 flex flex-col md:flex-row gap-4 justify-center items-center ">
        {courseMemo.map((course: Course) => (
          <div
            key={course.maKhoaHoc}
            className="flex flex-col md:flex-row items-center w-fit md:w-full rounded-lg shadow p-4 hover:shadow-xl transition-shadow"
          >
            <Image
              alt={course.tenKhoaHoc}
              className=" object-cover rounded mr-4"
              height={300}
              src={course.hinhAnh}
              width={300}
            />

            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{course.tenKhoaHoc}</h3>
              <p className=" text-sm mb-2 truncate w-64">{course.moTa}</p>
              <div className="flex items-center gap-4 text-sm  mb-2">
                <div className="flex gap-2 items-center justify-center">
                  <TimerIcon />
                  <span> {Math.ceil(course.luotXem / 12)} hours</span>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <CalendarIcon />
                  <span>{new Date(course.ngayTao).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="font-medium text-gray-700">
                    {(Math.random() * (5 - 4) + 4).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              color="warning"
              isLoading={loading[course.maKhoaHoc]}
              onPress={() => handleCancelCourse(course.maKhoaHoc)}
            >
              Cancel course
            </Button>
          </div>
        ))}
        <NotificationModal
          color={err ? "danger" : "success"}
          isOpen={open}
          title={title}
          onClose={() => setOpen(false)}
        />
      </div>
    </section>
  );
}
