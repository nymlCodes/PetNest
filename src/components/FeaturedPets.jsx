'use client'
import React, { useEffect, useState } from 'react'
import PetCard from './cardComponents/PetCard'
import { motion } from 'framer-motion'
import { FaPaw } from 'react-icons/fa'
import { MdOutlinePets } from 'react-icons/md'
import Link from 'next/link'

export default function FeaturedPets() {
  const [pets, setPets] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}pets`)
      .then(res => res.json())
      .then(data => setPets(data))
  }, [])

  return (
    <div className="relative py-24 bg-[#FFFBF5] overflow-hidden">

      {/* Background glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#F2C4A0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#C8DFC9]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header ── */}
      <motion.div
        className="text-center px-4 mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Badge */}
        <motion.span
          className="inline-flex items-center rounded-full bg-[#F2C4A0] border border-[#C4844A]/30 px-5 py-2 text-sm font-semibold text-[#3D2B1F] mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MdOutlinePets />
          Featured This Week
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-black text-[#3D2B1F] max-w-[620px] mx-auto leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Meet Our{' '}
          <span className="text-[#C4844A] italic font-serif">Featured</span>
          {' '}Pets of the Week!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base md:text-lg text-[#9E7E6A] max-w-[680px] mx-auto mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Looking for a new best friend? These wonderful animals are ready
          to find their forever homes. Could it be with you?
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="h-px w-16 bg-[#C4844A]/30 rounded-full" />
          <FaPaw className="text-[#C4844A] text-sm" />
          <div className="h-px w-16 bg-[#C4844A]/30 rounded-full" />
        </motion.div>
      </motion.div>

      {/* ── Pet Grid ── */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pets.slice(0, 6).map((pet, ind) => (
          <motion.div
            key={ind}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: ind * 0.1,
              ease: 'easeOut'
            }}
          >
            <PetCard pet={pet} />
          </motion.div>
        ))}
      </div>

      {/* ── View All button ── */}
      <motion.div
        className="text-center mt-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link href="/all-pets">
          <motion.button
            className="relative overflow-hidden bg-[#3D2B1F] hover:bg-[#7e7a77] text-[#FDF6EC] font-semibold px-10 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              <MdOutlinePets className="text-lg" />
              View All Pets
            </span>
          </motion.button>
        </Link>
      </motion.div>

    </div>
  )
}