import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface IMainLayoutProps {
  children: Readonly<ReactNode>;
}

const MainLayout = async ({ children }: IMainLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />

        <main className="min-h-[100dvh] h-full w-full p-4">
          <SidebarTrigger className="absolute top-6 w-6 h-6 text-muted-foreground hover:text-primary" />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default MainLayout;
