'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MetadataProvider } from "@/utils/MetadataContext";
import AudioPlayer from "@/components/AudioPlayer";
import Snowfall from "react-snowfall";
import { useMetadata } from "@/utils/MetadataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

  return (
    <html data-theme="abyss" lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        {/* Efek Salju */}
        <Snowfall
          snowflakeCount={150}
          speed={[0.5, 0.5]}
          radius={[1, 3]}
          color="white"
        />
        <MetadataProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MetadataProvider>
        <AudioPlayer />
      </body>
    </html>
  );
}
