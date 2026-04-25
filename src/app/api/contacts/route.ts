import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedContacts } from '@/libs/contacts';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.max(1, Number(searchParams.get('limit') || '8'));
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const { data, totalCount } = await getPaginatedContacts(page, limit, search);

    return NextResponse.json(
        { data, totalCount },
        { headers: { 'x-total-count': String(totalCount) } }
    );
}
