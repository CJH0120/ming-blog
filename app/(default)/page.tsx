'use client'

import Card from '@/components/card'
import SubHeader from '@/components/subHeader'
import { useSelect } from '@/utils/apiHook'
import { useEffect, useState } from 'react'
export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string>('')
  const { isLoading, mutate, data } = useSelect(activeMenu ?? '')
  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === activeMenu) {
      return setActiveMenu('')
    }
    setActiveMenu(e.currentTarget.value)
  }
  useEffect(() => {
    mutate()
  }, [activeMenu])
  return (
    <>
      <title>밍밍이의 리뷰</title>
      <meta
        name="description"
        content="밍밍이 블로그에서는 다양한 제품 및 아이디어를 추천하고, 일상 생활을 향상시키는 노하우를 공유합니다. 최신 트렌드와 유용한 제품 정보를 찾고 계시다면, 밍밍이의 블로그에서 유용한 정보를 찾아보세요."
      />
      <SubHeader activeLink={activeMenu} handleMenu={handleMenu} />
      <div
        className="py-10 h-full h-full grid max-w-[1200px] m-auto gap-5 justify-center sm:justify-start"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, auto))' }}
      >
        {!isLoading &&
          data?.map((v) => <Card key={v.id} title={v.title} comment={v.comment} id={v.id} keyword={v.keyword} regDate={v.regDate} thumbnail={v.thumbnail} />)}
        {isLoading && Dummy.map((v, idx) => <Loaing key={idx} />)}
      </div>
    </>
  )
}

const Loaing = () => {
  return <div className="w-[285px] h-[388px] sm:w-[285px] sm:h-[404px] shadow  animate-pulse bg-gray-200 rounded-lg dark:bg-gray-800"></div>
}
const Dummy: string[] = ['', '', '', '', '', '', '', '']
