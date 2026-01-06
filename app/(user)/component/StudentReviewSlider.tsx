"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    source: "Học viên Frontend",
    title: "Học xong làm được dự án thực tế",
    content:
      "Khóa học giúp mình hiểu rõ React, Next.js và tự tin apply công việc.",
    image: "/student/hv1.png",
    name: "Nguyễn Văn A",
  },
  {
    id: 2,
    source: "Học viên Backend",
    title: "Giảng viên dạy rất dễ hiểu",
    content: "Mình từ mất gốc đến có thể tự xây dựng API và deploy project.",
    image: "/student/hv1.png",
    name: "Trần Thị B",
  },
  {
    id: 3,
    source: "Học viên Fullstack",
    title: "Lộ trình rõ ràng – hỗ trợ tốt",
    content: "Mentor support nhanh, bài tập sát thực tế doanh nghiệp.",
    image: "/student/hv1.png",
    name: "Lê Văn C",
  },
  {
    id: 4,
    source: "Học viên Data",
    title: "Ứng dụng được ngay vào công việc",
    content: "Học xong mình áp dụng được vào dự án công ty luôn.",
    image: "/student/hv1.png",
    name: "Phạm Thị D",
  },
];

export default function StudentReviewSlider() {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10">
          Học viên nói gì về chúng tôi?
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-gray-50 rounded-xl shadow-sm p-6 h-full flex flex-col gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={220}
                  height={140}
                  className="rounded-lg object-cover"
                />

                <span className="text-sm text-blue-600 font-medium">
                  {item.source}
                </span>

                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.content}
                </p>

                <div className="mt-auto pt-4 border-t text-sm font-medium">
                  {item.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
