'use client'

import { FaCat, FaHandHoldingHeart, FaStar } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const stats = [
  {
    icon: <FaCat />,
    value: "12K+",
    label: "Happy Pets",
    iconBg: "from-[#C4844A] to-[#B8773F]",
    topBar: "from-[#C4844A] to-[#B8773F]",
    glow: "bg-[#F2C4A0]",
  },
  {
    icon: <IoHome />,
    value: "850+",
    label: "Verified Homes",
    iconBg: "from-[#7A9E7E] to-[#6B8F6F]",
    topBar: "from-[#7A9E7E] to-[#6B8F6F]",
    glow: "bg-[#C8DFC9]",
  },
  {
    icon: <FaHandHoldingHeart />,
    value: "98%",
    label: "Customer Satisfaction",
    iconBg: "from-[#E8A94F] to-[#D4963C]",
    topBar: "from-[#E8A94F] to-[#D4963C]",
    glow: "bg-[#F5DBA8]",
  },
  {
    icon: <FaEarthAmericas />,
    value: "24+",
    label: "Cities Covered",
    iconBg: "from-[#8B5E3C] to-[#7A4F30]",
    topBar: "from-[#8B5E3C] to-[#7A4F30]",
    glow: "bg-[#D4B49A]",
  },
  {
    icon: <FaStar />,
    value: "4.9★",
    label: "Average Rating",
    iconBg: "from-[#D4844A] to-[#C4773F]",
    topBar: "from-[#D4844A] to-[#C4773F]",
    glow: "bg-[#F5C4A0]",
  },
];

export default function Stats() {
  return (
    <div className="relative overflow-hidden bg-[#FDF6EC] py-24">

      {/* Background Glows */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#F2C4A0]/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C8DFC9]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full animate-bounce bg-[#F2C4A0] border border-[#C4844A]/30 px-5 py-2 text-sm font-semibold text-[#3D2B1F]">
            Trusted by Pet Lovers
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#3D2B1F] sm:text-5xl">
            Making Every Pet Feel at Home
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#9E7E6A]">
            PetNest helps pet parents find trusted sitters, loving homes,
            and unforgettable care experiences for their furry friends.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="mt-20">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0:    { slidesPerView: 1 },
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-14"
          >
            {stats.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group relative overflow-hidden rounded-3xl border border-[#F2C4A0]/50 bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#C4844A]/10">

                  {/* Gradient Top Bar */}
                  <div className={`absolute inset-x-0 top-0 h-2 bg-linear-to-r ${item.topBar}`} />

                  {/* Glow Circle */}
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${item.glow} opacity-40 blur-2xl transition-all duration-500 group-hover:scale-150`} />

                  <div className="relative z-10">

                    {/* Icon */}
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${item.iconBg} text-white text-3xl shadow-lg`}>
                      {item.icon}
                    </div>

                    {/* Number */}
                    <h3 className="mt-6 text-5xl font-black tracking-tight text-[#3D2B1F]">
                      {item.value}
                    </h3>

                    {/* Label */}
                    <p className="mt-3 text-lg font-medium text-[#9E7E6A]">
                      {item.label}
                    </p>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
}