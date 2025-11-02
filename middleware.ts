import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Note: The admin dashboard component handles authentication client-side
  // and redirects to login if the user is not authenticated.
  // This middleware file can be extended for additional server-side checks if needed.
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}

