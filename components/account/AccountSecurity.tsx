import { logout } from "@/actions/logout";

import SubmitButton from "@/components/forms/SubmitButton";
import AccountSectionWrapper from "@/components/SectionWrapper";

const AccountSecurity = () => {
  return (
    <AccountSectionWrapper
      sectionTitle="Account Security"
      sectionDescription="Manage your account security"
    >
      <form action={logout}>
        <SubmitButton label="Logout" classNames="w-fit" />
      </form>
    </AccountSectionWrapper>
  );
};

export default AccountSecurity;
