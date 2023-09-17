import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const { get } = cookies()
  const token = get('token')?.value
  if (!!token) {
    const auth = jwt.decode(token)
    if (!auth) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return
  }
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/admin/:path*',
}
