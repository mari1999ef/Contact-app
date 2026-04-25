import ContactsClient from './contacts-client';
import { getPaginatedContacts } from '@/libs/contacts';

const ITEMS_PER_PAGE = 8;

type SearchParamsInput =
    | Promise<{ page?: string; search?: string }>
    | { page?: string; search?: string };

type ContactsPageProps = {
    searchParams?: SearchParamsInput;
};

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
    const sp = await Promise.resolve(searchParams ?? {});
    const currentPage = Math.max(1, Number(sp.page) || 1);
    const searchQuery = (sp.search ?? '').trim();

    const { data, totalCount } = await getPaginatedContacts(
        currentPage,
        ITEMS_PER_PAGE,
        searchQuery
    );
    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

    return (
        <ContactsClient
            contacts={data}
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
        />
    );
}
