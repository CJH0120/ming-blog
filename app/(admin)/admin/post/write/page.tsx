'use client'

import { NextPage } from 'next'
import { useCategory } from '@/utils/apiHook'
import Select from '@/components/select'
import { useEffect, useState } from 'react'
import ImageProxy from '@/components/Image'
import post, { addPost } from '@/utils/post'
import { useRouter } from 'next/router'
export interface writeData {
  category: string
  title: string
  keyword: string
  thumbnail: string
  comment: string
}
const Write: NextPage = () => {
  const { data } = useCategory()
  const [writeData, setWriteData] = useState<writeData>({ thumbnail: '', category: '', comment: '', keyword: '', title: '' })
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    setWriteData((v) => ({ ...v, category: value }))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setWriteData((v) => ({ ...v, [name]: value }))
  }
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.currentTarget
    setWriteData((v) => ({ ...v, comment: value }))
  }
  const handleAdd = () => {
    setAddDate((v) => [...v, { coupangLink: '', imageLink: '', point1: '', point2: '', point3: '', productName: '' }])
  }
  const handleRemove = () => {
    if (addData.length > 0) {
      const updatedAddData = [...addData]
      updatedAddData.pop()
      setAddDate(updatedAddData)
    }
  }
  const [addData, setAddDate] = useState<AddCoupangProps[]>([{ coupangLink: '', imageLink: '', point1: '', point2: '', point3: '', productName: '' }])
  const handleChangeAddDate = (e: React.ChangeEvent<HTMLInputElement>, index: number, pointIndex: number) => {
    const { name, value } = e.currentTarget
    const updatedAddData = addData.map((v, idx) => {
      if (idx === index) {
        return { ...v, [name]: value }
      } else {
        return { ...v }
      }
    })
    setAddDate(updatedAddData)
  }
  const { addPost } = post()
  const handleWrite = async () => {
    await addPost(writeData, addData).then(() => {
      alert('작성완료')
    })
  }
  return (
    <>
      <title>글쓰기</title>
      <div className="flex flex-col  w-full h-full border p-3">
        <div className="flex flex-col">
          <Select selectArr={data ?? []} initialValue={writeData.category} onChange={handleSelect} />
        </div>

        <div className="mt-5">
          <div className="w-full">
            <input className="h-[50px] w-full p-3" placeholder="제목 설정" name="title" value={writeData.title} onChange={handleInput} />
          </div>
          <br className="text-gray-900 w-full" />

          {/* 키워드 인풋  */}

          <label className="h-[50px] mix-w-[200px] max-w-[400px] relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input
              className="px-2 w-full h-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              name="keyword"
              value={writeData.keyword}
              onChange={handleInput}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              대표 키워드
            </span>
          </label>

          {/* 썸네일 */}
          <div className="mt-10 ">
            <label className="h-[50px] w-[400px] relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <input
                className="px-2 w-full h-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
                name="thumbnail"
                value={writeData.thumbnail}
                onChange={handleInput}
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                썸네일
              </span>
            </label>
            <div className="w-[285px] h-[265px]  relative mt-5 border  ">
              {writeData.thumbnail && <ImageProxy alt="썸네일 이미지" src={writeData.thumbnail} className=" object-cover" />}
            </div>
          </div>

          {/* textarea  */}
          <div className="mt-5">
            <label htmlFor="OrderNotes" className="block text-sm font-medium text-gray-700">
              인트로 코멘트 작성
            </label>

            <textarea
              className="p-2 min-h-[150px] mt-2 w-full rounded-lg border-blue-300 align-top shadow-sm sm:text-sm"
              placeholder="Enter any additional order notes..."
              name="commetn"
              value={writeData.comment}
              onChange={handleTextArea}
            />
          </div>

          {/* cupang link area */}
          <div className="mt-5">
            <div className="flex gap-5 w-full justify-start items-center ">
              <p className="text-2xl font-bold">쿠팡 링크</p>
              <button
                onClick={handleAdd}
                className="w-[25px] h-[25px]  inline-block rounded border border-current  text-sm font-medium text-indigo-600 transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
              >
                +
              </button>
              <button
                onClick={handleRemove}
                className="w-[25px] h-[25px]  inline-block rounded border border-current  text-sm font-medium text-indigo-600 transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
              >
                -
              </button>
            </div>
            <div className="my-3 flex flex-col gap-10">
              {addData?.map((v, idx) => (
                <AddCoupang {...v} key={idx} index={idx} handleChange={handleChangeAddDate} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 w-full flex  justify-center items-center">
          <button
            onClick={handleWrite}
            className="w-[250px] h-[50px] inline-block rounded border border-current  text-sm font-medium text-indigo-600 transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
          >
            작성하기
          </button>
        </div>
      </div>
    </>
  )
}

export default Write
export interface AddCoupangProps {
  coupangLink: string
  productName: string
  imageLink: string
  point1: string
  point2: string
  point3: string
  index?: number
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>, index: number, pointIndex: number) => void
}
const AddCoupang = ({ coupangLink, imageLink, point1, point2, point3, productName, index, handleChange }: AddCoupangProps) => {
  let point = ['', '', '']
  return (
    <div className="flex flex-col w-full border py-2">
      <div className=" flex w-full gap-5 ">
        <div className="flex flex-col gap-2 justify-start	 items-start h-full w-full px-2">
          <label className="h-[50px] w-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input
              className="px-2 w-full h-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              name="coupangLink"
              value={coupangLink}
              onChange={(e) => {
                if (handleChange) {
                  handleChange(e, index ?? 0, -1)
                }
              }}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              쿠팡링크
            </span>
          </label>

          <label className="h-[50px] w-full  relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input
              className="px-2 w-full h-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              name="productName"
              value={productName}
              onChange={(e) => {
                if (handleChange) {
                  handleChange(e, index ?? 0, -1)
                }
              }}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              상품명
            </span>
          </label>

          <label className="h-[50px] w-full  relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input
              className="px-2 w-full h-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              name="imageLink"
              value={imageLink}
              onChange={(e) => {
                if (handleChange) {
                  handleChange(e, index ?? 0, -1)
                }
              }}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              이미지링크
            </span>
          </label>
        </div>
        <div className="w-[160px] h-[160px] flex relative border" style={{ flex: '1 0 auto' }}>
          {!!imageLink && <ImageProxy src={imageLink} />}
        </div>
      </div>

      <div className="px-2 mt-8 flex gap-2 flex-col">
        {point?.map((v, idx2) => (
          <label
            key={idx2}
            className="h-[50px] w-full  relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              className="px-2 w-full h-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              name={`point${idx2 + 1}`}
              onChange={(e) => {
                if (handleChange) {
                  handleChange(e, index ?? 0, idx2)
                }
              }}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              상품 특징
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
