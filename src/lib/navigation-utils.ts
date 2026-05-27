import { bottomNavItems, mainNavItems } from "@/config/navigation";

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getPageTitle(pathname: string): string {
  const items = [...mainNavItems, ...bottomNavItems];
  const match = items.find((item) => isNavActive(pathname, item.href));
  return match?.label ?? "LifeOS";
}
