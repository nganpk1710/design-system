import * as React from "react";
import { Slot } from "radix-ui";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: "Menu item hover" 2352:812; component 2500:76 (Label = children, padding ngang = inset/xs). Hover: elip vàng nở từ mép dưới.
// TODO(figma): trạng thái mặc định có chấm vàng 5px, chưa có token kích thước cho chấm.
// Hai lớp theo ngữ cảnh: "chip" (nền xám, chữ xanh, như Figma) và "bare" (chữ trắng trên nền xanh của Hero).
const navItemVariants = cva(
  "type-nav-md group/nav relative inline-flex h-8 items-center overflow-hidden px-inset-xs outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
  {
    variants: {
      tone: {
        chip: "rounded-nav bg-bg-nav-item text-text-brand",
        bare: "text-text-on-primary",
      },
    },
    defaultVariants: { tone: "chip" },
  },
);

export interface NavItemProps extends React.ComponentProps<"a"> {
  active?: boolean;
  tone?: "chip" | "bare";
  asChild?: boolean;
}

function NavItem({ className, active = false, tone = "chip", asChild = false, children, ...props }: NavItemProps) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="nav-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(navItemVariants({ tone }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-36 -translate-x-1/2 scale-y-0 rounded-full bg-brand-accent transition-transform duration-(--motion-hover-duration) ease-(--motion-ease) origin-bottom group-hover/nav:scale-y-100 group-data-active/nav:scale-y-100"
      />
      <span className={cn("relative", tone === "bare" && "group-hover/nav:text-text-brand")}>{children}</span>
    </Comp>
  );
}

export { NavItem, navItemVariants };
