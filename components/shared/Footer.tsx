"use client"
import { sidebarRoutes } from "@/constants"
import Link from "next/link"
import Image from 'next/image'
import { usePathname } from "next/navigation"

function Footer() {
  const currentPathname = usePathname();


  return (
    <section className="fixed bottom-0 z-10 w-full rounder-t-3xl p-4 backdrop-blur-lg bg-gray-900 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarRoutes.map((route) => {
          const isActive =
            (currentPathname.includes(route.route) && route.route.length > 1) ||
            currentPathname === route.route;

            return (
              <Link 
                href={route.route} 
                key={route.text} 
                className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:py-2.5 ${isActive && 'bg-violet-500'}`}
              >
                  <Image 
                    src={route.image}
                    alt={route.text}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <p className='text-white text-sm font-light'>
                    {route.text.split(/\s+/)[0]}
                  </p>
              </Link>
            )
        })}
      </div>
    </section>
  )
}

export default Footer