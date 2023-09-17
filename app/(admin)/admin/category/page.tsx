'use client'
import { useCategory } from '@/utils/apiHook'
import category from '@/utils/category'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const Category = () => {
  const handleAdd = () => {
    setCategory((v) => [...v, { id: undefined, categoryName: '' }])
  }
  const { data, isLoading, mutate } = useCategory()
  const [category, setCategory] = useState<API.Category[]>(data ?? [])
  useEffect(() => {
    setCategory(data ?? [])
  }, [data])
  return (
    <div className="flex flex-col gap-5 w-full h-full ">
      <p className="text-xl">Category 관리</p>
      <div className="border p-3 w-full h-full  flex flex-col">
        <p>카테고리 주제를 설정할 수 있습니다.</p>
        <div className="border w-full p-3 mt-5 h-full flex flex-auto flex-col gap-2 ">
          {!isLoading && !category?.length && <div className="border h-[50px] flex justify-center items-center">데이터가 없습니다</div>}
          {category?.map((v, idx) => (
            <CategoryCard data={v} key={idx} mutate={mutate} />
          ))}
          {isLoading && <div>로딩중</div>}
          <button onClick={handleAdd} className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
            추가하기
          </button>
        </div>
      </div>
    </div>
  )
}
export default Category
interface CategoryProps {
  data: API.Category
  mutate: () => void
}
const { addCategory, deleteCategory } = category()

const CategoryCard = ({ data, mutate }: CategoryProps) => {
  const handleDelete = async (id: number) => {
    await deleteCategory(id)
    mutate()
  }
  const [isChange, setIsChange] = useState<boolean>(true)
  const [input, setInput] = useState<string>(data.categoryName)
  useEffect(() => {
    if (!data.categoryName) return setIsChange(false)
  }, [data.categoryName])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInput((v) => value)
  }

  const handleAddOrFix = async () => {
    if (!data.id) {
      await addCategory(input)
    }
    setIsChange((v) => !v)
  }
  return (
    <div className="border h-[50px] flex justify-center gap-5 items-center  py-1">
      <input value={input} onChange={handleChange} className="h-full w-full outline-1	px-3" readOnly={isChange} />
      <button onClick={handleAddOrFix} className="w-[60px] rounded-lg bg-blue-400 whitespace-nowrap h-full	text-sm font-medium text-white">
        {isChange ? '수정' : '완료'}
      </button>

      <button
        onClick={() => {
          handleDelete(data.id as number)
        }}
        className="w-[60px] rounded-lg bg-red-400 whitespace-nowrap h-full	text-sm font-medium text-white"
      >
        삭제
      </button>
    </div>
  )
}
