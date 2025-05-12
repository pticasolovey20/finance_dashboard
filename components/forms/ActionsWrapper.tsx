import Link from "next/link";
import { Button } from "@/components/ui/button";

const ActionsWrapper = () => {
  return (
    <div className="flex justify-between">
      <Button
        variant="link"
        className="min-w-[64px] py-2 px-3 font-semibold capitalize"
      >
        <Link href="#">Forgot Password</Link>
      </Button>

      <Button
        variant="link"
        className="min-w-[64px] py-2 px-3 font-semibold capitalize"
      >
        <Link href="/auth/register">Create Account</Link>
      </Button>
    </div>
  );
};

export default ActionsWrapper;
