import * as React from "react";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/ui/nav-item";
import { cn } from "@/lib/utils";

export interface HeaderData {
  /** Chữ logo, ví dụ "Lưuload" (D-17 chờ chốt cách viết). */
  logo: string;
  logoHref: string;
  nav: { id: string; label: string; href: string }[];
  cta: { label: string; href: string };
}
export interface HeaderProps extends Omit<React.ComponentProps<"header">, "children"> {
  header: HeaderData;
  /** id của mục nav đang mở */
  active?: string;
  /** guest: chưa đăng nhập. authed: đã đăng nhập (draft, chỉ có ở wireframe). */
  state?: "guest" | "authed";
  /** Chỉ cho state="authed": vùng bên phải (chuông, thư, avatar) do app truyền vào. */
  account?: React.ReactNode;
}

// Figma: Hero Section 2332:184. Logo vàng trái, nav giữa (chữ trắng trên nền xanh), CTA phải.
// TODO(figma): kích thước chip logo 138x41 và bo 10 chưa có token.
function Header({ header, active, state = "guest", account, className, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      data-state={state}
      className={cn("flex items-center justify-between bg-bg-primary px-8 py-6", className)}
      {...props}
    >
      <a
        href={header.logoHref}
        className="type-heading-sm inline-flex items-center rounded-nav bg-brand-accent px-6 py-3 text-text-brand outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        {header.logo}
      </a>
      <nav aria-label="Chính" className="flex items-center gap-8">
        {header.nav.map((item) => (
          <NavItem key={item.id} href={item.href} tone="bare" active={item.id === active}>
            {item.label}
          </NavItem>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        {state === "authed" ? account : null}
        <Button asChild icon="arrow">
          <a href={header.cta.href}>{header.cta.label}</a>
        </Button>
      </div>
    </header>
  );
}
export { Header };
