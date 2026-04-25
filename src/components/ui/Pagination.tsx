'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onPageChange
                                   }: PaginationProps) {

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
               Prev
            </button>

            <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-11 h-11 rounded-xl font-medium transition-all flex items-center justify-center
              ${page === currentPage
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
                Next
            </button>
        </div>
    );
}