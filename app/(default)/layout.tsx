'use client'
import '../globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body className="w-full h-full min-h-screen ">
      <Analytics />
        <header className="w-full h-[80px] border-b-[1px]	 " style={{ background: '#fff' }}>
          <h1 className="max-w-[1200px] flex justify-start	items-center px-4  w-full  text-2xl	m-auto h-full">
            <Link href={'/'}>{process.env.NEXT_PUBLIC_ID}의 리뷰</Link>
          </h1>
        </header>
        <main className="w-full  h-full px-5 ">{children}</main>
        <footer className="bg-gray-50 ">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 max-w-[1200px]">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex justify-center text-teal-600 sm:justify-start">{process.env.NEXT_PUBLIC_ID}의 리뷰</div>

              <Link href={'/admin'} className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                Copyright &copy; 2023 MingMing
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
