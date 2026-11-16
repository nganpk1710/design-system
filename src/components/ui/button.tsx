import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: Hero Section 2332:184, node "Button" 2332:204 (khối chữ bo 8px + nút tròn mũi tên bên phải)
const labelVariants = cva(
  "type-button-md inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-cta px-6 py-3 transition-colors duration-(--motion-hover-duration) ease-(--motion-ease) outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-state-disabled-bg disabled:text-state-disabled-fg",
  {
    variants: {
      variant: {
        // TODO(figma): chữ trong frame là #090AE0, token text/on-accent là neutral-900. Tạm dùng text/brand (xanh) cho khớp ý đồ. Chờ xác nhận.
        accent: "bg-brand-accent text-text-brand hover:bg-brand-accent-hover",
        // draft: Figma web chưa có biến thể primary cho nút. Dựng theo cặp token primary / on-primary.
        primary: "bg-brand-primary text-text-on-primary hover:bg-brand-primary-hover",
      },
    },
    defaultVariants: { variant: "accent" },
  },
);

const knobVariants = cva(
  "inline-flex size-10 shrink-0 items-center justify-center rounded-graphic transition-colors duration-(--motion-hover-duration) ease-(--motion-ease)",
  {
    variants: {
      variant: {
        accent: "bg-brand-accent text-text-brand group-hover/button:bg-brand-accent-hover",
        primary: "bg-brand-primary text-text-on-primary group-hover/button:bg-brand-primary-hover",
      },
    },
    defaultVariants: { variant: "accent" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof labelVariants> {
  /** "arrow": thêm nút tròn mũi tên bên phải như Figma. */
  icon?: "none" | "arrow";
  asChild?: boolean;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M1 6h10M6.5 1.5 11 6l-4.5 4.5" />
    </svg>
  );
}

function Button({ className, variant, icon = "none", asChild = false, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  if (icon === "none") {
    return (
      <Comp data-slot="button" data-variant={variant ?? "accent"} className={cn(labelVariants({ variant }), className)} {...props}>
        {children}
      </Comp>
    );
  }
  // Nút có mũi tên: hai khối cách nhau 2px, hover cùng lúc
  return (
    <span data-slot="button-group" className="group/button inline-flex items-center gap-0.5">
      <Comp data-slot="button" data-variant={variant ?? "accent"} className={cn(labelVariants({ variant }), className)} {...props}>
        {children}
      </Comp>
      <span data-slot="button-knob" aria-hidden="true" className={knobVariants({ variant })}>
        <ArrowIcon />
      </span>
    </span>
  );
}

export { Button, labelVariants as buttonVariants };
