
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Home,
  Users,
  Calendar,
  FileText,
  BarChart,
  Settings,
  BookOpen,
  DollarSign,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const primaryNavItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Patients", href: "/patients", icon: Users, badge: "New" },
  { title: "Appointments", href: "/appointments", icon: Calendar },
  { title: "Medical Records", href: "/records", icon: FileText },
  { title: "Billing", href: "/billing", icon: DollarSign },
  { title: "Exercises", href: "/exercises", icon: BookOpen },
  { title: "Reports", href: "/reports", icon: BarChart },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");
      
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        isOpen &&
        window.innerWidth < 1024
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r",
          "transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          "pt-16 flex flex-col shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-gray-100 group relative",
                    isActive
                      ? "text-primary bg-primary/5 hover:bg-primary/10"
                      : "text-gray-700"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="ml-2 inline-flex h-5 items-center justify-center rounded-full bg-primary px-2 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={cn(
                    "ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity",
                    "text-gray-400"
                  )}
                />
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="rounded-md bg-gray-50 p-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  A
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@patienttrack.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
