'use client'
import PetCard from '@/components/cardComponents/PetCard'
import React, { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { MdOutlinePets } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

export default function AllPets() {
  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState([])
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const petCategory = ['All Species', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Turtle', 'Other']

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}pets?searchName=${name}&species=${species}`)
      .then(res => res.json())
      .then(data => { setPets(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [name, species])

  const search = (e) => setName(e.target.value)

  

  return (
    <div className="relative min-h-screen bg-[#FDF6EC] pt-32 pb-20 overflow-x-hidden">

      {/* Background glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#F2C4A0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 -right-20 w-80 h-80 bg-[#C8DFC9]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header ── */}
      <motion.div
        className="text-center px-4 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.span
          className="inline-flex items-center rounded-full bg-[#F2C4A0] border border-[#C4844A]/30 px-5 py-2 text-sm font-semibold text-[#3D2B1F] mb-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
           Find Your Match
        </motion.span>

        <motion.h1
          className="text-4xl md:text-5xl font-black text-[#3D2B1F] tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Adopt Your New
          <span className="text-[#C4844A] italic font-serif"> Family Member</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-base text-[#9E7E6A] max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Hundreds of loving pets are waiting for a forever home just like yours.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="h-px w-16 bg-[#C4844A]/30 rounded-full" />
          <MdOutlinePets className="text-[#C4844A]" />
          <div className="h-px w-16 bg-[#C4844A]/30 rounded-full" />
        </motion.div>
      </motion.div>

      {/* ── Search Bar ── */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center max-w-[680px] mx-auto gap-3 px-4 mb-14 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Search input */}
        <div className="relative flex-[3]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4844A] text-lg pointer-events-none" />
          <input
            onChange={search}
            value={name}
            type="text"
            placeholder="Search by name..."
            className="w-full h-12 pl-11 pr-4 bg-[#FFFDF8] border border-[#E2D8C5] rounded-2xl text-[#3D2B1F] placeholder:text-[#9E7E6A] text-sm font-medium outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200 shadow-[0_2px_8px_rgba(196,132,74,0.06)]"
          />
        </div>

        {/* Species dropdown */}
        <div className="relative flex-1 min-w-[148px]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-12 px-4 bg-[#FFFDF8] border border-[#E2D8C5] rounded-2xl text-sm font-semibold text-[#3D2B1F] flex items-center justify-between gap-2 outline-none hover:border-[#C4844A] transition-all duration-200 shadow-[0_2px_8px_rgba(196,132,74,0.06)]"
          >
            <span className="truncate">{species || 'All Species'}</span>
            <FaChevronDown className={`text-[#C4844A] text-xs flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                className="absolute top-14 left-0 right-0 bg-[#FFFDF8] border border-[#E2D8C5] rounded-2xl shadow-[0_8px_32px_rgba(196,132,74,0.15)] z-50 overflow-hidden"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {petCategory.map((c, i) => (
                  <motion.li
                    key={c}
                    onClick={() => { setSpecies(c === 'All Species' ? '' : c); setIsOpen(false) }}
                    className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-150
                      ${(species === c || (c === 'All Species' && !species))
                        ? 'bg-[#F2C4A0]/50 text-[#C4844A]'
                        : 'text-[#3D2B1F] hover:bg-[#F6F1E8] hover:text-[#C4844A]'
                      }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {c}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Skeletons ── */}
      {loading && (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="flex justify-center max-w-[480px] w-full mx-auto items-center p-8 bg-[#F6F1E8] rounded-3xl min-h-[520px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="max-w-[370px] w-full bg-[#FFFDF8] rounded-2xl overflow-hidden border border-[#E2D8C5]">
                <div className="h-[240px] w-full bg-[#F2C4A0]/30 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-2/3 bg-[#F2C4A0]/40 rounded-full animate-pulse" />
                  <div className="h-3 w-full bg-[#F2C4A0]/25 rounded-full animate-pulse" />
                  <div className="h-3 w-4/5 bg-[#F2C4A0]/25 rounded-full animate-pulse" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-6 w-16 bg-[#F2C4A0]/30 rounded-full animate-pulse" />
                    <div className="h-6 w-12 bg-[#F2C4A0]/30 rounded-full animate-pulse" />
                  </div>
                  <div className="h-11 w-full bg-[#F2C4A0]/30 rounded-xl animate-pulse mt-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Results count ── */}
      <AnimatePresence>
        {!loading && pets.length > 0 && (
          <motion.div
            className="max-w-7xl mx-auto px-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-[#9E7E6A] font-medium">
              Showing <span className="text-[#C4844A] font-bold">{pets.length}</span> pets
              {species && <span> in <span className="text-[#C4844A] font-bold">{species}</span></span>}
              {name && <span> matching <span className="text-[#C4844A] font-bold">"{name}"</span></span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty state ── */}
      <AnimatePresence>
        {!loading && pets.length === 0 && (
          <motion.div
            className="text-center py-24 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-6xl flex text-[#3D2B1F] justify-center mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <MdOutlinePets />
            </motion.div>
            <h3 className="text-xl font-bold text-[#3D2B1F] mb-2">No pets found</h3>
            <p className="text-sm text-[#9E7E6A]">Try a different name or species filter.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pet Grid ── */}
      {!loading && pets.length > 0 && (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {pets.map((pet, ind) => (
            <motion.div
              key={pet._id || ind}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: ind * 0.08,
                ease: 'easeOut'
              }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </div>
      )}

    </div>
  )
  
}