import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Figma: Design System > Box (2519:169). Hộp có padding + nền. Padding lấy từ token inset (co theo thiết bị).
// TODO(figma): chưa có property Radius.
const boxVariants = cva("", {
  variants: {
    padding: {
      none: "p-inset-none",
      xxs: "p-inset-xxs",
      xs: "p-inset-xs",
      sm: "p-inset-sm",
      md: "p-inset-md",
      lg: "p-inset-lg",
      xl: "p-inset-xl",
    },
    background: {
      none: "",
      surface: "bg-bg-surface text-text-default",
      primary: "bg-bg-primary text-text-on-primary",
      accent: "bg-bg-accent text-text-on-accent",
      red: "bg-bg-red text-text-on-red",
    },
  },
  defaultVariants: { padding: "md", background: "none" },
});

export interface BoxProps extends React.ComponentProps<"div">, VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

function Box({ className, padding, background, asChild = false, ...props }: BoxProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="box"
      data-padding={padding ?? "md"}
      data-background={background ?? "none"}
      className={cn(boxVariants({ padding, background }), className)}
      {...props}
    />
  );
}

export { Box, boxVariants };
