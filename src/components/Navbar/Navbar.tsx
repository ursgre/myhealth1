"use client"
import React from 'react'
import logo from '@/assets/logo.png'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'


const Navbar = () => {

  
  return (
    <nav>
        <Image src={logo} alt="Logo" />
        <Link href='/'>Home</Link>
        <Link href='/tips'>Tips</Link>
        <Link href='/calculators'>Calculators</Link>
        <Link href='/profile'>Profile</Link>
        <button>Logout</button>
     
    </nav>
  )
}

export default Navbar
