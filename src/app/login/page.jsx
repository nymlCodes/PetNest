'use client'
import { authClient } from '@/lib/auth-client'
import { betterAuth } from 'better-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaGoogle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { FaPaw } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Login() {
  const [password, setPassword] = useState(false)
  // const auth = betterAuth

  const googleButton = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const router = useRouter()

  const loginButton = async (e) => {
    e.preventDefault()
    const password = e.target.password.value
    const email = e.target.email.value

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
      callbackURL: '/',
    });

    // console.log(data);
    if (error) {
      toast.error(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 bg-[#FDF6EC] overflow-hidden">

      {/* Background glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#F2C4A0]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#C8DFC9]/20 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={loginButton} className="relative max-w-[600px] w-full mx-auto mt-20 ">

        <div className="bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl shadow-[0_8px_40px_rgba(196,132,74,0.12)] md:p-10 p-6">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#C4844A] rounded-2xl shadow-[0_4px_16px_rgba(196,132,74,0.35)] mb-4">
              <FaPaw className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-[#3D2B1F]">Welcome Back</h1>
            <p className="text-sm text-[#9E7E6A] mt-1">Login to your PetNest account</p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="hello@example.com"
              className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={password ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 pr-11 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
              />
              <span
                onClick={() => setPassword(!password)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E7E6A] hover:text-[#C4844A] transition-colors"
              >
                {password ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="relative w-full h-12 rounded-xl overflow-hidden bg-[#3D2B1F] hover:bg-[#C4844A] text-[#FDF6EC] font-semibold tracking-wide shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center justify-center gap-2">
              Login
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>

          {/* Register link */}
          <p className="text-sm text-[#9E7E6A] mt-4 text-center">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#C4844A] font-semibold hover:text-[#B8773F] transition-colors duration-200">
              Register
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E2D8C5]" />
            <span className="text-xs text-[#9E7E6A] font-medium uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#E2D8C5]" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={googleButton}
            className="relative w-full h-12 rounded-xl overflow-hidden bg-white border border-[#E2D8C5] hover:border-[#C4844A] text-[#3D2B1F] font-semibold shadow-sm hover:shadow-[0_4px_16px_rgba(196,132,74,0.15)] active:scale-[0.98] transition-all duration-300 cursor-pointer group flex items-center justify-center gap-3"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#C4844A]/5 to-transparent transition-transform duration-700 ease-in-out" />
            <FaGoogle className="text-[#C4844A] text-base relative z-10" />
            <span className="relative z-10">Log in with Google</span>
          </button>

        </div>

      </form>
    </div>
  )
}