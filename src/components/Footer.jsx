import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { MdEmail, MdPhone, MdLocationPin } from 'react-icons/md'
import { FaHome, FaPaw } from 'react-icons/fa'
import { MdPrivacyTip } from 'react-icons/md'
import { HiMiniSquares2X2 } from 'react-icons/hi2'

export default function Footer() {
    return (
        <footer className="border-t border-[#E2D8C5] bg-[#FDF6EC] px-8 py-12">
            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-[#C4844A] flex items-center justify-center shadow-md">
                                <FaPaw className="text-white text-sm" />
                            </div>
                            <h2 className="text-lg font-bold text-[#3D2B1F]">PetNest</h2>
                        </div>
                        <p className="text-sm text-[#9E7E6A] leading-relaxed">
                            Finding loving homes for every pet. Adopt, don't shop.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-xs font-bold text-[#3D2B1F] uppercase tracking-widest mb-4">Contact</p>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:hello@petnest.com" className="group text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <MdEmail className="text-[#C4844A] text-base flex-shrink-0" />
                                neyamulislam946@gmail.com
                            </a>
                            <a href="tel:+1234567890" className="group text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <MdPhone className="text-[#C4844A] text-base flex-shrink-0" />
                               +8801874062550
                            </a>
                            <span className="text-sm text-[#7A6A50] flex items-center gap-2">
                                <MdLocationPin className="text-[#C4844A] text-base flex-shrink-0" />
                                Dhaka, Bangladesh
                            </span>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="text-xs font-bold text-[#3D2B1F] uppercase tracking-widest mb-4">Follow Us</p>
                        <div className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <FaFacebook className="text-[#C4844A] text-base flex-shrink-0" />
                                Facebook
                            </Link>
                            <Link href="#" className="text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <FaInstagram className="text-[#C4844A] text-base flex-shrink-0" />
                                Instagram
                            </Link>
                            <Link href="#" className="text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <FaXTwitter className="text-[#C4844A] text-base flex-shrink-0" />
                                Twitter / X
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="text-xs font-bold text-[#3D2B1F] uppercase tracking-widest mb-4">Quick Links</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/" className="text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <FaHome className="text-[#C4844A] text-base flex-shrink-0" />
                                Home
                            </Link>
                            <Link href="/all-pets" className="text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <HiMiniSquares2X2 className="text-[#C4844A] text-base flex-shrink-0" />
                                All Pets
                            </Link>
                            <Link href="#" className="text-sm text-[#7A6A50] hover:text-[#C4844A] flex items-center gap-2 transition-colors duration-200">
                                <MdPrivacyTip className="text-[#C4844A] text-base flex-shrink-0" />
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#E2D8C5] pt-5 flex justify-between items-center flex-wrap gap-2">
                    <p className="text-xs text-[#9E7E6A]">© 2025 PetNest. All rights reserved.</p>
                    <p className="text-xs text-[#9E7E6A] flex items-center gap-1">
                        Made with <FaPaw className="text-[#C4844A] text-xs" /> for pets everywhere
                    </p>
                </div>

            </div>
        </footer>
    )
}