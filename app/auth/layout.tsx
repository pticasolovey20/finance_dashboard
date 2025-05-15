"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

import AuthLeftSide from "@/components/AuthLeftSide";
import CircleLoader from "@/components/CircleLoader";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  const { isLoading } = useAuthStore();

  return (
    <main
      className={cn(
        "min-h-[100dvh] h-full relative p-4 md:p-8 lg:p-12",
        "flex items-center justify-center overflow-hidden"
      )}
    >
      <div
        className={cn(
          "absolute top-0 right-0 w-[70%] h-full",
          "bg-[#f7f7f7] z-0 pointer-events-none",
          "origin-bottom -skew-x-[13.9deg]"
        )}
      />

      <div className="w-full h-full flex justify-center">
        <AuthLeftSide />

        <div className="relative max-w-[420px] w-full z-10">
          {isLoading && <CircleLoader />}
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
