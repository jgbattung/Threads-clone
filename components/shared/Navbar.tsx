import { dark } from "@clerk/themes"
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import React from 'react'
import Image from "next/image"

function Navbar() {
  return (
    <nav className='fixed top-0 z-30 flex w-full items-center justify-between bg-gray-900 px-8 py-6'>
      <Link href='/' className="flex itemse-center gap-4">
        <Image src='/assets/logo.svg' alt='logo' width={30} height={30} />
        <p className="text-white text-2xl font-bold">Threads</p>
      </Link>
      <UserButton afterSignOutUrl="/sign-in" appearance={{ baseTheme: dark, }} />
    </nav>
  )
}

export default Navbar