import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Calendar,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Notes", href: "/notes", icon: FileText },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
];

export const bottomNavItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];
