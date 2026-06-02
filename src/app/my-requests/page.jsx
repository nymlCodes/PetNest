'use client'
import CancelModal from '@/components/CancelModal'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function MyRequest() {
  const { data: session } = authClient.useSession()
  const user = session?.user


  const [requests, setRequests] = useState([])
  useEffect(() => {
    if (!user) {
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests?adopterId=${user?.id}`)
      .then(res => res.json())
      .then(data => {
        setRequests(data)
      }

      )

  }, [user])

  const statusStyle = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100  text-green-800',
    Rejected: 'bg-red-100    text-red-800',
  }




  return (
    <div className='min-h-screen mt-30'>
      <div className='mb-10'>
        <h1 className='text-black text-5xl text-center'>Your Requests</h1>
      </div>

      <div className="max-w-[1100px] mx-auto px-3 md:px-0">

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-5 bg-[#F6F1E8] border border-amber-200 rounded-2xl px-6 py-4 text-gray-700 font-semibold shadow-sm">
          <span>Pet Name</span>
          <span>Requested Date</span>
          <span>Pick Up Date</span>
          <span>Status</span>
          <span className="text-center">Actions</span>
        </div>

        {/* Request List */}
        <div className="space-y-4 mt-4">
          {requests.map((req, ind) => (
            <div
              key={ind}
              className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-5"
            >

              {/* Mobile Layout */}
              <div className="flex flex-col gap-4 md:hidden">

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Pet Name</p>
                    <h2 className="font-semibold text-gray-800 text-lg">
                      {req.petName}
                    </h2>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize h-fit ${statusStyle[req.status]}`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">
                      Requested Date
                    </p>
                    <p className="text-gray-600">
                      {new Date(req?.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-1">
                      Pick Up Date
                    </p>
                    <p className="text-gray-600">
                      {req.pickupDate
                        ? new Date(req.pickupDate).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-medium transition">
                    View
                  </button>

                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-medium transition">
                    Cancel
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-5 gap-5 items-center">

                <h2 className="font-semibold text-gray-800">
                  {req.petName}
                </h2>

                <span className="text-sm text-gray-500">
                  {new Date(req?.createdAt).toLocaleDateString()}
                </span>

                <span className="text-sm text-gray-500">
                  {req.pickupDate
                    ? new Date(req.pickupDate).toLocaleDateString()
                    : "—"}
                </span>

                <span
                  className={`text-xs px-4 py-2 text-gray-500 rounded-full w-fit capitalize ${statusStyle[req.status]}`}
                >
                  {req.status}
                </span>

                <div className="flex justify-center gap-3">
                  <Link href={`/details/${req?.petId}`}>  <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                    View
                  </button></Link>


                  <CancelModal req={req} onDelete={(id) => setRequests(prev => prev.filter(r => r._id !== id))}></CancelModal>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



