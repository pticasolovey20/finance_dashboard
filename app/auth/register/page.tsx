import { AuthRoutesEnum } from "@/types/route";

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/forms/RegisterForm";
import ProvidersWrapper from "@/components/auth/ProvidersWrapper";

const RegisterPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <h4 className="text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 lg:mb-10">
        Register
      </h4>

      <div className="mb-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back to login page button"
          className="text-muted-foreground hover:bg-transparent hover:text-primary"
        >
          <Link href={AuthRoutesEnum.LOGIN}>
            <IoMdArrowBack />
          </Link>
        </Button>
      </div>

      <RegisterForm />
      <ProvidersWrapper />
    </div>
  );
};

export default RegisterPage;
