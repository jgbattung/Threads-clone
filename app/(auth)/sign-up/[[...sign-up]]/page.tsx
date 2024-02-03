import { SignUp } from "@clerk/nextjs";
 
import Image from "next/image";
 
export default function Page() {
  return (
    <div className="h-screen flex w-full">
      <div className="w-1/2 flex flex-col items-center justify-center max-lg:hidden bg-[url('/assets/home-bg.png')]">
        <div className="flex mb-20">
          <Image 
            src='/assets/logo.png'
            alt='Threads logo'
            width={200}
            height={200}
          />
          <p className="text-gray-200 font-semibold text-4xl">The new way to connect</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-200 font-extralight text-2xl">Share your unique ideas</p>
          <p className="text-gray-200 font-extralight text-2xl">Bond over experiences</p>
          <p className="text-gray-200 font-extralight text-2xl">Discover new people</p>
        </div>
      </div>
      <div className="bg-slate-50 w-1/2 flex items-center justify-center max-lg:w-full">
        <div className="flex flex-col items-center gap-7">
          <p className="text-gray-950 font-extrabold text-4xl">Welcome to Threads</p>
          <SignUp />
        </div>
      </div>
    </div>
  )
}