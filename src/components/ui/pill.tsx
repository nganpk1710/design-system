import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: hashtag section 2155:1230; component 2500:86 (Label = children, Icon slot, padding ngang = inset/lg thay cho 40: lệch 8px) (viên thuốc viền dày, bo tròn hết, chữ Vina cỡ heading-sm)
// TODO(token): viền 8–10px và icon 36px chưa có token; dùng border-8 và size-9 tạm.
const pillVariants = cva(
  "type-heading-sm inline-flex h-36 items-center justify-center gap-inline-xs rounded-graphic border-8 bg-bg-default px-inset-lg text-text-default",
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
  /** Slot Icon (Figma: Show icon + Icon). Hiện khi có nội dung. TODO(figma): chưa có asset hoa văn. */
  icon?: React.ReactNode;
}

function Pill({ className, tone, icon, children, ...props }: PillProps) {
  return (
    <span data-slot="pill" data-tone={tone ?? "primary"} className={cn(pillVariants({ tone }), className)} {...props}>
      {icon ? <span aria-hidden="true" className="size-6 shrink-0">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}

export { Pill, pillVariants };
