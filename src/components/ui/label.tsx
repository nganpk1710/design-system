import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("type-label-md flex items-center gap-2 select-none text-text-default peer-disabled:text-text-disabled", className)}
      {...props}
    />
  );
}
export { Label };
