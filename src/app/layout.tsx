'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MetadataProvider } from '@/utils/MetadataContext';
import AudioPlayer from '@/components/AudioPlayer';
import Snowfall from 'react-snowfall';
import { useMetadata } from '@/utils/MetadataContext';
import { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useMetadata(
    "HANA25 | Happy 25th Birthday, Rikhanatun Ni'mah!",
    "A special project to celebrate the 25th birthday of Rikhanatun Ni'mah, filled with memories and love."
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html data-theme='abyss' lang='id'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Efek Salju */}
        <Snowfall
          snowflakeCount={150}
          speed={[0.5, 0.5]}
          radius={[1, 3]}
          color='white'
        />
        <MetadataProvider>
          {/* Loading Screen */}
          {isLoading && (
            <div className='fixed inset-0 w-screen h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center z-50'>
              <span className='loading loading-infinity loading-xl'></span>
            </div>
          )}

          {/* Konten Utama */}
          {!isLoading && (
            <>
              <Navbar />
              <main className='bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen w-full'>
                {children}
              </main>
              <Footer />
            </>
          )}
        </MetadataProvider>
        <AudioPlayer />
      </body>
    </html>
  );
}
