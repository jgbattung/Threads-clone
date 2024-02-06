import AccountProfile from '@/components/forms/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

async function page () {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }


  return (
    <div>
      <h1 className='text-white text-2xl text-left font-bold'>Edit Profile</h1>

      <section className="bg-gray-900 rounded-lg p-10 mt-9">
        <AccountProfile 
          user={userData}
          btnTitle="Update Profile"
        />
      </section>
    </div>
  )
}

export default page