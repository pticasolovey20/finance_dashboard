import { logout } from "@/actions/logout";

import { Button } from "@/components/ui/button";
import ContentHeader from "@/components/account/ContentHeader";

const AccountSecurity = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <ContentHeader
        title="Account Security"
        description="Manage your account security"
      />

      <form action={logout}>
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  );
};

export default AccountSecurity;
