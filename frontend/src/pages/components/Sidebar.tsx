import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LineChart,
  MessageSquare,
  LogOut,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {Link} from "react-router-dom";
import logo from "@/assets/logo-dark.svg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BarChart2, label: "Post Insights", href: "/post-insights" },
  { icon: LineChart, label: "Engagement Trends", href: "/engagement-trend" },
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
          "fixed top-0 left-0 z-50 h-screen w-64 bg-[#18181B] transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-16" : "lg:w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            {collapsed ? (
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-sidebar-primary-foreground text-xl font-bold">
                  <img src={logo} />
                </span>
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
              className="hidden lg:flex absolute -right-5 top-7 h-6 w-6 rounded-full border bg-black p-4 text-sidebar-foreground"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:text-white hover:bg-[#27272A]",
                  item.active && "bg-gray-700 text-white"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <Link to={"/"}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:text-white",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="duration-300">Back to Landing Page</span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
