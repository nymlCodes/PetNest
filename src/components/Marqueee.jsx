import React from 'react'
import Marquee from 'react-fast-marquee'
import { MdOutlinePets } from 'react-icons/md'

export default function Marqueee() {
    return (
        <Marquee className='mt-[89px] py-2 text-[#6B4C2A] bg-[#F2E8D9] flex items-center gap-10'>
            <span className='mx-10'>Thousands of happy tails started at PetNest</span>
            <MdOutlinePets />

            <span className='mx-10'>Adopt responsibly</span>
            <MdOutlinePets />

            <span className='mx-10'>Rescue with love</span>
            <MdOutlinePets />

            <span className='mx-10'>Give a pet the forever home they deserve</span>
            <MdOutlinePets />

            <span className='mx-10'>Every pet deserves a loving family</span>
            <MdOutlinePets />

            <span className='mx-10'>Small paws, big love</span>
            <MdOutlinePets />

            <span className='mx-10'>Be the reason a pet smiles today</span>
            <MdOutlinePets />

            <span className='mx-10'>Find your new best friend</span>
            <MdOutlinePets />

            <span className='mx-10'>Love knows no breed</span>
            <MdOutlinePets />

            <span className='mx-10'>Together, we can make tails wag</span>
        </Marquee>
    )
}
