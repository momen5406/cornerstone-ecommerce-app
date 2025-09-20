"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Category } from "@/types/category.type";
import Link from "next/link";

const CategorySlider = ({ categories }: { categories: Category[] }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      autoplay={{
        delay: 4000, // 3 seconds per slide
        disableOnInteraction: false, // keeps autoplay even after user interaction
      }}
      modules={[Autoplay]}
      loop={true}
      breakpoints={{
        480: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 6 },
      }}
    >
      {categories.map((category, index) => (
        <SwiperSlide key={index}>
          <Link href={`/categories/${category._id}`} className="text-center">
            <Image
              className="w-full aspect-square hover:text-accent object-cover mx-auto rounded-lg shadow"
              src={category.image}
              alt="Banner 1"
              height={400}
              width={1200}
              priority
            />
            <h3 className="capitalize font-semibold mt-2">{category.name}</h3>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySlider;
