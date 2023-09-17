import MariaDB from '@/lib/mariadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const mariaDB = MariaDB.getInstance()

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { id, pw } = await req.json()
  const a = await mariaDB.query<{ id: string; userId: string; userPw: string }[]>(
    `
    SELECT *   from member WHERE userId = ? AND userPw =? ;
    `,
    [id, pw],
  )
  if (!a.length) {
    return NextResponse.json(
      {
        message: '로그인 오류',
      },
      {
        status: 400,
      },
    )
  } else {
    const data = a[0]
    const token = jwt.sign({ ...data }, '213123')

    cookies().set('token', token)

    return NextResponse.redirect(new URL('/', req.url))
  }
}
