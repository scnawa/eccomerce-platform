import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import a1 from "../assets/images/a1.jpg";
import car1 from "../assets/images/car1.jpg";
import trousers from "../assets/images/trousers.jpg"

import "./HeroSlider.css"

export default function HeroSlider() {
  return (
    <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="hero-swiper"
        //style={{background: 'red' }}
    >
    <SwiperSlide>
        <img src={a1} alt="slide1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={car1} alt="slide2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trousers} alt="slide2" />
      </SwiperSlide>
    </Swiper>
  );
}