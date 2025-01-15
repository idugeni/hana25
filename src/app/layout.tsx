import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MetadataProvider } from "@/utils/MetadataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - HANA25",
    default: "HANA25 | Happy 25th Birthday, Rikhanatun Ni'mah!",
  },
  description: "A special project to celebrate the 25th birthday of Rikhanatun Ni'mah, filled with memories and love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="abyss" lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MetadataProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </MetadataProvider>
      </body>
    </html>
  );
}
