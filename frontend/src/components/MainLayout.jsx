import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout() {
  return (

    <div >
      <Navbar/>
      <main className='mt-20 '>
        <Outlet/>  
      </main>
    </div>
  )
}
