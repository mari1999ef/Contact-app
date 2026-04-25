'use client';



import {Contact} from "@/libs/types";

interface ContactTableProps {
    contacts: Contact[];
    loading: boolean;
    error: string;
}

export default function ContactTable({ contacts, loading, error }: ContactTableProps) {
    return (
        <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-700 overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                    <th className="px-8 py-5 text-left font-semibold text-slate-300">Full Name</th>
                    <th className="px-8 py-5 text-left font-semibold text-slate-300">Email</th>
                    <th className="px-8 py-5 text-left font-semibold text-slate-300">Phone Number</th>
                    <th className="px-8 py-5 text-left font-semibold text-slate-300">Company</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">

                {/* Loading State */}
                {loading && (
                    <tr>
                        <td colSpan={4} className="py-24">
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="w-9 h-9 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-slate-400">Loading contacts...</p>
                            </div>
                        </td>
                    </tr>
                )}

                {/* Error State */}
                {!loading && error && (
                    <tr>
                        <td colSpan={4} className="py-24">
                            <div className="text-center">
                                <div className="text-red-400 text-5xl mb-4">⚠️</div>
                                <p className="text-red-400 font-medium text-lg">{error}</p>
                                <p className="text-slate-500 text-sm mt-1">Try refreshing the page in a few seconds.</p>
                            </div>
                        </td>
                    </tr>
                )}

                {/* Empty State */}
                {!loading && !error && contacts.length === 0 && (
                    <tr>
                        <td colSpan={4} className="py-20 text-center text-slate-400">
                            No contacts found
                        </td>
                    </tr>
                )}

                {/* Data Rows */}
                {!loading && !error && contacts.map((contact) => (
                    <tr
                        key={contact.id}
                        className="hover:bg-slate-800/60 transition-colors"
                    >
                        <td className="px-8 py-5 font-medium">{contact.name}</td>
                        <td className="px-8 py-5 text-blue-300">{contact.email}</td>
                        <td className="px-8 py-5 text-slate-300">{contact.phone}</td>
                        <td className="px-8 py-5 text-slate-300">{contact.company}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}