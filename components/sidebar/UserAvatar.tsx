import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface IUserAvatarProps {
  className?: string;
}

const UserAvatar = ({ className }: IUserAvatarProps) => {
  return (
    <Avatar className={cn("w-full h-full", className)}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
