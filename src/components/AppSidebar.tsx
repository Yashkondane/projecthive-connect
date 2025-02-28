
import {
  Calendar,
  Home,
  List,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Tasks", icon: List, url: "/tasks" },
  { title: "Team", icon: Users, url: "/team" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="button-hover">
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <button className="w-full rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 inline-block h-4 w-4" />
              New Project
            </button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
