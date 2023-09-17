import MariaDB from '@/lib/mariadb'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()
export async function GET(req: Request, content: any) {
  const { id } = content.params
  const postData = await mariaDB.query<Post[]>(
    `
    SELECT id,comment,keyword,title,regDate  FROM  post  WHERE  id = ?;
      `,
    [id],
  )
  const detailData = await mariaDB.query<Product[]>(
    `
    SELECT productName,coupangLink,imageLink,point1,point2,point3
    FROM  postDetail  WHERE  postId = ?;
      `,
    [id],
  )
  const data: API.Detail = { post: postData[0], product: detailData }

  return NextResponse.json(data ?? {})
}
