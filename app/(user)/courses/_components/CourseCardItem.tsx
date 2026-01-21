"use client";

import { useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { Course } from "@/types/user/course/course.type";
import {
  cancelCourseByMaKhoaHoc,
  joinCourseByMaKhoaHoc,
} from "@/services/user/courses/course.service";
import NotificationModal from "@/components/user/shared/NotificationModal";
import ButtonJoinCourse from "./BottonJoinCourse";
import Link from "next/link";
import SafeImage from "./SafeImage";

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
            src={course.hinhAnh}
            alt={course.tenKhoaHoc}
            width={500}
            height={500}
            className="w-full h-full object-cover aspect-square rounded-md"
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
        title={title || ""}
        color={err ? "danger" : "success"}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </Card>
  );
}
