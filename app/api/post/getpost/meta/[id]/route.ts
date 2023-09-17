import MariaDB from '@/lib/mariadb'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()
export async function GET(req: Request, contents: any) {
  const { id } = contents.params

  const metaTitle = await mariaDB.query<{ title: string }[]>(
    `
    SELECT title  FROM  post  WHERE  id = ?;
      `,
    [id],
  )
  const metaContent = await mariaDB.query<{ productName: string }[]>(
    `
    SELECT productName  FROM  postDetail  WHERE  postId = ?;
      `,
    [id],
  )
  const title = metaTitle[0]?.title || ''
  const content = metaContent.map((row) => row.productName)
  const data: API.Meta = {
    title,
    content,
  }
  return NextResponse.json(data)
}
