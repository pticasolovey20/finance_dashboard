import { logout } from "@/actions/logout";

import { Button } from "@/components/ui/button";
import AccountSectionWrapper from "@/components/SectionWrapper";

const AccountSecurity = () => {
  return (
    <AccountSectionWrapper
      sectionTitle="Account Security"
      sectionDescription="Manage your account security"
    >
      <form action={logout}>
        <Button
          type="submit"
          variant="outline"
          className="text-muted-foreground hover:text-primary"
        >
          Logout
        </Button>
      </form>
    </AccountSectionWrapper>
  );
};

export default AccountSecurity;
