"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu2, IconHome, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/components/dashboard/nav-links";

interface MobileNavProps {
  userEmail?: string;
  userName?: string;
}

export function MobileNav({ userEmail, userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden border-b bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconHome size={18} />
          </div>
          <span className="text-lg font-bold">Vidriera en Casa</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t bg-background p-4 shadow-lg animate-in slide-in-from-top-2">
          <nav className="space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.matchMode === "startsWith"
                  ? pathname.startsWith(link.href)
                  : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t">
            {userName && (
              <p className="mb-1 px-3 text-sm font-medium truncate">
                {userName}
              </p>
            )}
            <p
              className={cn(
                "mb-2 px-3 text-sm text-muted-foreground truncate",
                !userName && "font-medium text-foreground"
              )}
            >
              {userEmail}
            </p>
            <LogoutButton className="w-full justify-start" />
          </div>
        </div>
      )}
    </div>
  );
}
