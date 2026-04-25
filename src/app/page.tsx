'use client';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (

  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center">
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-8 border-white/30 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      <h1 className="text-white text-5xl font-bold tracking-tight mb-3">
        Contacts Dashboard
      </h1>

      <p className="text-blue-200/80 text-sm tracking-widest">
        REDIRECTING TO LOGIN
      </p>

      <div className="w-80 mx-auto mt-10 h-0.5 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white w-1/3 animate-[loading_1.5s_infinite_linear]"></div>
      </div>
    </div>
  </div>
  )

}