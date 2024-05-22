"use client"
import "@styles/Shop.scss"
import Loader from '@components/Loader'
import Navbar from '@components/Navbar'
import WorkList from '@components/WorkList'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Shop = () => {
  const [loading,setLoading]=useState(true)
  const {data:session}=useSession()
  const loggedInUserId=session?.user?._id
  const search=useSearchParams()
  const [workList,setWorkList]=useState([])
  const [user,setUser]=useState({})

  useEffect(()=>{
    const getWorkList = async()=>{
      const response=await fetch(`api/user/${loggedInUserId}/shop`)
      const data=await response.json()
      setWorkList(data.workList)
      setUser(data.user)
      setLoading(false)
    }
    if(loggedInUserId){
      getWorkList()
    }
   },[loggedInUserId])
  return loading? <Loader/> : (
    <>
    <Navbar />
    {loggedInUserId && (
      <h1 className='title-list'>Your Works</h1>
    )}
    <WorkList data={workList} />
    </>
  )
}

export default Shop