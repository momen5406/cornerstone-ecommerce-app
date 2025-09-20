"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import slider1 from "../../../public/slider/slider1.jpg";
import slider2 from "../../../public/slider/slider2.jpg";
import slider3 from "../../../public/slider/slider3.jpg";
import slider4 from "../../../public/slider/slider4.jpg";
import Image from "next/image";

const HomeSlider = () => {
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
      <SwiperSlide>
        <Image
          className="w-full object-cover md:h-[400px] h-[200px]"
          src={slider1}
          alt="Banner 1"
          height={400}
          width={1200}
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full object-cover md:h-[400px] h-[200px]"
          src={slider2}
          alt="Banner 2"
          height={400}
          width={1200}
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full object-cover md:h-[400px] h-[200px]"
          src={slider3}
          alt="Banner 3"
          height={400}
          width={1200}
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full object-cover md:h-[400px] h-[200px]"
          src={slider4}
          alt="Banner 4"
          height={400}
          width={1200}
          priority
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
