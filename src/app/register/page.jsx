"use client";

import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const authClient = createAuthClient()

  const googleButton = async () => {
    await authClient.signIn.social({
      provider: "google",
      rememberMe: false,
      query: { prompt: "select_account" }
    });
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    url: '',
    password: '',
    confirmPass: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { name, email, url, password, confirmPass } = formData;

    if (!name || !email || !url || !password || !confirmPass) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    if (!hasUppercase || !hasLowercase) {
      setError('Password must contain at least one uppercase and one lowercase letter.');
      return;
    }
    if (password !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: url,
      callbackURL: "/login",
    });

    if (error) {
      toast.error(error.message)
      return;
    } else {
      router.push('/login')
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen pt-30 px-4 bg-[#FDF6EC] overflow-hidden">

      {/* Background glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#F2C4A0]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#C8DFC9]/20 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={onSubmit} className="relative max-w-[600px] w-full mx-auto pb-10">

        <div className="bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl shadow-[0_8px_40px_rgba(196,132,74,0.12)] md:p-10 p-6">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#C4844A] rounded-2xl shadow-[0_4px_16px_rgba(196,132,74,0.35)] mb-4">
              <FaPaw className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-[#3D2B1F]">Create Account</h1>
            <p className="text-sm text-[#9E7E6A] mt-1">Join PetNest and find your forever friend</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-5 text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-[#C8DFC9]/40 border border-[#7A9E7E] text-[#4A7A4E] p-3 rounded-xl mb-5 text-sm font-medium">
              Registration successful! Redirecting...
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
            />
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">Photo URL</label>
            <input
              type="url"
              name="url"
              placeholder="https://your-photo-url.com"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Min 8 chars, A-Z & a-z"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 pr-11 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E7E6A] hover:text-[#C4844A] transition-colors"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                name="confirmPass"
                placeholder="Re-enter your password"
                value={formData.confirmPass}
                onChange={handleChange}
                required
                className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 pr-11 text-[#3B3120] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A] focus:border-transparent transition"
              />
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E7E6A] hover:text-[#C4844A] transition-colors"
              >
                {showConfirmPass ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="relative w-full h-12 rounded-xl overflow-hidden bg-[#3D2B1F] hover:bg-[#C4844A] text-[#FDF6EC] font-semibold tracking-wide shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center justify-center gap-2">
              Create Account
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>

          {/* Login link */}
          <p className="text-sm text-[#9E7E6A] mt-4 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-[#C4844A] font-semibold hover:text-[#B8773F] transition-colors duration-200">
              Login
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
            <span className="relative z-10">Register with Google</span>
          </button>

        </div>
      </form>
    </div>
  );
}