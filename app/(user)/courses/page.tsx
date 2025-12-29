"use client";
import { title } from "@/components/primitives";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "@/store/index";
import { fetchCourseList } from "@/store/user/course/course.thunk";

export default function CoursePage() {
  const dispatch = useDispatch<DispatchType>();
  const { data, loading } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(fetchCourseList());
  }, [dispatch]);

  return (
    <div>
      <h1 className={title()}>Docs</h1>
    </div>
  );
}
