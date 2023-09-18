import MariaDB from '@/lib/mariadb'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()
export async function GET(req: Request, content: any) {
  const { id } = content.params
  const num = parseInt(id, 10)
  const postData = await mariaDB.query<Post[]>(
    `
    SELECT id,comment,keyword,title,regDate  FROM  post  WHERE  id = ?;
      `,
    [num],
  )
  const detailData = await mariaDB.query<Product[]>(
    `
    SELECT productName,coupangLink,imageLink,point1,point2,point3
    FROM  postDetail  WHERE  postId = ?;
      `,
    [num],
  )
  const PrevData = (
    await mariaDB.query<Both[]>(
      `
    SELECT id, title FROM post WHERE id < ? ORDER BY id DESC LIMIT 1;
    `,
      [num],
    )
  )[0]
  const postNextData = (
    await mariaDB.query<Both[]>(
      `
    SELECT id, title FROM post WHERE id > ? ORDER BY id ASC LIMIT 1;
    `,
      [num],
    )
  )[0] // 결과가 배열이므로 [0]을 사용하여 첫 번째 요소를 가져옴

  const data: API.Detail = { post: postData[0], product: detailData, next: postNextData, prev: PrevData }

  return NextResponse.json(data ?? {})
}
