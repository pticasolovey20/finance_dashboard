import { AuthRoutesEnum } from "@/types/route";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const ActionsWrapper = () => {
  return (
    <div className="flex justify-between">
      <Button
        variant="link"
        className="min-w-[64px] py-2 px-3 font-semibold capitalize"
        aria-label="Forgot password link button"
      >
        <Link
          href="#"
          className="text-[12px] text-muted-foreground hover:text-primary"
        >
          Forgot Password
        </Link>
      </Button>

      <Button
        variant="link"
        className="min-w-[64px] py-2 px-3 font-semibold capitalize"
        aria-label="Create account link button"
      >
        <Link
          href={AuthRoutesEnum.REGISTER}
          className="text-[12px] text-muted-foreground hover:text-primary"
        >
          Create Account
        </Link>
      </Button>
    </div>
  );
};

export default ActionsWrapper;
