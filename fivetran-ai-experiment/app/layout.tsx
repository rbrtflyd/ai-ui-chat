import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SidebarNavigation from '@/components/Navigation/SidebarNavigation';

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
      <body className={`antialiased bg-white ${inter.className}`}>
        <div className="flex flex-row w-full h-screen">
          <SidebarNavigation />
          <div className="flex flex-col w-full h-full overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
