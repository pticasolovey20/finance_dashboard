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

        <main className="relative min-h-[100dvh] h-full w-full p-4 overflow-x-hidden">
          <SidebarTrigger className="absolute top-4  md:top-[26px] w-5 h-5 text-muted-foreground hover:text-primary" />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default MainLayout;
