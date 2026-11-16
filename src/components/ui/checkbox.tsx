import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// draft: chưa có trong Figma web.
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer inline-flex size-5 shrink-0 items-center justify-center rounded-nav border border-border-strong bg-bg-default text-text-on-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary disabled:pointer-events-none disabled:border-border-default disabled:bg-state-disabled-bg",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M2 6.5 5 9.5 10 3" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
export { Checkbox };
