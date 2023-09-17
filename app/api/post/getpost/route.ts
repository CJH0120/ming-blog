import MariaDB from '@/lib/mariadb'
import { NextResponse } from 'next/server'

const mariaDB = MariaDB.getInstance()
export async function GET() {
  const data = await mariaDB.query<string[]>(
    `
      SELECT  id FROM  post ;
      `,
  )
  return NextResponse.json(data)
}
