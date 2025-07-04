import Image from "next/image";
import { cn } from "@/lib/utils";

interface ILogoProps {
  className?: string;
}

const Logo = ({ className }: ILogoProps) => {
  const logo = "";

  return (
    <div className={cn("w-full h-[50px] relative overflow-hidden", className)}>
      <Image src={logo} alt="logo" height={50} priority />
    </div>
  );
};

export default Logo;
