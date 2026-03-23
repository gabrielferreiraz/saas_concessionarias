"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Car, LayoutDashboard, Package, Settings, Menu, Users, Contact } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AdminNavProps {
  storeName: string;
  logoUrl?: string;
  userRole?: string;
}

export function AdminNav({ storeName, logoUrl, userRole }: AdminNavProps) {
  const baseNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/estoque", label: "Estoque", icon: Package },
    { href: "/admin/leads", label: "Leads", icon: Contact },
  ];

  const adminNavItems = [
    { href: "/admin/usuarios", label: "Usuários", icon: Users },
    { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
  ];

  const navItems = userRole === "STORE_USER" 
    ? baseNavItems 
    : [...baseNavItems, ...adminNavItems];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const linkClass = (href: string) =>
    cn(
      "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      pathname === href || (href !== "/admin" && pathname.startsWith(href))
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

  return (
    <header
      data-admin-nav
      className="sticky top-0 z-40 border-b border-border bg-card print:hidden"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          {/* Mobile: menu (renderizado apenas no client para evitar hidratação instável) */}
          {mounted && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 lg:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    {logoUrl ? (
                      <span className="relative h-7 w-24">
                        <Image
                          src={logoUrl}
                          alt={storeName}
                          fill
                          sizes="96px"
                          className="object-contain object-left"
                        />
                      </span>
                    ) : (
                      <>
                        <Car className="size-5" />
                        {storeName}
                      </>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={linkClass(href)}
                    >
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              {logoUrl ? (
                <div className="relative h-7 w-7">
                  <Image
                    src={logoUrl}
                    alt={storeName}
                    fill
                    sizes="28px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <Car className="size-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-foreground">
                {storeName}
              </p>
              <p className="text-xs text-muted-foreground">
                Painel Administrativo
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop: nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
