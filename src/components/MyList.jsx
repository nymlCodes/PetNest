'use client'
import { authClient } from '@/lib/auth-client'
import React, { useEffect, useState } from 'react'
import Mypet from './cardComponents/Mypet'
import { MdOutlinePets } from 'react-icons/md'

export default function MyList() {

  const { data: session } = authClient.useSession()
  const [pets, setPets] = useState([])

  const adoptedCount = pets.filter(p => p.adopted === true).length
  const availableCount = pets.length - adoptedCount

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchPets = async () => {
      const { data: tokenData } = await authClient.token()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}pets?ownerId=${session.user.id}`,
        { headers: { Authorization: `Bearer ${tokenData?.token}` } }
      )
      const data = await res.json()
      console.log(data);
      
      setPets(Array.isArray(data) ? data : [])
    }

    fetchPets()
  }, [session])

  const handleAdopted = (petId) => {
    setPets(prev => prev.map(p => p._id === petId ? { ...p, adopted: true } : p))
  }

  return (
    <div className='mt-30'>
      <div>
        <h1 className='text-4xl text-center text-[#58492b] font-extrabold mb-10'>Your listing</h1>
        <div className='text-[#58492b] font-semibold flex gap-6 justify-between'>
          <div className='flex-1 max-w-[300px] w-full text-center mx-auto bg-white rounded-2xl'>
            <h1>Total Listings</h1>
            <p>{pets.length}</p>
          </div>
          <div className='flex-1 max-w-[300px] w-full text-center mx-auto bg-white rounded-2xl'>
            <h1>Available</h1>
            <p>{availableCount}</p>
          </div>
          <div className='flex-1 max-w-[300px] w-full text-center mx-auto bg-white rounded-2xl'>
            <h1>Adopted</h1>
            <p>{adoptedCount}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-20">
        {pets.length > 0 ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet, ind) => (
              <Mypet
                pet={pet}
                key={ind}
                onAdopted={() => handleAdopted(pet._id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="text-6xl text-[#3D2B1F]"><MdOutlinePets /></span>
            <p className="text-xl font-medium text-[#3D2B1F] tracking-wide">
              You haven't added any pets yet
            </p>
            <p className="text-sm text-[#3D2B1F]">
              Your listings will appear here once you add them.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}