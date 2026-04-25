import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={`w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 ${className ?? ''}`}
            {...props}
        />
    );
}