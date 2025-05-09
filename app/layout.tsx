import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
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
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
