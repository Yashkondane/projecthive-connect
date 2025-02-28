
import {
  Calendar,
  Home,
  List,
  Plus,
  Settings,
  Users,
  BarChart,
  Bell
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
import NotificationCenter, { Notification } from "@/components/NotificationCenter";
import { useState } from "react";
import { toast } from "sonner";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Tasks", icon: List, url: "/tasks" },
  { title: "Team", icon: Users, url: "/team" },
  { title: "Reports", icon: BarChart, url: "/reports" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

// Sample notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Task Assigned",
    message: "You've been assigned to 'Update API documentation'",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Project Deadline Approaching",
    message: "Website Redesign project is due in 2 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: "warning",
  },
  {
    id: "3",
    title: "Project Status Updated",
    message: "Mobile App Development project is now 'In Progress'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "success",
  },
];

export function AppSidebar() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    toast.success("Notification dismissed");
  };

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-4 py-2">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDismiss={handleDismiss}
            />
          </div>
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
