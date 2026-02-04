"use client";

import { useEffect, useState } from "react";
import { UserIcon, TimerIcon, BookIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import CourseCardItem from "../../courses/_components/CourseCardItem";
import ButtonJoinCourse from "../../courses/_components/BottonJoinCourse";
import CourseCurriculum from "./CourseCurriculum";

import { Course } from "@/types/user/course/course.type";
import NotificationModal from "@/components/user/shared/NotificationModal";
import { joinCourse, cancelCourse } from "@/store/user/course/course.slice";
import { RootState, DispatchType } from "@/store";
import { getUserProfile } from "@/store/user/profile/profile.slice";
import { addToast } from "@heroui/react";

export default function CourseDetailJoinCard({
  course,
  intro,
}: {
  course: Course;
  intro: string;
}) {
  const dispatch = useDispatch<DispatchType>();

  const userProfile = useSelector((state: RootState) => state.userProfile.profile);
  const accessToken = useSelector((state: RootState) => state.auth.userData?.accessToken);
  const { loading: joinLoading } = useSelector((state: RootState) => state.userCourse.join);
  const { loading: cancelLoading } = useSelector((state: RootState) => state.userCourse.cancel);
  const isLoading = joinLoading || cancelLoading;
  const [isJoined, setIsJoined] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    dispatch(getUserProfile({ token: accessToken }))
      .unwrap()
      .catch((err: any) => {
        addToast({
          title: "Error fetching user profile",
          description: err?.message || err,
          color: "danger",
        });
      });
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (!userProfile) {
      setIsJoined(false);
      return;
    }

    const joined = userProfile.data?.chiTietKhoaHocGhiDanh?.some(
      (c: Course) => c.maKhoaHoc === course.maKhoaHoc
    );

    setIsJoined(!!joined);
  }, [userProfile, course.maKhoaHoc]);

  const handleToggleJoin = async () => {
    if (!userProfile || !accessToken) {
      setTitle("Please login");
      setErr("You need to login to join this course.");
      setOpen(true);
      return;
    }

    try {
      if (!isJoined) {
        const res = await dispatch(
          joinCourse({
            maKhoaHoc: course.maKhoaHoc,
            taiKhoan: userProfile?.data?.taiKhoan as string,
            token: accessToken,
          })
        ).unwrap();

        if (res === "Ghi danh thành công!") {
          setIsJoined(true);
          setTitle("Join course successfully 🎉");
          setErr(null);
        }
      } else {
        const res = await dispatch(
          cancelCourse({
            maKhoaHoc: course.maKhoaHoc,
            taiKhoan: userProfile.data?.taiKhoan as string,
            token: accessToken,
          })
        ).unwrap();

        if (res === "Hủy ghi danh thành công!") {
          setIsJoined(false);
          setTitle("Cancel course successfully");
          setErr(null);
        }
      }

      setOpen(true);
    } catch (e: any) {
      setTitle("Action failed");
      setErr(e);
      setOpen(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-12 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 w-full">
        <h2 className="text-2xl font-semibold py-4">Course introduction</h2>
        <p className="leading-relaxed text-gray-700">{intro}</p>
        <CourseCurriculum />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl p-2 shadow-lg bg-white">
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
            loading={isLoading}
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
