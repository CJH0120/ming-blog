import ImageProxy from '@/components/Image'
import IconPrev from '@/components/icon/ic-prev'
import { usePage } from '@/utils/apiHook'
import post, { getPost, getPostDetail, getPostMeta } from '@/utils/post'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const PostId = async ({ params }: Props) => {
  const data = await getPostDetail(params.id)
  if (!data.post) return notFound()
  const dateObject: any = new Date(data.post.regDate)
  const year: number = dateObject.getFullYear()
  const month: number = dateObject.getMonth() + 1
  const day: number = dateObject.getDate()
  return (
    <div className="h-full w-full max-w-[900px] m-auto py-10">
      <h2 className="text-3xl font-bold mb-4">{data.post?.title}</h2>
      <p className="my-5 w-full text-right	" style={{ color: '#E2E2E2' }}>
        {`${year}년 ${month}월 ${day}일`} 작성
      </p>
      <div className="break-words whitespace-pre-line">
        <b>{data.post.keyword}</b>을 찾고 계신가요? {process.env.NEXT_PUBLIC_ID}가 직접 선별한 가성비 좋은 상품을 안내해 드리겠습니다
      </div>
      <div className="border-b-2 py-4 mb-5 break-words whitespace-pre-line		  max-w-[900px]">{data.post?.comment}</div>
      {data.product.map((v) => (
        <PostCard {...v} key={v.productName} />
      ))}
      <p className="mt-5 w-full text-center " style={{ color: '#E2E2E2' }}>
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
      <div className="w-full flex mt-10 justify-between items-center flex-col sm:flex-row gap-5">
        <div className="w-full flex justify-start	 items-center">
          {data.prev && (
            <Link href={`/${data.prev.id}`} className="flex  gap-2    rounded-lg	sm:w-[320px] border p-2 w-full flex justify-between	 items-center ">
              <div className="flex  justify-center	 items-center h-full ">
                <IconPrev className="text-xl" style={{ fontSize: '40px' }} />
              </div>
              <div className="w-fill flex  justify-center	 items-center flex-col">
                <p className="w-full text-right sm:text-left">이전</p>{' '}
                <p className="text-ellipsis overflow-hidden  w-full  font-bold   sm:w-[230px] sm:whitespace-nowrap	  ">{data.prev.title}</p>
              </div>
            </Link>
          )}
        </div>
        <div className="w-full h-full flex justify-end	 items-center">
          {data.next && (
            <Link href={`/${data.next.id}`} className="flex   gap-2 rounded-lg	 sm:w-[320px] border p-2 w-full flex justify-between	 items-center ">
              <div className="w-fill flex  justify-center	 items-center flex-col">
                <p className="w-full text-left sm:text-right ">다음</p>{' '}
                <p className="text-ellipsis overflow-hidden w-full h-[24px] font-bold  sm:w-[230px] sm:whitespace-nowrap	  ">{data.next.title}</p>
              </div>
              <div className="flex  justify-center	 items-center h-full ">
                <IconPrev className="text-xl rotate-180" style={{ fontSize: '40px' }} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostId

const PostCard = ({ coupangLink, imageLink, point1, point2, point3, productName }: Product) => {
  return (
    <div className="flex flex-col w-full h-auto mt-10 ">
      <h3 className="text-xl font-bold sm:text-2xl">{productName}</h3>

      <div className="flex flex-col sm:flex-row  relative mt-5 sm:gap-10">
        <div className="m-auto sm:m-0 w-full sm:w-[300px]   flex justify-center items-center flex-col gap-5">
          <div className=" w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]  m-auto  sm:m-0 relative  flex " style={{ flex: '0 0 auto;' }}>
            <ImageProxy src={imageLink} />
          </div>
          <Link
            href={coupangLink}
            target="_blank"
            className=" hidden sm:block mt-5 w-full group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

            <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">자세히 보기</span>
          </Link>
        </div>
        <div className="flex flex-col gap-3 py-3">
          <p className="font-bold sm:text-xl ">▪ {point1}</p>
          <p className="font-bold sm:text-xl ">▪ {point2}</p>
          <p className="font-bold sm:text-xl ">▪ {point3}</p>
        </div>
      </div>
      <Link
        href={coupangLink}
        target="_blank"
        className=" sm:hidden mt-5 w-full group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
      >
        <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

        <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">자세히 보기</span>
      </Link>
    </div>
  )
}

// 내생각에는 얘는 그냥 빌드를 위한 함수 같음
export async function generateStaticParams() {
  const posts = await getPost() // 내림차순으로 정렬한 모든 게시글을 불러와서
  return posts.map((post: { id: string }) => ({
    postId: post.id,
  }))
}

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const data = await getPostMeta(params.id)
  return {
    title: `${data.title} | ${process.env.NEXT_PUBLIC_ID}의 리뷰`,
    description: `${data.content}\n ${data.content.map((v, idx) => `${idx + 1}.${v}`)}`,
  }
}
type Props = {
  params: { id: string }
}
