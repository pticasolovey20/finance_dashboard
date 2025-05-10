import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import TopBar from "@/components/top-bar/TopBar";

import "./globals.scss";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "https://github.com/pticasolovey20/finance_dashboard.git",
};

interface IRootLayoutProps {
  children: Readonly<ReactNode>;
}

const RootLayout = ({ children }: IRootLayoutProps) => {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <TopBar />
        <main className="min-h-[calc(100dvh-150px)] h-full p-4">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
