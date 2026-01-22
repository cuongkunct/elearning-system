"use client";

import { useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";

import ButtonJoinCourse from "./BottonJoinCourse";
import SafeImage from "./SafeImage";

import { Course } from "@/types/user/course/course.type";
import {
  cancelCourseByMaKhoaHoc,
  joinCourseByMaKhoaHoc,
} from "@/services/user/courses/course.service";
import NotificationModal from "@/components/user/shared/NotificationModal";
import Cookies from "js-cookie";

export default function CourseCardItem({
  course,
  isJoined,
  onJoinSuccess,
  onCancelSuccess,
}: {
  course: Course;
  isJoined: boolean;
  onJoinSuccess: (course: Course) => void;
  onCancelSuccess: (maKhoaHoc: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleJoinCourse = async () => {
    const userData = Cookies.get("userData"); // kiểm tra login
    if (!userData) {
      setTitle("Please login first");
      setErr("You need to login to join the course.");
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const res = await joinCourseByMaKhoaHoc(course.maKhoaHoc);

      if (res === "Ghi danh thành công!") {
        onJoinSuccess(course);
        setTitle("Join course successfully");
        setErr(null);
        setOpen(true);
      }
    } catch (e: any) {
      setErr(e?.message || "Join failed");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCourse = async () => {
    const userData = Cookies.get("userData");
    if (!userData) {
      setTitle("Please login first");
      setErr("You need to login to cancel the course.");
      setOpen(true);
      return;
    }
    try {
      setLoading(true);
      const res = await cancelCourseByMaKhoaHoc(course.maKhoaHoc);

      if (res === "Hủy ghi danh thành công!") {
        onCancelSuccess(course.maKhoaHoc);
        setTitle("Cancel course successfully");
        setErr(null);
        setOpen(true);
      }
    } catch (e: any) {
      setErr(e?.message || "Cancel failed");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

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
        <CardFooter className="flex flex-col items-start gap-2 w-full">
          <div className="flex flex-col gap-2 ">
            <h3 className="text-lg font-bold">{course.tenKhoaHoc}</h3>
            <p>
              <strong>Viewed:</strong> {course.luotXem}
            </p>
            <p>
              <strong>Joined:</strong> {course.soLuongHocVien}
            </p>
          </div>
        </CardFooter>
      </Link>
      <ButtonJoinCourse
        isJoined={isJoined}
        loading={loading}
        onJoin={isJoined ? handleCancelCourse : handleJoinCourse}
      />
      <NotificationModal
        color={err ? "danger" : "success"}
        isOpen={open}
        title={title || ""}
        onClose={() => setOpen(false)}
      />
    </Card>
  );
}
