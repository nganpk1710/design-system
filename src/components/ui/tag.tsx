import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: Last CTA, #creativity (2502:269) và #connection (2502:271)
const tagVariants = cva("type-nav-md inline-flex h-10 items-center justify-center rounded-graphic px-8", {
  variants: {
    tone: {
      orange: "bg-bg-orange text-brand-accent",
      // TODO(figma): màu chữ của tag xanh lá chưa đọc được, tạm text/brand
      green: "bg-bg-green text-text-brand",
    },
  },
  defaultVariants: { tone: "orange" },
});
export interface TagProps extends React.ComponentProps<"span">, VariantProps<typeof tagVariants> {}
function Tag({ className, tone, ...props }: TagProps) {
  return <span data-slot="tag" data-tone={tone ?? "orange"} className={cn(tagVariants({ tone }), className)} {...props} />;
}
export { Tag };
