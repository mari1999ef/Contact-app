'use client';

import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <nav className="border-b border-slate-800 bg-slate-900/90 px-8 py-5 flex items-center justify-between backdrop-blur">
                <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                        C
                    </div>
                    <h1 className="text-2xl font-bold">Contacts Dashboard</h1>
                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg font-medium transition-colors border border-red-400/20"
                >
                    Logout
                </button>
            </nav>

            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
