import { dark } from "@clerk/themes"
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import React from 'react'
import Image from "next/image"

function Navbar() {
  return (
    <nav className='fixed top-0 z-30 flex w-full items-center justify-between bg-gray-900 px-8 py-6'>
      <Link href='/' className="flex itemse-center gap-4">
        <Image src='/assets/logo.png' alt='logo' width={200} height={200} />
      </Link>
      <UserButton afterSignOutUrl="/sign-in" appearance={{ baseTheme: dark, }} />
    </nav>
  )
}

export default Navbar