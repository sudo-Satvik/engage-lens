import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LineChart, MessageSquare, LogOut, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from "@/assets/logo-dark.svg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart2, label: "Post Insights", href: "/dashboard/post-insights" },
  { icon: LineChart, label: "Engagement Trends", href: "/dashboard/engagement-trends" },
  { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar is open on mobile
  React.useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-[#18181B] shadow-lg",
          "transition-transform duration-300 ease-in-out",
          "lg:relative lg:transform-none",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "lg:translate-x-0": true,
            "w-16": collapsed,
            "w-64": !collapsed
          }
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {collapsed ? (
              <div className="w-8 h-8 mx-auto">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <h1 className="font-bold text-xl text-white">EngageLens</h1>
            )}
            
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden text-white hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 rounded-full border bg-[#18181B] text-white hover:bg-gray-700"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300",
                  "hover:bg-gray-700 hover:text-white transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-gray-600",
                  {
                    "bg-gray-700 text-white": location.pathname === item.href,
                    "justify-center": collapsed
                  }
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-800">
            <Link to="/">
              <Button
                variant="ghost"
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={cn(
                  "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                  "flex items-center gap-3",
                  {
                    "justify-center": collapsed,
                    "justify-start": !collapsed
                  }
                )}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span>Back to Landing Page</span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;