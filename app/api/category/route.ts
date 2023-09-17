import MariaDB from '@/lib/mariadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()

export async function GET(req: Request, res: Response, content: any) {
  const data = await mariaDB.query<API.Category[]>(
    `
    select * from category
    `,
  )

  return NextResponse.json(data)
}

export async function POST(req: Request, res: Response) {
  const { title } = await req.json()
  await mariaDB.query<any[]>(
    `
    INSERT INTO category (categoryName)
      values
      (?);
    `,
    [title],
  )

  return NextResponse.json({ status: 200 })
}
export async function DELETE(req: Request, res: Response) {
  const { id } = await req.json()
  await mariaDB.query<any[]>(
    `
    DELETE FROM category WHERE id = ?;
    `,
    [id],
  )

  return NextResponse.json({ status: 200 })
}
