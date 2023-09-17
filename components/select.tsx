'use client'
import { useEffect, useRef, useState } from 'react'

interface Selectprops {
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void
  selectArr: API.Category[]
  initialValue: string
}

const Select = ({ selectArr, onChange, initialValue }: Selectprops) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const hadleOpen = () => {
    setIsOpen((v) => !v)
  }
  const modalEl = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!initialValue.length) return
    setIsOpen(false)
  }, [initialValue])
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalEl.current && !modalEl.current.contains(e.target as HTMLDivElement)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })
  const [defaultValue, setDefault] = useState<string | undefined>(undefined)
  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white" onClick={hadleOpen}>
        <span className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          {!initialValue.length ? '카테고리 선택' : initialValue}
        </span>
        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          ref={modalEl}
          className="absolute start-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            {selectArr?.map((v) => (
              <button
                onClick={onChange}
                value={v.categoryName}
                className="w-full block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                {v.categoryName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Select
