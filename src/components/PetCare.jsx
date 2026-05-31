'use client'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { FaBowlFood, FaHospital, FaShieldHeart } from 'react-icons/fa6'
import { IoLogoOctocat } from 'react-icons/io'
import { MdOutlinePets } from 'react-icons/md'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const cards = [
  {
    icon: <FaBowlFood />,
    title: 'Nutrition & Hydration',
    desc: 'Feed high-quality food appropriate for your pet\'s age and size. Always provide clean, fresh water, and keep harmful foods like chocolate or onions far out of reach.',
    iconBg: 'bg-[#F2C4A0]/40 border-[#F2C4A0]',
    iconHover: 'group-hover:bg-[#C4844A]',
    topBar: 'from-[#C4844A] to-[#B8773F]',
  },
  {
    icon: <FaHospital />,
    title: 'Routine Vet Care',
    desc: 'Schedule annual check-ups, stay up-to-date on essential vaccinations, and maintain regular flea, tick, and heartworm prevention to catch issues early.',
    iconBg: 'bg-[#C8DFC9]/40 border-[#C8DFC9]',
    iconHover: 'group-hover:bg-[#7A9E7E]',
    topBar: 'from-[#7A9E7E] to-[#6B8F6F]',
  },
  {
    icon: <IoLogoOctocat />,
    title: 'Exercise & Play',
    desc: 'Physical activity and mental stimulation are vital. Daily walks, interactive toys, and scratching posts keep your pets fit and prevent behavioral problems.',
    iconBg: 'bg-[#F5DBA8]/40 border-[#F5DBA8]',
    iconHover: 'group-hover:bg-[#E8A94F]',
    topBar: 'from-[#E8A94F] to-[#D4963C]',
  },
  {
    icon: <FaHome />,
    title: 'A Safe Environment',
    desc: 'Microchip your pet and keep a collar with an ID tag on them at all times. Secure toxic houseplants and make sure hazardous household chemicals are locked away.',
    iconBg: 'bg-[#D4B49A]/40 border-[#D4B49A]',
    iconHover: 'group-hover:bg-[#8B5E3C]',
    topBar: 'from-[#8B5E3C] to-[#7A4F30]',
  },
  {
    icon: <FaShieldHeart />,
    title: 'Love & Bonding',
    desc: 'Spend quality time with your pet every day. Gentle grooming, cuddles, and training sessions strengthen trust and help your companion feel secure and loved.',
    iconBg: 'bg-[#F5C4D0]/40 border-[#F5C4D0]',
    iconHover: 'group-hover:bg-[#C4607A]',
    topBar: 'from-[#C4607A] to-[#B8506A]',
  },
]

export default function PetCare() {
  return (
    <section className="relative overflow-hidden bg-[#FFFBF5] px-6 py-24">

      {/* Background glows */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#F2C4A0]/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#C8DFC9]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex justify-center items-center gap-2 rounded-full bg-[#F2C4A0] border border-[#C4844A]/30 px-5 py-2 text-sm font-semibold text-[#3D2B1F] mb-6 animate-bounce">
            <MdOutlinePets /> Care Guide
          </span>
          <h2 className="text-4xl font-black text-[#3D2B1F] mb-4 tracking-tight">
            Essential Pet Care Tips
          </h2>
          <p className="text-base text-[#9E7E6A] leading-relaxed">
            Bringing a new companion home is an incredibly rewarding journey. Whether you are a first-time adopter or an experienced pet parent, keeping these fundamental care tips in mind will ensure your new best friend stays happy, healthy, and safe.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-[#C4844A]/30 rounded-full" />
            <span className="text-[#C4844A] text-lg"><MdOutlinePets /></span>
            <div className="h-px w-16 bg-[#C4844A]/30 rounded-full" />
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-14"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="group relative overflow-hidden bg-[#FFFDF8] p-7 rounded-2xl border border-[#E2D8C5] shadow-[0_2px_16px_rgba(180,160,110,0.08)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(196,132,74,0.15)] hover:border-[#C4844A]/40 cursor-default">

                {/* Gradient top bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.topBar} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                {/* Glow on hover */}
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#F2C4A0]/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl text-[#3D2B1F] mb-6 transition-all duration-300 ${card.iconBg} ${card.iconHover} group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(196,132,74,0.3)]`}>
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#3D2B1F] mb-2 transition-colors duration-300 group-hover:text-[#C4844A]">
                    {card.title}
                  </h3>

                  {/* Animated divider */}
                  <div className="h-px bg-[#E2D8C5] mb-3 transition-all duration-500 group-hover:bg-[#C4844A]/40 group-hover:scale-x-110 origin-left" />

                  {/* Description */}
                  <p className="text-sm text-[#7A6A50] leading-relaxed transition-colors duration-300 group-hover:text-[#5A4A30]">
                    {card.desc}
                  </p>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}