import { ReactNode } from "react";
import AccountSectionHeader from "@/components/account/AccountSectionHeader";

interface IAccountSectionWrapperProps {
  sectionTitle: string;
  sectionDescription?: string;
  children: ReactNode;
}

const AccountSectionWrapper = ({
  sectionTitle,
  sectionDescription,
  children,
}: IAccountSectionWrapperProps) => {
  return (
    <div className="flex flex-col gap-6">
      <AccountSectionHeader
        title={sectionTitle}
        description={sectionDescription}
      />

      {children}
    </div>
  );
};

export default AccountSectionWrapper;
