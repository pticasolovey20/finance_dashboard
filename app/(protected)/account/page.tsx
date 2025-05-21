import { Separator } from "@/components/ui/separator";
import AccountForm from "@/components/forms/AccountForm";
import ContentHeader from "@/components/account/ContentHeader";
import AccountSecurity from "@/components/account/AccountSecurity";

const AccountPage = () => {
  return (
    <div className="max-w-[800px] w-full flex flex-col mt-10">
      <ContentHeader
        title="Account"
        description="Realtime information and activities of your property"
      />

      <Separator className="mt-4 mb-4" />
      <AccountForm />
      <AccountSecurity />
    </div>
  );
};

export default AccountPage;
