import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('auth_session')?.value === 'authenticated';
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/dashboard') && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === '/login' && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard/contacts', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard/:path*'],
};