"use client";

import type { Course } from "@/types/user/course/course.type";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { CalendarIcon, TimerIcon } from "lucide-react";

import { LogoIcon } from "@/components/icons";
import { UserProfileResponse } from "@/types/user/userProfile/userProfile.type";


import { useDispatch, useSelector } from "react-redux";
import { RootState, DispatchType } from "@/store";
import {
  cancelCourse,
  resetCourseState,
} from "@/store/user/course/course.slice";

import { showToast } from "@/utils/toast";


type Props = {
  userData: UserProfileResponse;
  onCancel?: () => void;
};

export default function MyCoursePage({ userData, onCancel }: Props) {
  const dispatch = useDispatch<DispatchType>();
  const userSession = useSelector((state: RootState) => state.auth.userData);
  const cancelStatus = useSelector((state: RootState) => state.userCourse.cancel.success);
  const [courses, setCourses] = useState<Course[]>(
    userData?.chiTietKhoaHocGhiDanh || [],
  );
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (cancelStatus) {
      showToast({
        title: "Cancel course successfully",
        description: "You have successfully canceled the course",
        type: "success",
      })

      dispatch(resetCourseState());
    }
  }, [cancelStatus, dispatch]);

  useEffect(() => {
    if (userData?.chiTietKhoaHocGhiDanh) {
      setCourses(userData.chiTietKhoaHocGhiDanh);
    }
  }, [userData]);

  const handleCancelCourse = async (maKhoaHoc: string) => {
    if (!userSession) {
      showToast({
        title: "Unauthorized",
        description: "No access token found",
        type: "danger",
      })
      return;
    }
    try {
      setLoading((prev) => ({ ...prev, [maKhoaHoc]: true }));
      await dispatch(
        cancelCourse({
          maKhoaHoc,
          taiKhoan: userData?.taiKhoan,
          token: userSession.accessToken,
        }),
      ).unwrap();
      setCourses((prev) =>
        prev.filter((c) => c.maKhoaHoc !== maKhoaHoc),
      );
      onCancel?.();
    } catch (err: any) {
      showToast({
        title: "Error canceling course",
        description: err,
        type: "danger",
      })
    } finally {
      setLoading((prev) => ({ ...prev, [maKhoaHoc]: false }));
      dispatch(resetCourseState());
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

      <div className="space-y-4 flex flex-col gap-4 justify-center items-center">
        {courseMemo.map((course: Course) => (
          <div
            key={course.maKhoaHoc}
            className="flex flex-col md:flex-row items-center w-fit md:w-full rounded-lg shadow p-4 hover:shadow-xl transition-shadow"
          >
            <Image
              alt={course.tenKhoaHoc}
              className="object-cover rounded mr-4"
              height={300}
              src={course.hinhAnh}
              width={300}
            />

            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">
                {course.tenKhoaHoc}
              </h3>
              <p className="text-sm mb-2 truncate w-64">
                {course.moTa}
              </p>
              <div className="flex items-center gap-4 text-sm mb-2">
                <div className="flex gap-2 items-center">
                  <TimerIcon />
                  <span>{Math.ceil(course.luotXem / 12)} hours</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CalendarIcon />
                  <span>
                    {new Date(course.ngayTao).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="font-medium text-gray-700">
                    5
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
      </div>
    </section>
  );
}
