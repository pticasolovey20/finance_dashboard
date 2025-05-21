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
        <AppSidebar user={session!.user} />

        <main className="min-h-[100dvh] h-full w-full p-4">
          <SidebarTrigger className="absolute" />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default MainLayout;
