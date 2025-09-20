"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const ProductSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 3000, // 3 seconds per slide
        disableOnInteraction: false, // keeps autoplay even after user interaction
      }}
      modules={[Autoplay]}
      loop={true}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            className="w-full aspect-square hover:text-accent object-cover mx-auto rounded-lg shadow"
            src={image}
            alt="Banner 1"
            height={400}
            width={1200}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
