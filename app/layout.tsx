import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BottomNav from "@/components/shared/bottom-nav";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const satoshi = localfont({
  variable: "--font-satoshi",
  weight: "900",
  src: "./fonts/Satoshi-Variable.woff2",
  display: "swap"
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adiyogi Foundation",
  description: "Rebuilding Purpose. Restoring Dharma. Reviving the Sacred.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} antialiased flex flex-col items-center`}
      >
        <Header />
        <div className="px-6 md:px-20 py-80 md:py-80 pt-4 md:pt-12 pb-16 md:pb-20">
            {children}
        </div>
        <Toaster position="top-center"/>
        <BottomNav/>
        <Footer />
      </body>
    </html>
  );
}
