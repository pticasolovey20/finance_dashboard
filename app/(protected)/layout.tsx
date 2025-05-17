import { ReactNode } from "react";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface IMainLayoutProps {
  children: Readonly<ReactNode>;
}

const MainLayout = async ({ children }: IMainLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-h-[100dvh] h-full w-full p-4">
        <SidebarTrigger className="absolute" />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
