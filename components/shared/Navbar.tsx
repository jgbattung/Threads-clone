import { dark } from "@clerk/themes"
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import React from 'react'
import Image from "next/image"

function Navbar() {
  return (
    <nav className='w-full bg-gray-900 text-slate-50 px-8 py-5'>
      <div className='flex items-center justify-between'>
        <Link href="/">
          <div className='flex gap-3 items-center'>
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={30}
              height={30}
            />
            <p className='font-bold text-2xl'>Threads</p>
          </div>
        </Link>
        <UserButton afterSignOutUrl="/sign-in" appearance={{ baseTheme: dark, }} />
        {/* <div className="flex gap-5 items-center justify-center">
          <SignOutButton>
            <button className="flex gap-3 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              <p className="font-light text-sm">Logout</p>
            </button>
          </SignOutButton>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar