'use client'
import Link from 'next/link'
import '../globals.css'

import { useState } from 'react'
import { SWRConfig } from 'swr/_internal'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <html lang="kr">
        <body className="w-full h-full ">
          <div className="h-full w-full max-w-[1100px] m-auto flex justify-start gap-20 pt-5 ">
            <div className="flex flex-col w-full max-w-[200px] h-full gap-5">
              <div className="h-[200px] w-full border"></div>
              <Link
                className="inline-flex justify-center items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                href="/admin/post/write"
              >
                <span className="text-sm font-medium ">글쓰기</span>
              </Link>

              <div className="h-full w-full border px-5 min-h-[500px]">
                <Link href={'/admin'} className="text-2xl  h-[50px] flex justify-start items-center">
                  관리 홈
                </Link>
                <div className="border-t-[1px]">
                  <div className="mt-5 mb-3">콘텐츠</div>
                  <div className="px-1 flex flex-col gap-2">
                    {ContentLink.map((v) => (
                      <Link key={v.href} href={v.href} className={`hover:text-indigo-600  ${path === v.href && 'text-indigo-600'}`}>
                        {v.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </body>
      </html>
    </SWRConfig>
  )
}

interface LinkProps {
  name: string
  href: string
}

const ContentLink: LinkProps[] = [
  { href: '/admin/post', name: '글 관리' },
  { href: '/admin/category', name: '카테고리 관리' },
]
