import { getPost } from '@/utils/post'
import { MetadataRoute } from 'next'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const post = await getPost()
  const posts: MetadataRoute.Sitemap = post.map((v) => ({
    url: process.env.NEXT_PUBLIC_BASE_URL + `${v.id}`,
    lastModified: new Date(v.regDate),
    changeFrequency: 'always',
  }))
  return [
    {
      url: 'https://www.mmew.site/',
      lastModified: new Date(),
      changeFrequency: 'daily',
    },
    ...posts,
  ]
}
