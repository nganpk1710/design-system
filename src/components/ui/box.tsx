import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Figma: Design System > Box (2526:163). Box CHỈ quản lý padding, lấy từ token inset (co theo thiết bị).
// Không có nền, màu, viền: những thứ đó thuộc về component bên trong.
export type InsetSize = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl";

const boxVariants = cva("", {
  variants: {
    paddingY: {
      none: "py-inset-none",
      xxs: "py-inset-xxs",
      xs: "py-inset-xs",
      sm: "py-inset-sm",
      md: "py-inset-md",
      lg: "py-inset-lg",
      xl: "py-inset-xl",
    },
    paddingX: {
      none: "px-inset-none",
      xxs: "px-inset-xxs",
      xs: "px-inset-xs",
      sm: "px-inset-sm",
      md: "px-inset-md",
      lg: "px-inset-lg",
      xl: "px-inset-xl",
    },
  },
});

export interface BoxProps extends React.ComponentProps<"div"> {
  /** Padding đều bốn phía. Bằng Padding Dọc = Padding Ngang trong Figma. */
  padding?: InsetSize;
  /** Padding Dọc (trên, dưới). Ưu tiên hơn `padding`. */
  paddingY?: InsetSize;
  /** Padding Ngang (trái, phải). Ưu tiên hơn `padding`. */
  paddingX?: InsetSize;
  asChild?: boolean;
}

function Box({ className, padding, paddingY, paddingX, asChild = false, ...props }: BoxProps) {
  const Comp = asChild ? Slot.Root : "div";
  const y = paddingY ?? padding ?? "md";
  const x = paddingX ?? padding ?? "md";
  return (
    <Comp
      data-slot="box"
      data-padding-y={y}
      data-padding-x={x}
      className={cn(boxVariants({ paddingY: y, paddingX: x }), className)}
      {...props}
    />
  );
}

export { Box, boxVariants };
