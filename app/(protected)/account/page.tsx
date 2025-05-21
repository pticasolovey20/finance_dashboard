import { getCurrentUser } from "@/lib/auth";

import CircleLoader from "@/components/CircleLoader";
import { Separator } from "@/components/ui/separator";
import AccountForm from "@/components/forms/AccountForm";
import ContentHeader from "@/components/account/ContentHeader";
import AccountSecurity from "@/components/account/AccountSecurity";
import IntegratedAccounts from "@/components/account/IntegratedAccounts";

const AccountPage = async () => {
  const user = await getCurrentUser();
  if (!user) return <CircleLoader />;

  return (
    <div className="max-w-[800px] w-full flex flex-col mt-10">
      <ContentHeader
        title="Account"
        description="Realtime information and activities of your property"
      />

      <Separator className="mt-4 mb-4" />
      <AccountForm />
      <Separator className="mt-4 mb-4" />

      <IntegratedAccounts />
      <AccountSecurity />
    </div>
  );
};

export default AccountPage;
