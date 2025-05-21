import Link from "next/link";
import { cn } from "@/lib/utils";
import { ElementType } from "react";
import { usePathname } from "next/navigation";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

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

  return (
    <SidebarMenuItem className="h-10 flex items-center">
      <SidebarMenuButton asChild isActive={isActive} className="h-full">
        <Link
          href={href}
          className={cn(
            "flex items-center gap-2",
            "group-data-[collapsible=icon]:justify-center",
            "peer px-2 text-muted-foreground transition-colors"
          )}
        >
          <Icon
            size={iconSize}
            className={cn("peer-hover:text-primary", iconClassName)}
          />

          <span
            className={cn(
              "text-lg font-medium",
              "peer-hover:text-primary",
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
