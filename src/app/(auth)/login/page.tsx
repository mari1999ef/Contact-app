'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setError('Invalid email or password.');
                return;
            }

            router.push('/dashboard/contacts');
            router.refresh();
        } catch {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 ltr">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/30">
                <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back</h1>
                <p className="mb-8 text-center text-sm text-slate-400 ">Sign in to access your contacts dashboard.</p>

                <form onSubmit={handleLogin} className="space-y-6 ltr text-left">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="123456"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-400 ">{error}</p>}

                    <Button type="submit" className="w-full cursor-pointer " disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Demo account: admin@example.com <br />
                    Password: 123456
                </p>
            </div>
        </div>
    );
}