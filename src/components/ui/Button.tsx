import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={`rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
            {...props}
        >
            {children}
        </button>
    );
}