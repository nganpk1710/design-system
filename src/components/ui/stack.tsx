import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Figma: Design System > Stack (2519:314). Xếp dọc. Khoảng cách lấy từ token stack.
// TODO(figma): chưa có property Spread.
const stackVariants = cva("flex flex-col", {
  variants: {
    space: {
      none: "gap-stack-none",
      xxs: "gap-stack-xxs",
      xs: "gap-stack-xs",
      sm: "gap-stack-sm",
      md: "gap-stack-md",
      lg: "gap-stack-lg",
      xl: "gap-stack-xl",
    },
    align: { start: "items-start", center: "items-center", end: "items-end" },
  },
  defaultVariants: { space: "md", align: "start" },
});

export interface StackProps extends React.ComponentProps<"div">, VariantProps<typeof stackVariants> {
  asChild?: boolean;
}

function Stack({ className, space, align, asChild = false, ...props }: StackProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="stack"
      data-space={space ?? "md"}
      data-align={align ?? "start"}
      className={cn(stackVariants({ space, align }), className)}
      {...props}
    />
  );
}

export { Stack, stackVariants };
