import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContentHeader from "@/components/account/AccountSectionHeader";

const IntegratedAccounts = () => {
  return (
    <Fragment>
      <ContentHeader
        title="Integrated Accounts"
        description="Manage your current integrated accounts"
      />

      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            className="w-full flex items-center gap-4 p-3 border rounded-lg shadow"
            key={index}
          >
            <div className="h-10 w-10 rounded-md bg-gray-400" />

            <div className="flex-1 flex flex-col">
              <span>TITLE</span>
              <span className="text-muted-foreground">DESCRIPTION</span>
            </div>

            <Button variant="outline">CONECTED</Button>
          </div>
        ))}
      </div>

      <Separator className="mt-4 mb-4" />
    </Fragment>
  );
};

export default IntegratedAccounts;
