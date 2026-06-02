import React from 'react'
import { MdOutlinePets } from 'react-icons/md'

export default function CancelModal({ req, onDelete }) {
    const openModal = () => document.getElementById(`cancel_modal_${req._id}`).showModal()
    const closeModal = () => document.getElementById(`cancel_modal_${req._id}`).close()

    const handleDelete = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests/pet/${req._id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
        await res.json()
        closeModal()
        onDelete(req._id)
    }

    console.log(req.status);

    return (
        <div>
            {/* Trigger button */}
            <button
                onClick={openModal}
                disabled={req.status.toLowerCase() !== 'pending'}
                className={`relative overflow-hidden px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 w-full
            ${req.status.toLowerCase() !== 'pending'
                        ? 'bg-[#F6F1E8] border border-[#E2D8C5] text-[#9E7E6A] cursor-not-allowed opacity-50 select-none'
                        : 'bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 text-red-400 hover:text-white cursor-pointer group'
                    }`}
            >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                <span className="relative">
                    {req.status.toLowerCase() !== 'pending' ? req.status : 'Cancel'}
                </span>
            </button>

            {/* Modal */}
            <dialog id={`cancel_modal_${req._id}`} className="modal">
                <div className="modal-box bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl shadow-[0_20px_60px_rgba(196,132,74,0.15)] p-8 max-w-sm">

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-3xl">
                            <MdOutlinePets />

                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-xl text-[#3D2B1F] text-center mb-2">
                        Cancel Request?
                    </h3>

                    {/* Body */}
                    <p className="text-sm text-[#9E7E6A] text-center leading-relaxed mb-8">
                        Are you sure you want to cancel your adoption request for{' '}
                        <span className="font-bold text-[#C4844A]">{req.petName}</span>?
                        <br />
                        <span className="text-xs mt-1 inline-block text-[#9E7E6A]/70">This action cannot be undone.</span>
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-[#E2D8C5] mb-6" />

                    {/* Actions */}
                    <div className="flex gap-3">

                        {/* Keep */}
                        <button
                            onClick={closeModal}
                            className="flex-1 h-11 rounded-xl bg-[#F6F1E8] hover:bg-[#EDE4D4] border border-[#E2D8C5] text-[#3D2B1F] text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]"
                        >
                            No, Keep it
                        </button>

                        {/* Cancel */}
                        <button
                            onClick={handleDelete}
                            className="relative flex-1 h-11 rounded-xl overflow-hidden bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-[0.98] group"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
                            <span className="relative">Yes, Cancel</span>
                        </button>

                    </div>
                </div>

                {/* Backdrop close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}