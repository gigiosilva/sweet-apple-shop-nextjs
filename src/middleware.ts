import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/products', request.url));
  }
  return NextResponse.next();
}
