import { getCurrentUser } from "@/lib/auth";

import Account from "@/components/account/Account";
import CircleLoader from "@/components/CircleLoader";
import AccountSecurity from "@/components/account/AccountSecurity";
import IntegratedAccounts from "@/components/account/IntegratedAccounts";

const AccountPage = async () => {
  const user = await getCurrentUser();
  if (!user) return <CircleLoader />;

  return (
    <div className="w-full flex flex-col mt-10">
      <div>
        <Account />
      </div>

      <div className="mt-8">
        <IntegratedAccounts />
      </div>

      <div className="mt-8">
        <AccountSecurity />
      </div>
    </div>
  );
};

export default AccountPage;
