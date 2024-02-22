"use client"

import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    router.push(`/profile/${authUserId}/edit`)
  }
 
  return (
    <div className='flex w-full flex-col justify-start'>
      {/* image and username */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 max-sm:flex-col max-sm:items-start'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-gray-200 font-bold text-2xl'>
              {name}
            </h2>
            <p className='text-gray-400 font-normal text-sm'>@{username}</p>
          </div>

        </div>
        {pathname === `/profile/${authUserId}` && (
          <div>
            <button className='rounded-3xl border border-gray-200 px-4 py-2 max-sm:px-3 max-sm:py-1.5 cursor-pointer hover:bg-gray-700 transition-all' onClick={handleClick}>
              <span className='text-white max-sm:text-sm'>Edit Profile</span>
            </button>
          </div>
        )}
      </div>

      <p className='mt-6 max-w-3xl font-normal text-base text-gray-200 max-sm:text-sm'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-gray-800' />
    </div>
  )
}

export default ProfileHeader