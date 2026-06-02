'use client'
import { authClient } from '@/lib/auth-client'
import React, { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { FiAlertTriangle } from 'react-icons/fi'

export default function DeleteModal({ pet }) {
    const { _id, ownerName, petName } = pet
    const petId = _id?.toString()
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        document.getElementById(`delete_modal_${petId}`).showModal()
    }

    const closeModal = () => {
        document.getElementById(`delete_modal_${petId}`).close()
    }

    const deleteButton = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data: tokenData } = await authClient.token() // ✅ fetch token on demand
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}pets/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenData?.token}`
                }
            })
            if (!res.ok) throw new Error(`Failed: ${res.status}`)
            closeModal()
            toast.success('Pet deleted successfully')
            window.location.reload()
        } catch (error) {
            toast.error('Failed to delete pet')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Trigger button */}
            <button
                onClick={openModal}
                className="relative w-full overflow-hidden bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 text-red-400 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer group"
            >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-1.5">
                    Delete
                    <MdDeleteOutline className="text-base" />
                </span>
            </button>

            {/* Modal */}
            <dialog id={`delete_modal_${petId}`} className="modal">
                <div className="modal-box bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl shadow-[0_20px_60px_rgba(196,132,74,0.15)] p-0 max-w-md overflow-hidden">

                    {/* Header */}
                    <div className="px-7 py-5 border-b border-red-100 bg-red-50 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-400 flex items-center justify-center shadow">
                            <FiAlertTriangle className="text-white text-sm" />
                        </div>
                        <div>
                            <h3 className="font-black text-red-500 text-base leading-tight">Delete Pet</h3>
                            <p className="text-xs text-red-300">This action cannot be undone</p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-7 py-6">
                        <p className="text-sm text-[#7A6A50] mb-1">
                            Hey <span className="font-bold text-[#3D2B1F]">{ownerName}</span>,
                        </p>
                        <p className="text-sm text-[#7A6A50]">
                            Are you sure you want to delete{' '}
                            <span className="font-bold text-[#3D2B1F]">{petName}</span>{' '}
                            from your list? This will permanently remove the listing.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="px-7 py-4 border-t border-[#E2D8C5] bg-[#F6F1E8] flex gap-3">
                        <button
                            onClick={closeModal}
                            disabled={loading}
                            className="flex-1 h-10 rounded-xl border border-[#E2D8C5] bg-white hover:bg-[#F6F1E8] text-[#3D2B1F] text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteButton}
                            disabled={loading}
                            className="flex-1 h-10 rounded-xl bg-red-400 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <MdDeleteOutline className="text-base" />
                                    Confirm Delete
                                </>
                            )}
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