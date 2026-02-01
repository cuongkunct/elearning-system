"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@heroui/react";

import type { DispatchType, RootState } from "@/store";

import CourseTable from "@/components/admin/course/courseTable";
import Pagination from "@/components/admin/pagination";
import EditCourseModal from "@/components/admin/course/editCourseModal";
import DeleteCourseModal from "@/components/admin/course/deleteCourseModal";

import {
  fetchCourses,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
} from "@/store/admin/courses/course.thunk";

import {
  resetUpdateCourseState,
  resetDeleteCourseState,
} from "@/store/admin/courses/courses.slice";

import type { TCourse } from "@/types/admin/course/course.type";

export default function CoursePage() {
  const dispatch: DispatchType = useDispatch();

  const {
    loading: courseLoading,
    data: courseData,
    error: courseError,

    updateLoading: courseUpdateLoading,
    updateError: courseUpdateError,

    deleteLoading,
    deleteError,

    // Search state (Navbar dispatch)
    searchKeyword,
    searchLoading,
    searchError,
    searchResult,
  } = useSelector((s: RootState) => s.course);

  // --- Edit state ---
  const [selectedCourse, setSelectedCourse] = useState<TCourse | null>(null);
  const [isCourseEditOpen, setIsCourseEditOpen] = useState(false);

  // --- Delete state ---
  const [selectedCourseForDelete, setSelectedCourseForDelete] =
    useState<TCourse | null>(null);
  const [isCourseDeleteOpen, setIsCourseDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses({ page: 1, pageSize: 10, maNhom: "GP01" }));
  }, [dispatch]);

  const handleCoursePageChange = (page: number) => {
    dispatch(fetchCourses({ page, pageSize: 10, maNhom: "GP01" }));
  };

  const isCourseSearching = useMemo(
    () => !!searchKeyword?.trim(),
    [searchKeyword],
  );

  const courseTableData = useMemo(() => {
    if (!isCourseSearching) return courseData?.items || [];
    return searchResult ? [searchResult] : [];
  }, [isCourseSearching, courseData?.items, searchResult]);

  const handleOpenCourseEdit = (course: TCourse) => {
    console.log("✅ [CoursePage] open edit:", course.maKhoaHoc);
    setSelectedCourse(course);
    setIsCourseEditOpen(true);
    dispatch(resetUpdateCourseState());
  };

  const handleCloseCourseEdit = (open: boolean) => {
    setIsCourseEditOpen(open);
    if (!open) {
      setSelectedCourse(null);
      dispatch(resetUpdateCourseState());
    }
  };

  const courseUpdateErrorMessage = useMemo(() => {
    if (!courseUpdateError) return null;
    return courseUpdateError.message || "Update course failed";
  }, [courseUpdateError]);

  const handleOpenCourseDelete = (course: TCourse) => {
    console.log("✅ [CoursePage] open delete:", course.maKhoaHoc);
    setSelectedCourseForDelete(course);
    setIsCourseDeleteOpen(true);
    dispatch(resetDeleteCourseState());
  };

  const handleCloseCourseDelete = (open: boolean) => {
    setIsCourseDeleteOpen(open);
    if (!open) {
      setSelectedCourseForDelete(null);
      dispatch(resetDeleteCourseState());
    }
  };

  const deleteErrorMessage = useMemo(() => {
    if (!deleteError) return null;
    return deleteError.message || "Delete course failed";
  }, [deleteError]);

  // full page loading for list
  if (courseLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );

  if (courseError)
    return (
      <div>Error: {String((courseError as any)?.message ?? courseError)}</div>
    );

  return (
    <section className="h-full min-h-0 w-full bg-white rounded-xl shadow-sm py-3 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 px-6 overflow-auto">
        {/* Search status UI */}
        {isCourseSearching ? (
          <div className="py-3">
            {searchLoading ? (
              <div className="flex items-center gap-2 text-sm text-default-500">
                <Spinner size="sm" />
                <span>Searching course...</span>
              </div>
            ) : null}

            {!searchLoading && searchError ? (
              <p className="text-sm text-danger-500">
                {searchError.message || "Search failed"}
              </p>
            ) : null}

            {!searchLoading && !searchError && !searchResult ? (
              <p className="text-sm text-default-500">
                No course found for:{" "}
                <span className="font-medium">{searchKeyword}</span>
              </p>
            ) : null}
          </div>
        ) : null}

        <CourseTable
          data={courseTableData}
          onEdit={handleOpenCourseEdit}
          onDelete={handleOpenCourseDelete}
          onUpload={async (course, file) => {
            console.log("✅ [CoursePage] UPLOAD START:", {
              maKhoaHoc: course.maKhoaHoc,
              tenKhoaHoc: course.tenKhoaHoc,
              fileName: file.name,
            });

            const action = await dispatch(
              uploadCourseImage({
                file,
                tenKhoaHoc: course.tenKhoaHoc,
              }) as any,
            );

            if (uploadCourseImage.fulfilled.match(action)) {
              console.log("✅ [CoursePage] UPLOAD SUCCESS", action.payload);

              // Thông báo (giữ nguyên message server trả về nếu là string)
              const payload = (action as any).payload;
              const msg =
                typeof payload === "string"
                  ? payload
                  : payload?.message ||
                    payload?.content ||
                    "Upload thành công!";
              alert(msg);

              // optional: refresh lại list để thấy ảnh mới (nếu UI hiển thị ảnh)
              const currentPage = courseData?.currentPage || 1;
              dispatch(
                fetchCourses({
                  page: currentPage,
                  pageSize: 10,
                  maNhom: "GP01",
                }),
              );
            } else {
              console.log("❌ [CoursePage] UPLOAD FAILED", action.payload);

              // Thông báo lỗi (ưu tiên message từ rejectValue)
              const errMsg =
                (action as any).payload?.message ||
                (action as any).error?.message ||
                "Upload file không thành công!";
              alert(errMsg);
            }
          }}
        />
      </div>

      {/* Hide pagination when searching */}
      {!isCourseSearching ? (
        <div className="px-6">
          <Pagination
            currentPage={courseData?.currentPage || 1}
            totalPages={courseData?.totalPages || 1}
            onPageChange={handleCoursePageChange}
          />
        </div>
      ) : null}

      <EditCourseModal
        isOpen={isCourseEditOpen}
        onOpenChange={handleCloseCourseEdit}
        course={selectedCourse}
        loading={courseUpdateLoading}
        error={courseUpdateErrorMessage}
        onSubmit={async (payload) => {
          const action = await dispatch(updateCourse(payload as any));

          if (updateCourse.fulfilled.match(action)) {
            const currentPage = courseData?.currentPage || 1;
            dispatch(
              fetchCourses({
                page: currentPage,
                pageSize: 10,
                maNhom: payload.maNhom,
              }),
            );
            handleCloseCourseEdit(false);
          }
        }}
      />

      <DeleteCourseModal
        isOpen={isCourseDeleteOpen}
        onOpenChange={handleCloseCourseDelete}
        title="Delete course"
        description={
          selectedCourseForDelete
            ? `Bạn chắc chắn muốn xoá khóa học "${selectedCourseForDelete.tenKhoaHoc}" (${selectedCourseForDelete.maKhoaHoc})?`
            : "Bạn chắc chắn muốn xoá khóa học này?"
        }
        loading={deleteLoading}
        error={deleteErrorMessage}
        onConfirm={async () => {
          const maKhoaHoc = selectedCourseForDelete?.maKhoaHoc;
          if (!maKhoaHoc) return;

          const action = await dispatch(deleteCourse(maKhoaHoc));
          if (deleteCourse.fulfilled.match(action)) {
            const currentPage = courseData?.currentPage || 1;
            dispatch(
              fetchCourses({ page: currentPage, pageSize: 10, maNhom: "GP01" }),
            );
            handleCloseCourseDelete(false);
          }
        }}
      />
    </section>
  );
}
