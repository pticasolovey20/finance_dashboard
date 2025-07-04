import dynamic from "next/dynamic";

import CircleLoader from "@/components/CircleLoader";
import { Separator } from "@/components/ui/separator";
import AccountSectionHeader from "@/components/SectionHeader";
import AccountSecurity from "@/components/account/AccountSecurity";

const AccountForm = dynamic(() => import("@/components/forms/AccountForm"), {
  ssr: false,
  loading: () => <CircleLoader />,
});

const AccountPage = () => {
  return (
    <div className="max-w-[800px] w-full flex flex-col mt-12 mx-auto">
      <AccountSectionHeader
        title="Account"
        description="Realtime information and activities of your property"
      />

      <Separator className="my-4" />
      <AccountForm />
      <AccountSecurity />
    </div>
  );
};

export default AccountPage;
