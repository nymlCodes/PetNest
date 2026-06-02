'use client'
import { authClient } from '@/lib/auth-client'
import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import { FaPaw } from 'react-icons/fa'
import { toast } from 'react-toastify'

const labelClass = "block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1"
const inputClass = "w-full h-10 rounded-xl border border-[#E2D8C5] bg-[#F6F1E8] px-3 text-sm text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200"
const selectClass = "w-full h-10 rounded-xl border border-[#E2D8C5] bg-[#F6F1E8] px-3 text-sm text-[#3D2B1F] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200"

export default function EditModal({ pet }) {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const userEmail = user?.email

    const {
        _id, petName, species, breed = "Unknown", age, gender,
        healthStatus, vaccinationStatus, adoptionFee, location,
        imageUrl, description,
    } = pet || {}

    const petId = _id?.toString()

    const closeButton = () => {
        const modal = document.getElementById(`edit_modal_${petId}`)
        if (modal) modal.close()
    }

    const [token, setToken] = useState(null)

    // ✅ Fixed infinite loop — added []
    useEffect(() => {
        const getToken = async () => {
            const { data: tokenData } = await authClient.token()
            setToken(tokenData?.token)
        }
        getToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const updatedData = Object.fromEntries(formData.entries())
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}pets/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
            await res.json()
            closeButton()
            window.location.reload()
        } catch (error) {
            toast.error("Failed to update pet data:", error)
        }
    }

    return (
        <div>
            {/* Trigger button */}
            <button
                onClick={() => document.getElementById(`edit_modal_${petId}`).showModal()}
                className="relative w-full overflow-hidden bg-[#F2C4A0]/40 hover:bg-[#C4844A] border border-[#C4844A]/30 hover:border-[#C4844A] text-[#8B5E3C] hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer group"
            >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-1.5">
                    Edit
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C4844A] group-hover:bg-white text-white group-hover:text-[#C4844A] text-[10px] transition-colors duration-300">
                        <MdModeEditOutline />
                    </span>
                </span>
            </button>

            {/* Modal */}
            <dialog id={`edit_modal_${petId}`} className="modal p-0">
                <div className="modal-box bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl shadow-[0_20px_60px_rgba(196,132,74,0.15)] p-0 w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2D8C5] bg-[#F6F1E8] flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#C4844A] flex items-center justify-center shadow">
                                <MdModeEditOutline className="text-white text-sm" />
                            </div>
                            <div>
                                <h3 className="font-black text-sm text-[#3D2B1F] leading-tight">Edit Pet</h3>
                                <p className="text-xs text-[#9E7E6A]">{petName}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={closeButton}
                            className="w-7 h-7 rounded-lg bg-[#E2D8C5] hover:bg-[#C4844A] text-[#3D2B1F] hover:text-white flex items-center justify-center text-sm transition-all duration-200 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Scrollable form body */}
                    <div className="overflow-y-auto flex-1 px-5 py-5">
                        <form onSubmit={handleSubmit} id={`edit_form_${petId}`}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Pet Name */}
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Pet Name</label>
                                    <input defaultValue={petName} name="petName" placeholder="e.g. Buddy" required className={inputClass} />
                                </div>

                                {/* Species */}
                                <div>
                                    <label className={labelClass}>Species</label>
                                    <div className="relative">
                                        <select defaultValue={species || ""} name="species" required className={selectClass}>
                                            <option value="" disabled>Select species</option>
                                            <option value="Dog">Dog</option>
                                            <option value="Cat">Cat</option>
                                            <option value="Bird">Bird</option>
                                            <option value="Rabbit">Rabbit</option>
                                            <option value="Hamster">Hamster</option>
                                            <option value="Fish">Fish</option>
                                            <option value="Turtle">Turtle</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C4844A] text-xs">▾</span>
                                    </div>
                                </div>

                                {/* Breed */}
                                <div>
                                    <label className={labelClass}>Breed</label>
                                    <input defaultValue={breed} name="breed" placeholder="e.g. Golden Retriever" className={inputClass} />
                                </div>

                                {/* Age */}
                                <div>
                                    <label className={labelClass}>Age</label>
                                    <input defaultValue={age} name="age" placeholder="e.g. 2 years" required className={inputClass} />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className={labelClass}>Gender</label>
                                    <div className="relative">
                                        <select name="gender" required defaultValue={gender || ""} className={selectClass}>
                                            <option value="" disabled>Select gender</option>
                                            <option value="Male">♂ Male</option>
                                            <option value="Female">♀ Female</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C4844A] text-xs">▾</span>
                                    </div>
                                </div>

                                {/* Health Status */}
                                <div>
                                    <label className={labelClass}>Health Status</label>
                                    <div className="relative">
                                        <select name="healthStatus" required defaultValue={healthStatus || ""} className={selectClass}>
                                            <option value="" disabled>Select health status</option>
                                            <option value="Healthy">Healthy</option>
                                            <option value="Minor Issues">Minor Issues</option>
                                            <option value="Under Treatment">Under Treatment</option>
                                            <option value="Needs Special Care">Needs Special Care</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C4844A] text-xs">▾</span>
                                    </div>
                                </div>

                                {/* Vaccination Status */}
                                <div>
                                    <label className={labelClass}>Vaccination Status</label>
                                    <div className="relative">
                                        <select name="vaccinationStatus" required defaultValue={vaccinationStatus || ""} className={selectClass}>
                                            <option value="" disabled>Select status</option>
                                            <option value="Fully Vaccinated">Fully Vaccinated</option>
                                            <option value="Partially Vaccinated">Partially Vaccinated</option>
                                            <option value="Not Vaccinated">Not Vaccinated</option>
                                            <option value="Unknown">Unknown</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C4844A] text-xs">▾</span>
                                    </div>
                                </div>

                                {/* Adoption Fee */}
                                <div>
                                    <label className={labelClass}>Adoption Fee (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4844A] text-sm font-semibold">$</span>
                                        <input
                                            defaultValue={adoptionFee}
                                            type="number" name="adoptionFee" placeholder="0" min="0"
                                            className="w-full h-10 rounded-xl border border-[#E2D8C5] bg-[#F6F1E8] pl-7 pr-3 text-sm text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Location / Shelter Name</label>
                                    <input defaultValue={location} name="location" placeholder="e.g. Happy Paws Shelter" required className={inputClass} />
                                </div>

                                {/* Image URL */}
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Pet Photo URL</label>
                                    <input defaultValue={imageUrl} type="url" name="imageUrl" placeholder="https://i.ibb.co/your-image.jpg" className={inputClass} />
                                </div>

                                {/* Description */}
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>About this Pet</label>
                                    <textarea
                                        defaultValue={description}
                                        name="description" placeholder="Tell us about the pet..." rows={3} required
                                        className="w-full min-h-[80px] max-h-[140px] rounded-xl border border-[#E2D8C5] bg-[#F6F1E8] px-3 py-2.5 text-sm text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200 resize-none"
                                    />
                                </div>

                                {/* Owner Email */}
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Owner Email</label>
                                    <input
                                        type="email" name="ownerEmail"
                                        value={userEmail || pet?.ownerEmail || "unknown@example.com"}
                                        readOnly
                                        className="w-full h-10 rounded-xl border border-[#E2D8C5] bg-[#F6F1E8] px-3 text-sm text-[#9E7E6A] cursor-not-allowed focus:outline-none select-none"
                                    />
                                </div>

                            </div>
                        </form>
                    </div>

                    {/* Footer buttons — fixed at bottom */}
                    <div className="flex gap-3 px-5 py-4 border-t border-[#E2D8C5] bg-[#F6F1E8] flex-shrink-0">
                        <button
                            type="button"
                            onClick={closeButton}
                            className="flex-1 h-11 rounded-xl bg-[#FFFDF8] hover:bg-[#EDE4D4] border border-[#E2D8C5] text-[#3D2B1F] text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form={`edit_form_${petId}`}
                            className="relative flex-1 h-11 rounded-xl overflow-hidden bg-[#3D2B1F] hover:bg-[#C4844A] text-[#FDF6EC] text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-[0.98] group"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                            <span className="relative flex items-center justify-center gap-2">
                                <FaPaw className="text-xs" />
                                Save Changes
                            </span>
                        </button>
                    </div>

                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}