'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { MdOutlinePets } from 'react-icons/md';

export default function PetCard({ pet }) {

    return (
        <motion.div
            className="flex justify-center max-w-[480px] w-full mx-auto items-center p-12 bg-[#F6F1E8] rounded-3xl min-h-[580px] transition-all duration-500 hover:bg-[#F0E8D8]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.div
                className="group max-w-[420px] w-full bg-[#FFFDF8] rounded-2xl overflow-hidden border border-[#E2D8C5] shadow-[0_2px_16px_0_rgba(180,160,110,0.10)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_24px_48px_rgba(196,132,74,0.18)] hover:border-[#C4844A]/40"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >

                {/* Image */}
                <figure className="m-0 overflow-hidden rounded-t-xl relative">
                    {pet?.imageUrl && (
                        <>
                            <Image
                                width={600}
                                height={200}
                                src={pet?.imageUrl}
                                alt={pet?.petName}
                                className="w-full h-[270px] object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay shimmer on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Floating badge that appears on hover */}
                            <div className="absolute top-3 right-3 bg-[#C4844A] text-[#FDF6EC] text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400 shadow-lg flex items-center gap-2">
                                <MdOutlinePets />
                                Available
                            </div>
                        </>
                    )}
                </figure>

                <div className="p-7">

                    {/* Pet name */}
                    <motion.h2
                        className="text-[19px] font-medium text-[#3B3120] mb-2 transition-all duration-300 group-hover:text-[#C4844A] group-hover:translate-x-1"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {pet?.petName}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-sm leading-relaxed text-[#7A6A50] mb-6 line-clamp-3 transition-all duration-300 group-hover:text-[#5A4A30]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        {pet?.description}
                    </motion.p>

                    {/* Animated divider */}
                    <motion.div
                        className="h-px bg-[#E2D8C5] mb-6 transition-all duration-500 group-hover:bg-[#C4844A]/40 group-hover:scale-x-110 origin-left"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />

                    {/* Button */}
                    <motion.div
                        className="flex justify-end"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.35 }}
                    >
                        <Link className="w-full" href={`details/${pet?._id}`}>
                            <motion.button
                                className="relative w-full overflow-hidden bg-[#7C5C2E] hover:bg-[#C4844A] btn border-none text-[#F6F1E8] rounded-lg px-5 py-3 text-sm font-medium cursor-pointer tracking-wide transition-all duration-300 group/btn hover:shadow-[0_8px_20px_rgba(196,132,74,0.35)] active:scale-95"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {/* Shine sweep */}
                                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out" />

                                {/* Ripple glow */}
                                <span className="absolute inset-0 rounded-lg bg-[#E8A94F]/0 group-hover/btn:bg-[#E8A94F]/10 transition-all duration-300" />

                                <span className="relative flex items-center justify-center gap-2">
                                    View Details
                                    <motion.span
                                        className="group-hover/btn:text-[#F2C4A0]"
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaArrowRightLong />
                                    </motion.span>
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>

                </div>
            </motion.div>
        </motion.div>
    );
}