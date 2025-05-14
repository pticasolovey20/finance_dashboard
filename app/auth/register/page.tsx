import { AuthRoutesEnum } from "@/types/route";

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/forms/RegisterForm";
import ProvidersWrapper from "@/components/forms/ProvidersWrapper";

const RegisterPage = () => {
  return (
    <div className="max-w-[420px] w-full flex flex-col justify-center z-10">
      <h4 className="text-3xl sm:text-4xl font-semibold mb-10">Register</h4>

      <div className="mb-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back to login page button"
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
