import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: hashtag section 2155:1230 (viên thuốc viền dày, bo tròn hết, chữ Vina cỡ heading-sm)
// TODO(token): viền 8–10px và icon 36px chưa có token; dùng border-8 và size-9 tạm.
const pillVariants = cva(
  "type-heading-sm inline-flex h-36 items-center justify-center gap-8 rounded-graphic border-8 bg-bg-default px-10 text-text-default",
  {
    variants: {
      tone: {
        primary: "border-brand-primary",
        sky: "border-bg-sky",
        orange: "border-bg-orange",
      },
    },
    defaultVariants: { tone: "primary" },
  },
);

export interface PillProps extends Omit<React.ComponentProps<"span">, "color">, VariantProps<typeof pillVariants> {
  /** Biểu tượng trang trí hai bên (Figma: hoa văn nhỏ). TODO(figma): chưa có asset. */
  ornament?: React.ReactNode;
}

function Pill({ className, tone, ornament, children, ...props }: PillProps) {
  return (
    <span data-slot="pill" data-tone={tone ?? "primary"} className={cn(pillVariants({ tone }), className)} {...props}>
      {ornament ? <span aria-hidden="true" className="size-9 shrink-0">{ornament}</span> : null}
      <span>{children}</span>
      {ornament ? <span aria-hidden="true" className="size-9 shrink-0">{ornament}</span> : null}
    </span>
  );
}

export { Pill, pillVariants };
