"use client"

import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import { sidebarRoutes } from '@/constants'
import Link from 'next/link'

function LeftSidebar() {
  const currentPathname = usePathname();
  const userId = useAuth();


  return (
    <section className='sticky left-0 top-0 z-20 flex flex-col h-screen w-fit justify-between overflow-auto boder-r px-8 border-r-gray-950 bg-gray-900 pb-5 pt-28 max-md:hidden'>
      <div className='flex w-full flex-1 flex-col gap-6'>
        {sidebarRoutes.map((route) => {
          const isActive =
          (currentPathname.includes(route.route) && route.route.length > 1) ||
          currentPathname === route.route
          
          if (route.route === '/profile') route.route = `${route.route}/${userId.userId}`;

          return (
            <Link 
              href={route.route}
              key={route.text}
              className={`relative flex gap-3 p-4 rounded-lg justify-start ${isActive && 'bg-violet-500'}`}
            >
              <Image
                src={route.image}
                alt={route.text} 
                width={20} 
                height={20} 
              />
              <p className='text-white font-normal'>{route.text}</p>
            </Link>
          );
        })}
      </div>
      
      <div className="flex gap-5 items-center">
        <SignedIn>
          <SignOutButton>
            <button className="flex gap-3 items-center pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFF" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              <p className="font-light text-sm text-white">Logout</p>
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar