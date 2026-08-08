import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ads1 from "../assets/ads1.png";
import ads2 from "../assets/ads2.png";
import ads3 from "../assets/ads3.png";

const slides = [
  {
    id: 1,
    image: ads1,
    alt: "عرض بانر واحد",
  },
  {
    id: 2,
    image: ads2,
    alt: "عروض الإلكترونيات",
  },
  {
    id: 3,
    image: ads3,
    alt: "عروض الموضة",
  },
];

export default function Banner() {
  return (
    <div className="w-full max-w-[1500px] mx-auto relative bg-[#0f1111]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        dir="rtl"
        className="amazon-swiper w-full h-[220px] md:h-[400px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover block"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}