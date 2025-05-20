import { NAVIGATION } from "@/constants/navigation";

import Link from "next/link";
import {
  Sidebar,
  // SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
// import Logo from "@/components/Logo";
import UserAvatar from "@/components/sidebar/UserAvatar";

const AppSidebar = () => {
  return (
    <Sidebar>
      {/* <SidebarHeader className="flex items-start px-4">
        <Logo />
      </SidebarHeader> */}

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroup className="p-0">
            <SidebarGroupContent className="my-2">
              <SidebarMenu>
                {NAVIGATION.map(({ label, href, icon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild>
                      <Link href={href}>
                        {icon}
                        <span className="text-lg font-medium">{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="mt-4 mb-4" />

          <SidebarGroupContent className="my-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account">
                    <Settings />
                    <span className="text-lg font-medium">Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserAvatar className="w-14 rounded-xl" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
