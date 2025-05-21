import Link from "next/link";
import { AuthRoutesEnum } from "@/types/route";

const LinksWrapper = () => {
  return (
    <div className="flex justify-between">
      <Link
        href="#"
        aria-label="Forgot password link"
        className="p-2 text-muted-foreground hover:text-primary"
      >
        Forgot Password
      </Link>

      <Link
        href={AuthRoutesEnum.REGISTER}
        aria-label="Create account link"
        className="p-2 text-muted-foreground hover:text-primary"
      >
        Create Account
      </Link>
    </div>
  );
};

export default LinksWrapper;
