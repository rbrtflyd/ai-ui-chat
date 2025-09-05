import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fivetran Generative UI Experiment',
  description: 'Using AI to generate UI for Fivetran',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-zinc-50 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
