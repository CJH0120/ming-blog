import { getPost } from '@/utils/post'

export default async function Sitemap() {
  const post = await getPost()
  const posts = post.map((v) => ({ url: process.env.NEXT_PUBLIC_BASE_URL + `/${v.id}`, lastModified: new Date() }))

  return [...posts]
}
