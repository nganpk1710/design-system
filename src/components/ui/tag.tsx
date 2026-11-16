import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: component 2507:237; Last CTA, #creativity (2502:269) và #connection (2502:271)
const tagVariants = cva("type-nav-md inline-flex h-10 items-center justify-center gap-inline-xxs rounded-graphic px-inset-lg", {
  variants: {
    tone: {
      orange: "bg-bg-orange text-brand-accent",
      // TODO(figma): màu chữ của tag xanh lá chưa đọc được, tạm text/brand
      green: "bg-bg-green text-text-brand",
    },
  },
  defaultVariants: { tone: "orange" },
});
export interface TagProps extends React.ComponentProps<"span">, VariantProps<typeof tagVariants> {
  /** Slot Icon (Figma: Show icon + Icon). Hiện khi có nội dung. */
  icon?: React.ReactNode;
}
function Tag({ className, tone, icon, children, ...props }: TagProps) {
  return (
    <span data-slot="tag" data-tone={tone ?? "orange"} className={cn(tagVariants({ tone }), className)} {...props}>
      {icon ? <span aria-hidden="true" className="size-6 shrink-0">{icon}</span> : null}
      {children}
    </span>
  );
}
export { Tag };
