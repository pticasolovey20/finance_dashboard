import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 p-1 rounded-full bg-gray-200">
        <Button variant="outline" className="h-12 w-12 rounded-full">
          <Settings />
        </Button>

        <Button variant="outline" className="h-12 w-12 rounded-full">
          <Settings />
        </Button>
      </div>

      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
