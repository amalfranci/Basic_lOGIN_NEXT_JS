'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

function page() {
  const router = useRouter() 

  const handleLogout =async ()=>{

    try {

      const res=await axios.get("http://localhost:3000/api/users/logout")
      toast.success("Logout Successfully")
      router.push('/login')
      
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>Profile Page
     <Toaster position="top-right" reverseOrder={false} />
      <button className='border bg-red-400 mt-3 p-2' onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default page