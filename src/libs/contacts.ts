import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Contact } from '@/libs/types';

type ContactsDbShape = {
    contacts?: unknown;
};

const DEFAULT_JSON_SERVER = 'http://127.0.0.1:3001';

function jsonServerBaseUrl(): string {
    return process.env.CONTACTS_JSON_SERVER_URL?.replace(/\/$/, '') ?? DEFAULT_JSON_SERVER;
}

function isValidContact(value: unknown): value is Contact {
    if (!value || typeof value !== 'object') return false;
    const contact = value as Record<string, unknown>;
    return (
        typeof contact.id === 'number' &&
        typeof contact.name === 'string' &&
        typeof contact.email === 'string' &&
        typeof contact.phone === 'string' &&
        typeof contact.company === 'string'
    );
}

function toContactsArray(input: unknown): Contact[] {
    let candidateList: unknown[] = [];
    if (Array.isArray(input)) {
        candidateList = input;
    } else if (input && typeof input === 'object') {
        candidateList = Object.values(input as Record<string, unknown>);
    }
    return candidateList.filter(isValidContact);
}

export async function getContactsData() {
    const dbPath = path.join(process.cwd(), 'db', 'db.json');
    const raw = await readFile(dbPath, 'utf8');
    const parsed = JSON.parse(raw) as ContactsDbShape;
    return toContactsArray(parsed.contacts);
}

async function getPaginatedContactsFromFile(
    page: number,
    limit: number,
    search: string
) {
    const allContacts = await getContactsData();
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = allContacts.filter((contact) => {
        if (!normalizedSearch) return true;
        const text = `${contact.name} ${contact.email}`.toLowerCase();
        return text.includes(normalizedSearch);
    });

    const totalCount = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, totalCount };
}

async function tryGetPaginatedFromJsonServer(
    page: number,
    limit: number,
    search: string
): Promise<{ data: Contact[]; totalCount: number } | null> {
    const base = jsonServerBaseUrl();
    const params = new URLSearchParams({
        _page: String(page),
        _limit: String(limit),
    });
    const q = search.trim();
    if (q) params.set('q', q);

    try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(`${base}/contacts?${params.toString()}`, {
            cache: 'no-store',
            signal: controller.signal,
        });
        clearTimeout(t);

        if (!res.ok) return null;

        const raw = (await res.json()) as unknown;
        if (!Array.isArray(raw)) return null;

        const data = raw.filter(isValidContact);
        const headerTotal =
            res.headers.get('X-Total-Count') ?? res.headers.get('x-total-count');
        if (headerTotal === null) return null;
        const totalCount = parseInt(headerTotal, 10);
        if (!Number.isFinite(totalCount)) return null;

        return { data, totalCount };
    } catch {
        return null;
    }
}

export async function getPaginatedContacts(
    page: number,
    limit: number,
    search: string
) {
    const fromApi = await tryGetPaginatedFromJsonServer(page, limit, search);
    if (fromApi) return fromApi;
    return getPaginatedContactsFromFile(page, limit, search);
}
