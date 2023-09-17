import { AddCoupangProps } from '@/app/(admin)/admin/post/write/page'
import MariaDB from '@/lib/mariadb'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
const mariaDB = MariaDB.getInstance()

export async function GET(req: Request, content: any) {
  const { searchParams } = new URL(req.url)
  const param = searchParams.get('v')
  if (!param) {
    const data = await mariaDB.query<API.Card[]>(
      `
      select id,thumbnail,keyword,comment,regDate,title from post 
      `,
    )

    return NextResponse.json(data.map((v) => ({ ...v, regDate: Test(v.regDate) })))
  } else {
    const data = await mariaDB.query<API.Card[]>(
      `
      select id,thumbnail,keyword,comment,regDate,title from post WHERE  category =?;
      `,
      [param],
    )

    return NextResponse.json(data.map((v) => ({ ...v, regDate: Test(v.regDate) })))
  }
}
const Test = (str: string) => {
  const originalDate = new Date(str)
  const year = originalDate.getFullYear()
  const month = originalDate.getMonth() + 1
  const day = originalDate.getDate()
  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}
export async function POST(req: Request, res: Response) {
  const { writeData, addData } = await req.json()
  const { get } = cookies()
  const token = get('token')?.value
  const auth = jwt.verify(token ?? '', '213123')
  const result = await mariaDB.query<any[]>(
    `
      INSERT INTO post (memberid,comment,thumbnail,keyword,title,category)
        values
        (?,?,?,?,?,?);
      `,
    [(auth as { id: string }).id, writeData.comment, writeData.thumbnail, writeData.keyword, writeData.title, writeData.category],
  )
  const { insertId } = result as any

  ;(addData as AddCoupangProps[]).map(async (v) => {
    await mariaDB.query<any[]>(
      `
      INSERT INTO postDetail (productName,coupangLink,imageLink,point1,point2,point3,postId)
       values
      (? , ? , ? , ? , ? , ? , ? );
      `,
      [v.productName, v.coupangLink, v.imageLink, v.point1, v.point2, v.point3, insertId],
    )
  })
  return NextResponse.redirect(new URL('/admin/post', req.url))
}

export async function DELETE(req: Request, res: Response) {
  const { id } = await req.json()
  await mariaDB.query<any[]>(
    `
    DELETE FROM postDetail WHERE postId = ?;
    `,
    [id],
  )

  await mariaDB.query<any[]>(
    `
    DELETE FROM post WHERE id = ?;
    `,
    [id],
  )
  return NextResponse.redirect(new URL('/admin/post', req.url))
}
