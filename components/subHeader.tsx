'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, ReadonlyURLSearchParams } from 'next/navigation'
import { useCategory } from '@/utils/apiHook'
interface subHeaderProps {
  activeLink: string
  handleMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const SubHeader = ({ activeLink, handleMenu }: subHeaderProps) => {
  const { data } = useCategory()
  return (
    <div className="h-auto border-b-[1px] py-2 px-4 " style={{ margin: '0 -1.25rem' }}>
      <div className="h-full w-full max-w-[1200px] m-auto  flex gap-5 overflow-x-auto	 ">
        {data?.map((v) => (
          <button
            key={v.id}
            value={v.categoryName}
            onClick={handleMenu}
            className={`whitespace-nowrap p-3 border rounded-lg cursor-pointer text-sm h-[36px] flex justify-center	items-center`}
            style={activeLink === v.categoryName ? { color: 'rgb(0, 159, 206)', borderColor: 'rgb(0, 159, 206)', background: 'rgb(239, 251, 255)' } : undefined}
          >
            {v.categoryName}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SubHeader
