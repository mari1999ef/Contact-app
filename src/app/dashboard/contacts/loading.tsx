export default function ContactsLoading() {
    return (
        <div className="max-w-6xl mx-auto animate-pulse">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="h-9 w-40 rounded-lg bg-slate-800" />
                <div className="h-12 w-full rounded-xl bg-slate-800 md:w-96" />
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
                <div className="border-b border-slate-800 bg-slate-800/50 px-8 py-5">
                    <div className="flex gap-6">
                        {['w-28', 'w-36', 'w-32', 'w-24'].map((w) => (
                            <div key={w} className={`h-4 rounded ${w} bg-slate-700`} />
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-slate-800 px-8 py-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex gap-6 py-5">
                            <div className="h-4 flex-1 rounded bg-slate-800" />
                            <div className="h-4 flex-1 rounded bg-slate-800" />
                            <div className="h-4 flex-1 rounded bg-slate-800" />
                            <div className="h-4 flex-1 rounded bg-slate-800" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 flex justify-center gap-2">
                <div className="h-10 w-20 rounded-xl bg-slate-800" />
                <div className="h-10 w-10 rounded-xl bg-slate-800" />
                <div className="h-10 w-10 rounded-xl bg-slate-800" />
                <div className="h-10 w-20 rounded-xl bg-slate-800" />
            </div>
        </div>
    );
}
