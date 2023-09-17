'use client'
import Image from 'next/image'
import Link from 'next/link'
import ImageProxy from './Image'

const Card = ({ comment, id, keyword, regDate, thumbnail, title }: API.Card) => {
  return (
    <Link href={`/${id}`} className="max-w-[285px]">
      <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg ">
        <div className="h-56 w-full relative">
          <ImageProxy alt="Office" src={thumbnail} className=" object-cover" />
        </div>

        <div className="bg-white p-4 sm:p-6">
          <time dateTime={regDate} className="block text-xs text-gray-500">
            {regDate}
          </time>
          <h2 className="h-[56px] mt-0.5 text-lg text-gray-900">{title}</h2>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 h-[50px]">
            {keyword} 추천 상품을 찾고 계신가요?
            {comment}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card
