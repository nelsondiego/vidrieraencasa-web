"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconHome, IconUser } from "@tabler/icons-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS } from "@/components/dashboard/nav-links";

interface SidebarProps {
  userEmail?: string;
  userName?: string;
}

export function Sidebar({ userEmail, userName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex h-screen sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
            <IconHome size={18} className="text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Vidriera en Casa</span>
        </Link>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex-1 space-y-1 p-4">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.matchMode === "startsWith"
              ? pathname.startsWith(link.href)
              : pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <link.icon
                size={18}
                className={
                  isActive ? "text-primary" : "text-sidebar-foreground/50"
                }
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-4 ">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-sidebar-accent-foreground">
            <IconUser size={18} />
          </div>
          <div className="flex-1 overflow-hidden">
            {userName && (
              <p className="truncate text-sm font-medium">{userName}</p>
            )}
            <p
              className={cn(
                "truncate text-xs text-muted-foreground",
                !userName && "text-sm font-medium text-foreground"
              )}
            >
              {userEmail}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <LogoutButton className="w-full justify-start" />
        </div>
      </div>
    </aside>
  );
}
