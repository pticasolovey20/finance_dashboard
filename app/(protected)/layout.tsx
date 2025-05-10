import { ReactNode } from "react";
import TopBar from "@/components/top-bar/TopBar";

interface IMainLayoutProps {
  children: Readonly<ReactNode>;
}

const MainLayout = async ({ children }: IMainLayoutProps) => {
  return (
    <>
      <TopBar />
      <main className="min-h-[calc(100dvh-150px)] h-full p-4">{children}</main>
    </>
  );
};

export default MainLayout;
