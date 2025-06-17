import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import AccountSectionHeader from "@/components/SectionHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface IAccountImageProps {
  imageSRC: string;
}

const AccountImage = ({ imageSRC }: IAccountImageProps) => {
  const dropdownItems = [
    { id: 1, label: "Upload", action: () => {} },
    { id: 2, label: "Delete", action: () => {} },
  ];

  return (
    <div className="relative w-full my-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={imageSRC} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <AccountSectionHeader
          title="Profile image"
          description="PNG, JPEG under 15MB"
        />
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="profile image dropdown trigger"
            className="absolute right-2 top-2 h-5 outline-none"
          >
            <EllipsisVertical className="w-5 h-5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="absolute right-0 top-2">
            {dropdownItems.map(({ id, label }) => (
              <DropdownMenuItem key={id}>{label}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AccountImage;
