import { LayoutDashboard, Settings } from "lucide-react";

export const SIDEBAR_MENU_LIST = {
  user: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings,
    },
  ],
  admin: [], // semisal ada admin
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
