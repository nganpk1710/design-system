import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Figma: Design System > Inline (2519:444). Xếp ngang. Khoảng cách lấy từ token inline.
// TODO(figma): chưa có property Spread.
const inlineVariants = cva("flex flex-row", {
  variants: {
    space: {
      none: "gap-inline-none",
      xxs: "gap-inline-xxs",
      xs: "gap-inline-xs",
      sm: "gap-inline-sm",
      md: "gap-inline-md",
      lg: "gap-inline-lg",
      xl: "gap-inline-xl",
    },
    align: { start: "items-start", center: "items-center", end: "items-end" },
    shouldWrap: { true: "flex-wrap", false: "flex-nowrap" },
  },
  defaultVariants: { space: "md", align: "start", shouldWrap: false },
});

export interface InlineProps extends Omit<React.ComponentProps<"div">, "align">, VariantProps<typeof inlineVariants> {
  asChild?: boolean;
}

function Inline({ className, space, align, shouldWrap, asChild = false, ...props }: InlineProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="inline"
      data-space={space ?? "md"}
      data-align={align ?? "start"}
      data-wrap={shouldWrap ? "true" : "false"}
      className={cn(inlineVariants({ space, align, shouldWrap }), className)}
      {...props}
    />
  );
}

export { Inline, inlineVariants };
