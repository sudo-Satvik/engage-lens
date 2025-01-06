import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LineChart,
  MessageSquare,
  LogOut,
  BarChart2,
  Sidebar as SidebarIcon,
} from "lucide-react";
import {Link} from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: BarChart2, label: "Post Insights", href: "/insights" },
  { icon: LineChart, label: "Engagement Trends", href: "/trends" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-16" : "lg:w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            {collapsed ? (
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground text-xl font-bold">E</span>
              </div>
            ) : (
              <h1 className="font-bold text-xl text-sidebar-foreground">
                EngageLens
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex absolute -right-3 top-7 h-6 w-6 rounded-full border bg-black p-1 text-sidebar-foreground"
            >
              {collapsed ? (
                <SidebarIcon className="h-4 w-4" />
              ) : (
                <SidebarIcon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              ✕
            </Button>
          </div>

          <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary",
                  item.active && "bg-sidebar-accent text-sidebar-primary"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="transition-all duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:text-sidebar-primary",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <span className="transition-all duration-300">Logout</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
