import React from 'react'

function RightSidebar() {
  return (
    <section className='sticky right-0 top-0 z-20 px-8 flex flex-col h-screen w-fit justify-start overflow-auto border-l border-l-gray-950 bg-gray-900 pt-28 max-md:hidden'>
      <p className=' text-lg text-white font-semibold'>Suggested Accounts</p>
      <p className=' text-lg text-white font-semibold'>Trending</p>
    </section>
  )
}

export default RightSidebar