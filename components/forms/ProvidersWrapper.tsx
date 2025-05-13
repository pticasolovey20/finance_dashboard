import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const ProvidersWrapper = () => {
  return (
    <div className="flex flex-col xs:flex-row gap-4 mt-4">
      <Button
        variant="outline"
        className="w-full h-10"
        aria-label="Google auth provider button"
      >
        <FcGoogle />
      </Button>

      <Button
        variant="outline"
        className="w-full h-10"
        aria-label="GitHub auth provider button"
      >
        <BsGithub />
      </Button>
    </div>
  );
};

export default ProvidersWrapper;
