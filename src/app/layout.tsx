import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Contacts Dashboard | Next.js',
  description: 'Tech Test Project',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fa" dir="rtl">
      <body>{children}</body>
      </html>
  );
}