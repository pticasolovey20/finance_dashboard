import { logout } from "@/actions/logout";

import { Button } from "@/components/ui/button";
import ContentHeader from "@/components/account/ContentHeader";

const AccountSecurity = () => {
  return (
    <>
      <ContentHeader
        title="Account Security"
        description="Manage your account security"
      />

      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </>
  );
};

export default AccountSecurity;
