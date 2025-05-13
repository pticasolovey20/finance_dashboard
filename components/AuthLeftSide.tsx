import React, { lazy, Suspense } from "react";
import dynamic from "next/dynamic";

const Logo = dynamic(() => import("@/components/Logo"), { ssr: false });
const Slogan = lazy(() => import("@/components/Slogan"));

const AuthLeftSide = () => {
  return (
    <div className="max-w-[479px] w-full hidden md:flex flex-col justify-center mr-[52px] z-10">
      <Logo />

      <Suspense fallback={null}>
        <Slogan />
      </Suspense>
    </div>
  );
};

export default AuthLeftSide;
