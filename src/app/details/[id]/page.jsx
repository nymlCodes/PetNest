import React from 'react'
import PetDetails from '@/components/cardComponents/PetDetails';
import { notFound } from 'next/navigation';
// import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';


export default async function Details({ params }) {

    const { id } = await params;


    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    // console.log(token);
    


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}pets/${id}`, {
        headers:{
            authorization: `Bearer ${token}`
        }

    });



    const pet = await res.json();
    console.log('Pets')
    console.log( pet);



    return (
        <PetDetails pet={pet}></PetDetails>
    )
}