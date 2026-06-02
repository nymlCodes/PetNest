import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import EditModal from '../EditModal'
import { IoLocationSharp } from 'react-icons/io5'
import DeleteModal from '../DeleteModal'
import RequestModal from '../RequestModal'
import { FaArrowRightLong } from 'react-icons/fa6'

export default function MyPet({ pet, onAdopted }) {
    return (
        <div className="group bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(196,132,74,0.07)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(196,132,74,0.15)] hover:border-[#C4844A]/40 transition-all duration-500">

            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={pet.imageUrl}
                    alt={pet.petName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h2 className="text-lg font-bold text-[#3D2B1F] transition-colors duration-300 group-hover:text-[#C4844A]">
                            {pet.petName}
                        </h2>
                        <p className="text-xs text-[#9E7E6A] mt-0.5">
                            {pet.species} • {pet.breed}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-[#9E7E6A] mb-0.5">Fee</p>
                        <h3 className="text-base font-bold text-[#7A9E7E]">
                            {pet.adoptionFee === '0' || pet.adoptionFee === 0 ? 'Free' : `$${pet.adoptionFee}`}
                        </h3>
                    </div>
                </div>

                <div className="h-px bg-[#E2D8C5] mb-4 transition-all duration-500 group-hover:bg-[#C4844A]/30" />

                <div className="flex flex-wrap gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F6F1E8] text-[#7A6A50] border border-[#E2D8C5]">
                        {pet.gender}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F6F1E8] text-[#7A6A50] border border-[#E2D8C5]">
                        Age {pet.age}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F6F1E8] text-[#7A6A50] border border-[#E2D8C5] flex items-center gap-1">
                        <IoLocationSharp className="text-[#C4844A]" />
                        {pet.location}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                    <RequestModal pet={pet} onAdopted={onAdopted} />
                    <EditModal pet={pet} />
                    <Link href={`/details/${pet?._id}`} className="w-full">
                        <button className="relative w-full overflow-hidden bg-[#3D2B1F] hover:bg-[#C4844A] text-[#FDF6EC] border border-[#3D2B1F] hover:border-[#C4844A] py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer group">
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                            <span className="relative flex items-center justify-center gap-1.5">
                                View
                                <FaArrowRightLong className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>
                    </Link>
                    <DeleteModal pet={pet} />
                </div>
            </div>
        </div>
    )
}