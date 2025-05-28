import { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

import ThemeProvider from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "@/app/styles/globals.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "https://github.com/pticasolovey20/finance_dashboard.git",
};

interface IRootLayoutProps {
  children: Readonly<ReactNode>;
}

const RootLayout = async ({ children }: IRootLayoutProps) => {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(montserrat.variable, "font-sans antialiased")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
