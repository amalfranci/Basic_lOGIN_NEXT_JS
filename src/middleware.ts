import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// Configuration for the middleware
export const config = {
  matcher: [
    '/',         // Matches the root path
    '/profile',  // Matches the profile page
    '/login',    // Matches the login page
    '/signup'    // Matches the signup page
  ],
};
