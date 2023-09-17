'use client'
import { useSelect } from '@/utils/apiHook'
import { deletePost } from '@/utils/post'
import { useRouter } from 'next/navigation'
const Page = () => {
  const { isLoading, mutate, data } = useSelect('')

  return (
    <div className="w-full">
      <p className="text-2xl font-bold border-b py-5 ">어드민 글관리</p>
      <div className="flex flex-col gap-5 mt-10  w-full">
        {data?.map((v) => (
          <TitleCard title={v.title} id={v.id} key={v.id} />
        ))}
      </div>
    </div>
  )
}

export default Page

interface TitleCard {
  title: string
  id: number
}

const TitleCard = ({ title, id }: TitleCard) => {
  const router = useRouter()
  const handleDelete = async () => {
    await deletePost(id).then(() => {
      router.refresh
    })
  }
  return (
    <div className="h-[60px] flex justify-between items-center border-b">
      <div className="font-bold text-xl">{title}</div>
      <button onClick={handleDelete} className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
        삭제
      </button>
    </div>
  )
}
