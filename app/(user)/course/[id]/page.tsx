import Image from "next/image";
import {
  getCourseDetail,
  getRelatedCourses,
} from "@/services/user/courses/course.service";
import { Metadata } from "next";
import { Course } from "@/types/user/course/course.type";
import CourseCard from "../../component/CourseCard";
import {
  categorySeoMap,
  courseIntroductionByCategory,
} from "../../component/SeoDescription";

type Props = {
  params: {
    id: string;
  };
};

/* ================= SEO ================= */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params; // ✅ do this
  const course = await getCourseDetail(id);

  if (!course) {
    return {
      title: "Khóa học không tồn tại",
      description: "Khóa học bạn đang tìm kiếm không tồn tại.",
    };
  }

  const categoryCode = course.danhMucKhoaHoc.maDanhMucKhoahoc;
  const categoryDescription = categorySeoMap[categoryCode] || course.moTa;

  return {
    title: `${course.tenKhoaHoc} | ${course.danhMucKhoaHoc.tenDanhMucKhoaHoc}`,
    description: categoryDescription,
    openGraph: {
      title: `${course.tenKhoaHoc} | ${course.danhMucKhoaHoc.tenDanhMucKhoaHoc}`,
      description: categoryDescription,
      images: [course.hinhAnh],
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = params;
  const course = await getCourseDetail(id);
  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-600">
            The course you are looking for does not exist or has been deleted.
          </p>
        </div>
      </main>
    );
  }

  const relatedCourses = await getRelatedCourses(
    course.danhMucKhoaHoc.maDanhMucKhoahoc
  );

  const filteredCourses = relatedCourses
    .filter((item: Course) => item.maKhoaHoc !== course.maKhoaHoc)
    .slice(0, 8);

  const categoryDescription =
    categorySeoMap[course.danhMucKhoaHoc.maDanhMucKhoahoc] || course.moTa;
  const intro =
    courseIntroductionByCategory[course.danhMucKhoaHoc.maDanhMucKhoahoc] ||
    course.moTa;
  return (
    <main className="min-h-screen dark:bg-gray-900">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-300 to-indigo-700 ">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-sm uppercase opacity-80">
            {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            {course.tenKhoaHoc}
          </h1>

          <p className="mt-4 max-w-2xl text-lg opacity-90">
            {categoryDescription}
          </p>
          <p className="mt-4 max-w-2xl text-lg opacity-90">{course.moTa}</p>
          <div className="mt-6 flex gap-6 text-sm">
            <span>👁 {course.luotXem} views</span>
            <span>👨‍🎓 {course.soLuongHocVien} students</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Course introduction</h2>
          <p className=" leading-relaxed">{intro}</p>
        </div>

        {/* RIGHT */}
        <aside className="bg-white rounded-xl shadow p-6 space-y-4">
          <Image
            src={course.hinhAnh}
            alt={course.tenKhoaHoc}
            width={400}
            height={250}
            className="rounded-lg object-cover"
          />

          <div className="text-sm text-gray-600 space-y-2">
            <p>
              👨‍🏫 <strong>Teacher:</strong> {course.nguoiTao.hoTen}
            </p>
            <p>
              📂 <strong>Category:</strong>{" "}
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </p>
            <p>
              📅 <strong>Create date:</strong> {course.ngayTao}
            </p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            Register now
          </button>
        </aside>
      </section>
      {/* ====== RELATED COURSES ====== */}
      {filteredCourses.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-bold mb-6">Related courses</h2>
          <CourseCard courses={filteredCourses} />
        </section>
      )}
    </main>
  );
}
