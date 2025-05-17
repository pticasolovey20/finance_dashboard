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
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
// import Logo from "@/components/Logo";
import UserAvatar from "@/components/sidebar/UserAvatar";
import { logout } from "@/actions/logout";

const AppSidebar = () => {
  return (
    <Sidebar>
      {/* <SidebarHeader className="flex items-start px-4">
        <Logo />
      </SidebarHeader> */}

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-semibold">
              APPLICATION
            </SidebarGroupLabel>

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

          <SidebarSeparator className="mb-4" />

          <SidebarGroupLabel className="text-base font-semibold">
            PROFILE
          </SidebarGroupLabel>

          <SidebarGroupContent className="my-2">
            <SidebarMenu>
              {NAVIGATION.map(({ label, href, icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      {icon}
                      <span className="text-lg font-medium">Menu Item</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mb-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">
            THEME
          </SidebarGroupLabel>

          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroupContent className="flex items-center gap-4">
          <UserAvatar className="w-14 rounded-xl" />

          <form action={logout}>
            <SidebarMenuButton className="text-xl font-medium">
              Logout
            </SidebarMenuButton>
          </form>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
