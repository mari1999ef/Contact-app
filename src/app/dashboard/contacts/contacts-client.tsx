'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Contact } from '@/libs/types';
import Pagination from '@/components/ui/Pagination';
import { Input } from '@/components/ui/Input';
import ContactTable from '@/components/ui/ContactTable';

type ContactsClientProps = {
    contacts: Contact[];
    currentPage: number;
    totalPages: number;
    searchQuery: string;
};

export default function ContactsClient({
    contacts,
    currentPage,
    totalPages,
    searchQuery,
}: ContactsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [searchInput, setSearchInput] = useState(searchQuery);
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (searchDebounceRef.current) {
                clearTimeout(searchDebounceRef.current);
            }
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);

        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }
        searchDebounceRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (value.trim()) {
                params.set('search', value.trim());
            } else {
                params.delete('search');
            }
            params.set('page', '1');
            router.push(`${pathname}?${params.toString()}`);
        }, 350);
    };

    const goToPage = (page: number) => {
        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-bold text-white">Contacts</h2>

                <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full md:w-96 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
            </div>

            <ContactTable contacts={contacts} loading={false} error="" />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />
        </div>
    );
}
