import { Button } from "@/components/ui/button";
import ContentHeader from "@/components/account/ContentHeader";

const IntegratedAccounts = () => {
  return (
    <>
      <ContentHeader
        title="Integrated Accounts"
        description="Manage your current integrated accounts"
      />

      <div className="flex flex-col gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            className="w-fit flex items-center gap-4 p-3 border border-black"
            key={index}
          >
            <div className="h-8 w-8 bg-gray-400" />

            <div>
              <span>TITLE</span>
              <span>DESCRIPTION</span>
            </div>

            <Button>CONECTED</Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default IntegratedAccounts;
