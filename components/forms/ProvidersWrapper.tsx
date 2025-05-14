"use client";

import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { loginWithProvider } from "@/actions/loginWithProvider";

const ProvidersWrapper = () => {
  return (
    <div className="flex flex-col xs:flex-row gap-4 mt-4">
      <form action={() => loginWithProvider("google")} className="w-full">
        <Button
          variant="outline"
          className="w-full h-10"
          aria-label="Google auth provider button"
        >
          <FcGoogle />
        </Button>
      </form>

      <form action={() => loginWithProvider("github")} className="w-full">
        <Button
          variant="outline"
          className="w-full h-10"
          aria-label="GitHub auth provider button"
        >
          <BsGithub />
        </Button>
      </form>
    </div>
  );
};

export default ProvidersWrapper;
