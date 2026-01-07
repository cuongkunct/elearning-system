"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    source: "Frontend Student",
    title: "Able to Build Real Projects After the Course",
    content:
      "The course helped me clearly understand React and Next.js and feel confident applying for jobs.",
    image: "/student/hv1.png",
    name: "Mr.Dean",
  },
  {
    id: 2,
    source: "Backend Student",
    title: "The Instructor Explains Everything Very Clearly",
    content:
      "I went from having no foundation to being able to build APIs and deploy projects on my own.",
    image: "/student/hv2.png",
    name: "Ms.Anna",
  },
  {
    id: 3,
    source: "Frontend Student",
    title: "Able to Build Real Projects After the Course",
    content:
      "The course helped me clearly understand React and Next.js and feel confident applying for jobs.",
    image: "/student/hv3.png",
    name: "Mr.Dean",
  },
  {
    id: 4,
    source: "Backend Student",
    title: "The Instructor Explains Everything Very Clearly",
    content:
      "I went from having no foundation to being able to build APIs and deploy projects on my own.",
    image: "/student/hv1.png",
    name: "Ms.Anna",
  },
  {
    id: 5,
    source: "Frontend Student",
    title: "Able to Build Real Projects After the Course",
    content:
      "The course helped me clearly understand React and Next.js and feel confident applying for jobs.",
    image: "/student/hv2.png",
    name: "Mr.Dean",
  },
  {
    id: 6,
    source: "Backend Student",
    title: "The Instructor Explains Everything Very Clearly",
    content:
      "I went from having no foundation to being able to build APIs and deploy projects on my own.",
    image: "/student/hv3.png",
    name: "Ms.Anna",
  },
];

export default function StudentReviewSlider() {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: false }}
          // navigation
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
                <div className="w-full h-50 rounded-md  overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm  font-medium text-primary">
                  {item.source}
                </span>
                <h3 className="font-semibold text-lg text-primary">
                  {item.title}
                </h3>
                <p className=" text-sm leading-relaxed text-gray-700">
                  {item.content}
                </p>
                <div className="mt-auto pt-4 border-t text-sm font-medium text-red-700">
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
