import AccountForm from "@/components/forms/AccountForm";
import ContentHeader from "@/components/account/ContentHeader";

const Account = () => {
  return (
    <>
      <ContentHeader
        title="Account"
        description="Realtime information and activities of your property"
      />

      <AccountForm />
    </>
  );
};

export default Account;
