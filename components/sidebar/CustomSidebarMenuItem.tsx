import Link from "next/link";
import { cn } from "@/lib/utils";
import { ElementType } from "react";
import { usePathname } from "next/navigation";

import {
  useSidebar,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface ICustomSidebarMenuItemProps {
  href: string;
  icon: ElementType<{ size?: string | number; className?: string }>;
  iconSize?: number;
  iconClassName?: string;
  label: string;
}

const CustomSidebarMenuItem = ({
  href,
  icon: Icon,
  iconSize,
  iconClassName,
  label,
}: ICustomSidebarMenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem className="h-10 flex items-center">
      <SidebarMenuButton
        asChild
        className="h-full"
        onClick={() => setOpenMobile(false)}
      >
        <Link
          href={href}
          className={cn(
            "flex items-center gap-2",
            "group-data-[collapsible=icon]:justify-center",
            "peer px-2 text-muted-foreground transition-colors",
            isActive && "text-black dark:text-white"
          )}
        >
          <Icon
            size={iconSize}
            className={cn(
              "peer-hover:text-black",
              "dark:peer-hover:text-white",
              iconClassName
            )}
          />

          <span
            className={cn(
              "text-lg font-medium",
              "peer-hover:text-black dark:peer-hover:text-white",
              "group-data-[collapsible=icon]:hidden"
            )}
          >
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default CustomSidebarMenuItem;
