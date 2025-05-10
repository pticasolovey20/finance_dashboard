import { auth } from "@/auth";
import { logout } from "@/actions/logout";

import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4">
      {JSON.stringify(session)}

      <form action={logout}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default DashboardPage;
