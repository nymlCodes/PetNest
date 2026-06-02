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
    desc: "Feed high-quality food appropriate for your pet's age and size. Always provide clean, fresh water, and keep harmful foods like chocolate or onions far out of reach.",
    iconBg: 'bg-[#F2C4A0]/40 border-[#F2C4A0]',
    iconHover: 'group-hover:bg-[#C4844A]',
    topBar: 'from-[#C4844A] to-[#B8773F]',
    glow: 'bg-[#F2C4A0]',
  },
  {
    icon: <FaHospital />,
    title: 'Routine Vet Care',
    desc: 'Schedule annual check-ups, stay up-to-date on essential vaccinations, and maintain regular flea, tick, and heartworm prevention to catch issues early.',
    iconBg: 'bg-[#C8DFC9]/40 border-[#C8DFC9]',
    iconHover: 'group-hover:bg-[#7A9E7E]',
    topBar: 'from-[#7A9E7E] to-[#6B8F6F]',
    glow: 'bg-[#C8DFC9]',
  },
  {
    icon: <IoLogoOctocat />,
    title: 'Exercise & Play',
    desc: 'Physical activity and mental stimulation are vital. Daily walks, interactive toys, and scratching posts keep your pets fit and prevent behavioral problems.',
    iconBg: 'bg-[#F5DBA8]/40 border-[#F5DBA8]',
    iconHover: 'group-hover:bg-[#E8A94F]',
    topBar: 'from-[#E8A94F] to-[#D4963C]',
    glow: 'bg-[#F5DBA8]',
  },
  {
    icon: <FaHome />,
    title: 'A Safe Environment',
    desc: 'Microchip your pet and keep a collar with an ID tag on them at all times. Secure toxic houseplants and make sure hazardous household chemicals are locked away.',
    iconBg: 'bg-[#D4B49A]/40 border-[#D4B49A]',
    iconHover: 'group-hover:bg-[#8B5E3C]',
    topBar: 'from-[#8B5E3C] to-[#7A4F30]',
    glow: 'bg-[#D4B49A]',
  },
  {
    icon: <FaShieldHeart />,
    title: 'Love & Bonding',
    desc: 'Spend quality time with your pet every day. Gentle grooming, cuddles, and training sessions strengthen trust and help your companion feel secure and loved.',
    iconBg: 'bg-[#F5C4D0]/40 border-[#F5C4D0]',
    iconHover: 'group-hover:bg-[#C4607A]',
    topBar: 'from-[#C4607A] to-[#B8506A]',
    glow: 'bg-[#F5C4D0]',
  },
]

export default function PetCare() {
  return (
    // ✅ removed overflow-hidden from section — it was clipping the hover lift
    <section className="relative bg-[#FFFBF5] px-6 py-24">

      {/* Background glows — now on a separate clipped div so they don't escape */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#F2C4A0]/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#C8DFC9]/20 blur-3xl" />
      </div>

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
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="petcare-swiper"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden bg-[#FFFDF8] p-7 rounded-2xl border border-[#E2D8C5] shadow-[0_2px_16px_rgba(180,160,110,0.08)] h-full flex flex-col">

                {/* Gradient top bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.topBar}`} />

                {/* Glow */}
                <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${card.glow} blur-2xl opacity-30`} />

                <div className="relative z-10 flex flex-col flex-1">

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl text-[#3D2B1F] mb-6 ${card.iconBg}`}>
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#3D2B1F] mb-2">
                    {card.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-px bg-[#E2D8C5] mb-3" />

                  {/* Description */}
                  <p className="text-sm text-[#7A6A50] leading-relaxed">
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