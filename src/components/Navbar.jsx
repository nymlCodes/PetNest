'use client'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FaPaw } from 'react-icons/fa'
import { MdDashboard, MdOutlinePets } from 'react-icons/md'
import { HiMenu, HiX } from 'react-icons/hi'
import { IoLogOutOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-pets', label: 'All Pets' },
    { href: '/add-pets', label: 'Add Pet' },
]

export default function Navbar() {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const router = useRouter()
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    const logOutButton = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login")
                    toast.info("Logged out successfully")
                },
            },
        })
    }

    return (
        <>
            <div className="navbar fixed top-0 z-50 px-4 lg:px-10 bg-[#FBF2E6]/90 backdrop-blur-md border-b border-[#E8D5BE] shadow-sm text-[#3E2C20]">

                <div className='max-w-[1200px] flex  w-full mx-auto'> 
                    {/* ── Logo ── */}
                    <div className="navbar-start">
                        <Link href="/">
                            <Image width={70} height={70} alt='logo' src={'/logo.png'} className="cursor-pointer" />
                        </Link>
                    </div>

                    {/* ── Desktop Nav ── */}
                    <div className="navbar-center hidden lg:flex justify-center">
                        <ul className="flex items-center gap-1">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                                        ${pathname === link.href
                                                ? 'text-[#C4844A] bg-[#F2C4A0]/30'
                                                : 'text-[#3D2B1F] hover:text-[#C4844A] hover:bg-[#F2C4A0]/20'
                                            }`}
                                    >
                                        {link.label}
                                        {pathname === link.href && (
                                            <motion.div
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C4844A] rounded-full"
                                                layoutId="activeNav"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Right side ── */}
                    <div className="navbar-end gap-2">
                        {session ? (
                            <div className="flex items-center gap-2">

                                {/* Avatar + dropdown */}
                                <div className="dropdown dropdown-end">
                                    <label
                                        tabIndex={0}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        {/* Avatar */}
                                        <div className="w-9 h-9 rounded-full ring-2 ring-[#C4844A]/40 ring-offset-1 overflow-hidden flex-shrink-0 transition-all duration-200 group-hover:ring-[#C4844A]">
                                            {session.user?.image ? (
                                                <Image
                                                    src={session.user.image}
                                                    alt={session.user?.name ?? "User"}
                                                    width={36} height={36}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#C4844A] flex items-center justify-center text-white text-sm font-bold">
                                                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[#C4844A] text-xs hidden sm:block">▾</span>
                                    </label>

                                    <ul tabIndex={0} className="dropdown-content menu p-0 shadow-[0_8px_32px_rgba(61,43,31,0.15)] bg-[#FFFDF8] border border-[#E2D8C5] rounded-2xl w-64 mt-3 overflow-hidden">

                                        {/* User info */}
                                        <li className="px-4 py-3.5 border-b border-[#E2D8C5] pointer-events-none bg-[#F6F1E8]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#C4844A] flex items-center justify-center text-white font-bold flex-shrink-0 text-sm shadow">
                                                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-sm text-[#3D2B1F] leading-tight truncate">{user?.name}</p>
                                                    <p className="text-xs text-[#9E7E6A] truncate">{user?.email}</p>
                                                </div>
                                            </div>
                                        </li>

                                        {/* Dashboard */}
                                        <div className="p-2 space-y-1">
                                            <li >
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#3D2B1F] hover:bg-[#F6F1E8] hover:text-[#C4844A] transition-all duration-200 font-medium"
                                                >
                                                    <span className="w-7 h-7 rounded-lg bg-[#F2C4A0]/40 flex items-center justify-center text-[#C4844A]">
                                                        <MdDashboard className="text-sm" />
                                                    </span>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/all-pets"
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#3D2B1F] hover:bg-[#F6F1E8] hover:text-[#C4844A] transition-all duration-200 font-medium"
                                                >
                                                    <span className="w-7 h-7 rounded-lg bg-[#F2C4A0]/40 flex items-center justify-center text-[#C4844A]">
                                                        <MdOutlinePets className="text-sm" />
                                                    </span>
                                                    Browse Pets
                                                </Link>
                                            </li>
                                        </div>

                                        {/* Sign out */}
                                        <div className="p-2 border-t border-[#E2D8C5]">
                                            <li>
                                                <button
                                                    onClick={logOutButton}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full font-medium"
                                                >
                                                    <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400">
                                                        <IoLogOutOutline className="text-sm" />
                                                    </span>
                                                    Sign out
                                                </button>
                                            </li>
                                        </div>

                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-semibold text-[#3D2B1F] hover:text-[#C4844A] transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="relative overflow-hidden px-5 py-2 bg-[#3D2B1F] hover:bg-[#C4844A] text-white text-sm font-semibold rounded-xl transition-all duration-300 group"
                                >
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                                    <span className="relative flex items-center gap-1.5">
                                        <FaPaw className="text-xs" />
                                        Get Started
                                    </span>
                                </Link>
                            </div>
                        )}

                        {/* ── Mobile hamburger ── */}
                        <button
                            className="lg:hidden ml-1 p-2 rounded-xl text-[#3D2B1F] hover:bg-[#F2C4A0]/30 transition-colors duration-200"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
                        </button>
                    </div>

                </div>


            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-[#3D2B1F]/20 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            className="absolute top-0 right-0 h-full w-72 bg-[#FFFDF8] border-l border-[#E2D8C5] shadow-2xl flex flex-col"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {/* Drawer header */}
                            <div className="px-6 py-5 border-b border-[#E2D8C5] bg-[#F6F1E8] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#C4844A] rounded-xl flex items-center justify-center shadow">
                                        <FaPaw className="text-white text-xs" />
                                    </div>
                                    <span className="font-black text-[#3D2B1F]">Pet Nest</span>
                                </div>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-[#F2C4A0]/30 text-[#3D2B1F] transition-colors"
                                >
                                    <HiX className="text-lg" />
                                </button>
                            </div>

                            {/* User info (if logged in) */}
                            {session && (
                                <div className="px-6 py-4 border-b border-[#E2D8C5]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#C4844A] flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0">
                                            {user?.name?.[0]?.toUpperCase() ?? "U"}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-sm text-[#3D2B1F] truncate">{user?.name}</p>
                                            <p className="text-xs text-[#9E7E6A] truncate">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Nav links */}
                            <nav className="flex flex-col gap-1 p-4 flex-1">
                                <p className="text-xs font-bold text-[#9E7E6A] uppercase tracking-widest px-3 mb-2">Menu</p>
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200
                                                ${pathname === link.href
                                                    ? 'bg-[#C4844A] text-white shadow-[0_4px_12px_rgba(196,132,74,0.3)]'
                                                    : 'text-[#3D2B1F] hover:bg-[#F6F1E8] hover:text-[#C4844A]'
                                                }`}
                                        >
                                            {link.label}
                                            {pathname === link.href && (
                                                <span className="ml-auto w-2 h-2 rounded-full bg-white opacity-80" />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}

                                {session && (
                                    <>
                                        <div className="h-px bg-[#E2D8C5] my-2" />
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.25 }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-[#3D2B1F] hover:bg-[#F6F1E8] hover:text-[#C4844A] transition-all duration-200"
                                            >
                                                <MdDashboard className="text-base text-[#C4844A]" />
                                                Dashboard
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </nav>

                            {/* Bottom actions */}
                            <div className="p-4 border-t border-[#E2D8C5]">
                                {session ? (
                                    <button
                                        onClick={() => { logOutButton(); setMobileOpen(false) }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 text-red-400 hover:text-white text-sm font-semibold transition-all duration-300 group"
                                    >
                                        <IoLogOutOutline className="text-base" />
                                        Sign Out
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileOpen(false)}
                                            className="w-full text-center px-4 py-3 rounded-2xl border border-[#E2D8C5] text-[#3D2B1F] text-sm font-semibold hover:border-[#C4844A] hover:text-[#C4844A] transition-all duration-200"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setMobileOpen(false)}
                                            className="w-full text-center px-4 py-3 rounded-2xl bg-[#3D2B1F] hover:bg-[#C4844A] text-white text-sm font-semibold transition-all duration-300"
                                        >
                                            <MdOutlinePets />
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}