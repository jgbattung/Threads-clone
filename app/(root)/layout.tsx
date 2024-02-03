import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/shared/Navbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Footer from '@/components/shared/Footer'
import RightSidebar from '@/components/shared/RightSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads App clone with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />

          <main className="flex flex-row">
            <LeftSidebar />
            <section className='flex min-h-screen flex-1 flex-col items-center bg-gray-950 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}