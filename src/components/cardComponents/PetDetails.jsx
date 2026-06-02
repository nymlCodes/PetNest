'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdOutlinePets } from 'react-icons/md';

export default function PetDetails({ pet }) {


    const router = useRouter()
    const { data: session } = authClient.useSession()
    const user = session?.user
    const {
        _id, petName, species, gender, healthStatus,
        vaccinationStatus, adoptionFee, location,
        ownerEmail, ownerName, ownerId
    } = pet;

    const [alreadyRequested, setAlreadyRequested] = useState(false)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const getToken = async () => {
            const { data: tokenData } = await authClient.token()
            setToken(tokenData?.token)
        }
        getToken()
    }, [])

    useEffect(() => {
        if (!user?.id) { setLoading(false); return }
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests?adopterId=${user.id}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                const already = data.some(req => req.petId === _id)
                setAlreadyRequested(already)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [user?.id, _id, token])

    const adoptButton = async (e) => {
        e.preventDefault()
        if (user?.id === ownerId) {
            toast('This pet was added by you.')
            return
        }
        const formData = new FormData(e.currentTarget)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                petId: _id, petName, ownerId,
                adopterId: user?.id,
                adopterName: user?.name,
                adopterEmail: user?.email,
                pickupDate: formData.get('pickupDate'),
                message: formData.get('message'),
                status: 'pending',
                createdAt: new Date()
            })
        })
        const data = await res.json()
        if (data.alreadyRequested) {
            toast.info('You have already sent an adoption request for this pet.')
            return
        }
        if (data.insertedId) {
            setAlreadyRequested(true)
            toast.success('Request sent successfully!')
            router.push('/')
        }
    }

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: 'easeOut' }
    })

    return (
        <div className="text-black mt-2 lg:mt-20 flex justify-center items-center min-h-screen p-4 md:p-8 bg-[#FDF6EC]">
            <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-8 items-stretch w-full max-w-6xl mx-auto mt-30 md:mt-0">

                {/* ── Left: Pet Details Card ── */}
                <motion.div
                    className="p-6 md:p-8 flex-1 w-full bg-[#FFFDF8] rounded-3xl border border-[#E2D8C5] shadow-[0_4px_24px_rgba(196,132,74,0.08)] flex flex-col justify-between"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="w-full flex flex-col gap-6">

                        {/* Pet Image */}
                        <motion.div
                            className="relative h-[210px] w-full shrink-0 overflow-hidden rounded-2xl shadow-inner border border-[#E2D8C5]"
                            {...fadeUp(0.1)}
                        >
                            {pet?.imageUrl ? (
                                <Image
                                    alt={petName || 'Pet Image'}
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                    src={pet.imageUrl}
                                    width={400} height={400} priority
                                />
                            ) : (
                                <div className="w-full h-full bg-[#F6F1E8] flex items-center justify-center text-sm text-[#9E7E6A]">
                                    <MdOutlinePets />
                                    No Image Available
                                </div>
                            )}
                        </motion.div>

                        <div className="flex flex-1 flex-col gap-4">

                            {/* Name & Description */}
                            <motion.div
                                className="flex flex-col gap-1 border-b border-[#E2D8C5] pb-3"
                                {...fadeUp(0.2)}
                            >
                                <h2 className="font-bold text-2xl text-[#3D2B1F]">{petName}</h2>
                                <p className="text-sm text-[#9E7E6A] leading-relaxed mt-1 min-h-30">
                                    {pet?.description || 'No description provided.'}
                                </p>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-[#E2D8C5] pb-4"
                                {...fadeUp(0.25)}
                            >
                                <p className="text-sm text-[#7A6A50]"><span className="font-semibold text-[#3D2B1F]">Species:</span> {species}</p>
                                <p className="text-sm text-[#7A6A50]"><span className="font-semibold text-[#3D2B1F]">Breed:</span> {pet?.breed || 'Unknown'}</p>
                                <p className="text-sm text-[#7A6A50]"><span className="font-semibold text-[#3D2B1F]">Age:</span> {pet?.age || 'N/A'}</p>
                                <p className="text-sm text-[#7A6A50]"><span className="font-semibold text-[#3D2B1F]">Gender:</span> {gender}</p>
                            </motion.div>

                            {/* Health Profile */}
                            <motion.div
                                className="bg-[#F6F1E8] border border-[#E2D8C5] p-4 rounded-xl space-y-1.5"
                                {...fadeUp(0.3)}
                            >
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C4844A]">Health Profile</h3>
                                <p className="text-sm text-[#7A6A50]"><span className="font-medium text-[#3D2B1F]">Health Status:</span> {healthStatus}</p>
                                <p className="text-sm text-[#7A6A50]"><span className="font-medium text-[#3D2B1F]">Vaccine Status:</span> {vaccinationStatus}</p>
                            </motion.div>

                            {/* Logistics */}
                            <motion.div className="pt-2 space-y-1" {...fadeUp(0.35)}>
                                <p className="text-sm text-[#7A6A50]"><span className="font-medium text-[#3D2B1F]">Location:</span> {location}</p>
                                <p className="text-sm text-[#7A6A50]">
                                    <span className="font-medium text-[#3D2B1F]">Adoption Fee:</span>
                                    <span className="ml-1 font-semibold text-[#7A9E7E]">
                                        {adoptionFee === 0 || adoptionFee === '0' ? 'Free' : `$${adoptionFee}`}
                                    </span>
                                </p>
                                {ownerName && (
                                    <p className="text-sm text-[#9E7E6A] pt-1 ">
                                        <span className="font-medium text-[#3D2B1F]">Listed by:</span> {ownerName} <br />
                                        <span className="font-medium text-[#3D2B1F]">Email Address:</span> {ownerEmail}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Right: Adoption Form ── */}
                <motion.div
                    className="flex-1 w-full rounded-3xl border border-[#E2D8C5] bg-[#FFFDF8] p-6 md:p-8 shadow-[0_4px_24px_rgba(196,132,74,0.08)] flex flex-col justify-between"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                >
                    {/* Form header */}
                    <motion.div className="mb-6" {...fadeUp(0.2)}>
                        <span className="inline-flex items-center rounded-full bg-[#F2C4A0] border border-[#C4844A]/30 px-4 py-1.5 text-xs font-semibold text-[#3D2B1F] mb-3">
                            <MdOutlinePets />
                            Adoption Request
                        </span>
                        <h3 className="text-xl font-bold text-[#3D2B1F]">Apply to Adopt {petName}</h3>
                        <p className="text-sm text-[#9E7E6A] mt-1">Fill in your details and we'll connect you with the owner.</p>
                    </motion.div>

                    {/* Already requested banner */}
                    {alreadyRequested && (
                        <motion.div
                            className="mb-6 flex items-center gap-3 bg-[#C8DFC9]/30 border border-[#7A9E7E]/40 rounded-2xl px-5 py-4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-2xl">✅</span>
                            <div>
                                <p className="text-sm font-bold text-[#3D2B1F]">Request Already Sent</p>
                                <p className="text-xs text-[#9E7E6A] mt-0.5">You've already applied to adopt {petName}. We'll notify you of any updates.</p>
                            </div>
                        </motion.div>
                    )}

                    <form className="space-y-4 text-sm w-full" onSubmit={adoptButton}>
                        <input type="hidden" name="ownerId" value={ownerId || ""} />

                        {/* Pet Name */}
                        <motion.div {...fadeUp(0.25)}>
                            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1">Pet Name</label>
                            <input value={petName || ""} type="text" name="petName" readOnly
                                className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 font-medium text-[#3B3120] cursor-not-allowed outline-none select-none" />
                        </motion.div>

                        {/* Applicant Name */}
                        <motion.div {...fadeUp(0.3)}>
                            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1">Applicant Name</label>
                            <input value={user?.name || ''} type="text" name="userName" readOnly
                                className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 font-medium text-[#3B3120] cursor-not-allowed outline-none select-none" />
                        </motion.div>

                        {/* Applicant Email */}
                        <motion.div {...fadeUp(0.35)}>
                            <label className="block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1">Applicant Email</label>
                            <input value={user?.email || ''} type="email" name="userEmail" readOnly
                                className="w-full h-11 bg-[#F6F1E8] border border-[#E2D8C5] rounded-xl px-4 font-medium text-[#3B3120] cursor-not-allowed outline-none select-none" />
                        </motion.div>

                        {/* Pickup Date */}
                        <motion.div {...fadeUp(0.4)}>
                            <label className="block text-xs font-semibold text-[#3D2B1F] uppercase tracking-wide mb-1">Pickup / Visit Date</label>
                            <input type="date" name="pickupDate" required disabled={alreadyRequested}
                                className="w-full h-11 bg-white border border-[#E2D8C5] rounded-xl px-4 text-[#3B3120] focus:ring-2 focus:ring-[#C4844A] focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed" />
                        </motion.div>

                        {/* Message */}
                        <motion.div {...fadeUp(0.45)}>
                            <label className="block text-xs font-semibold text-[#3D2B1F] uppercase tracking-wide mb-1">Message to Shelter</label>
                            <textarea name="message" required rows={4} disabled={alreadyRequested}
                                placeholder="Describe your living setup, pet experience, or any questions..."
                                className="w-full rounded-xl border border-[#E2D8C5] bg-white px-4 py-2.5 text-[#3B3120] placeholder:text-[#9E7E6A] focus:ring-2 focus:ring-[#C4844A] focus:border-transparent outline-none transition resize-none disabled:opacity-50 disabled:cursor-not-allowed" />
                        </motion.div>

                        {/* Submit */}
                        <motion.div {...fadeUp(0.5)}>
                            {alreadyRequested ? (
                                <div className="w-full h-12 mt-2 rounded-xl bg-[#C8DFC9]/40 border border-[#7A9E7E]/40 text-[#4A7A4E] font-semibold flex items-center justify-center gap-2 cursor-not-allowed select-none">
                                    Request Already Submitted
                                </div>
                            ) : (
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full h-12 mt-2 rounded-xl overflow-hidden bg-[#3D2B1F] hover:bg-[#C4844A] text-[#FDF6EC] font-semibold tracking-wide shadow-md transition-all duration-300 cursor-pointer group disabled:opacity-60 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        <MdOutlinePets />
                                        Submit Adoption Request
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </span>
                                </motion.button>
                            )}
                        </motion.div>

                    </form>
                </motion.div>

            </div>
        </div>
    )
}