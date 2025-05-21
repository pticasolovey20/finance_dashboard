"use client";

import { NAVIGATION } from "@/constants/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import CustomSidebarMenuItem from "@/components/sidebar/CustomSidebarMenuItem";

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarMenu>
            {NAVIGATION.slice(0, NAVIGATION.length - 1).map(
              ({ label, href, icon }) => (
                <CustomSidebarMenuItem
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  iconSize={20}
                  iconClassName="!w-5 !h-5"
                />
              )
            )}
          </SidebarMenu>

          <SidebarSeparator className="mt-4 mb-4" />

          <SidebarMenu>
            {NAVIGATION.slice(-1).map(({ label, href, icon }) => (
              <CustomSidebarMenuItem
                key={label}
                href={href}
                icon={icon}
                label={label}
                iconSize={20}
                iconClassName="!w-5 !h-5"
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
