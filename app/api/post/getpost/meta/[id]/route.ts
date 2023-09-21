import MariaDB from '@/lib/mariadb'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()
export async function GET(req: Request, contents: any) {
  const { id } = contents.params

  const meta = await mariaDB.query<{ title: string; thumbnail: string }[]>(
    `
    SELECT title,thumbnail  FROM  post  WHERE  id = ?;
      `,
    [id],
  )
  const metaContent = await mariaDB.query<{ productName: string }[]>(
    `
    SELECT productName  FROM  postDetail  WHERE  postId = ?;
      `,
    [id],
  )
  const title = meta[0]?.title || ''
  const thumbnail = meta[0]?.thumbnail || ''
  const content = metaContent.map((row) => row.productName)
  const data: API.Meta = {
    title,
    content,
    thumbnail,
  }
  return NextResponse.json(data)
}
