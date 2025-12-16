"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { IconMenu2, IconUser, IconCoins, IconX } from "@tabler/icons-react";
import { LogoutButton } from "@/components/auth/logout-button";

interface NavigationProps {
  user?: {
    email: string;
  } | null;
  credits?: {
    total: number;
  } | null;
}

export function Navigation({ user, credits }: NavigationProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Panel Principal" },
    { href: "/dashboard/historial", label: "Mis Análisis" },
    // { href: "/planes", label: "Mis Planes" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Vidriera en Casa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Credit Balance (Desktop) */}
            {user && credits && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                <IconCoins size={18} className="text-muted-foreground" />
                <span className="text-sm font-semibold">{credits.total}</span>
                <span className="text-xs text-muted-foreground">créditos</span>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu (Desktop) */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden md:flex"
                    aria-label="Menú de usuario"
                  >
                    <IconUser size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton className="w-full cursor-pointer" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline">Iniciar sesión</Button>
                </Link>
                <Link href="/registro">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              {user ? (
                <>
                  {/* Credit Balance (Mobile) */}
                  {credits && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
                      <IconCoins size={18} className="text-muted-foreground" />
                      <span className="text-sm font-semibold">
                        {credits.total}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        créditos
                      </span>
                    </div>
                  )}

                  {/* Navigation Links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${
                        isActive(link.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* User Info */}
                  <div className="px-3 py-2 border-t">
                    <p className="text-sm font-medium mb-2">{user.email}</p>
                    <LogoutButton className="w-full" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link
                    href="/registro"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full">Registrarse</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
