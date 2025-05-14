"use client";

import { ProviderType } from "@/types/auth";
import { useAuthStore } from "@/store/authStore";
import { loginWithProvider } from "@/actions/loginWithProvider";

import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const ProvidersWrapper = () => {
  const { isLoading, setLoading } = useAuthStore();

  const handleLoginWithProvider = async (provider: ProviderType) => {
    setLoading(true);
    loginWithProvider(provider).finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 mt-4">
      <Button
        variant="outline"
        className="w-full h-10"
        aria-label="Google auth provider button"
        onClick={() => handleLoginWithProvider("google")}
        disabled={isLoading}
      >
        <FcGoogle />
      </Button>

      <Button
        variant="outline"
        className="w-full h-10"
        aria-label="GitHub auth provider button"
        onClick={() => handleLoginWithProvider("github")}
        disabled={isLoading}
      >
        <BsGithub />
      </Button>
    </div>
  );
};

export default ProvidersWrapper;
