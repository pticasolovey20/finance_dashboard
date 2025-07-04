"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { useAuthStore } from "@/store/useAuthStore";

import CircleLoader from "@/components/CircleLoader";
import AuthLeftSide from "@/components/auth/AuthLeftSide";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  const { isLoading } = useAuthStore();

  return (
    <main
      className={cn(
        "min-h-[100dvh] h-full relative p-4 md:p-8 lg:p-12",
        "flex items-center justify-center overflow-hidden",
        "md:bg-muted text-foreground"
      )}
    >
      <div
        className={cn(
          "absolute top-0 right-0 w-[70%] h-full",
          "bg-background z-0 pointer-events-none",
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
