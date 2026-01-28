"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function SlideShow() {
  // data/slides.ts
  const slides = [
    {
      id: 1,
      image: "banner1.png",
      link: "/courses/accounting",
      alt: "Accounting Course",
    },
    {
      id: 2,
      image: "banner2.png",
      link: "/courses/marketing",
      alt: "Marketing Course",
    },
    {
      id: 3,
      image: "banner3.png",
      link: "/courses/design",
      alt: "Design Course",
    },
    {
      id: 4,
      image: "banner4.png",
      link: "/courses/design",
      alt: "Design Course",
    },
  ];

  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        className="w-full h-[420px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.link} className="block w-full h-full">
              <div className="relative w-full h-full group">
                <img src={slide.image} alt={slide.alt} />
                {/* overlay nhẹ cho chữ sau này */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
