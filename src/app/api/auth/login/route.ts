import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    let body: { email?: string; password?: string };
    try {
        body = (await request.json()) as { email?: string; password?: string };
    } catch {
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }

    const email = body.email?.trim();
    const password = body.password;

    if (email !== 'admin@example.com' || password !== '123456') {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
        name: 'auth_session',
        value: 'authenticated',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
    });
    return res;
}
