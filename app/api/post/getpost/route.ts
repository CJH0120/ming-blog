import MariaDB from '@/lib/mariadb'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()
export async function GET() {
  const data = await mariaDB.query<{ id: string; regDate: string }[]>(
    `
      SELECT  id,regDate FROM  post 
      `,
  )
  return NextResponse.json(data)
}
