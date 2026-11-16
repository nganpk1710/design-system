import * as React from "react";
import { cn } from "@/lib/utils";

// draft: Figma web chưa có thiết kế ô nhập. Dựng theo cấu trúc shadcn + token (viền default, focus = border/focus).
const field =
  "type-label-md w-full min-w-0 rounded-cta border border-border-default bg-bg-default px-3 text-text-default outline-none transition-colors placeholder:text-text-tertiary focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus disabled:pointer-events-none disabled:bg-state-disabled-bg disabled:text-state-disabled-fg aria-invalid:border-state-error-bg aria-invalid:ring-state-error-bg";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(field, "h-10", className)} {...props} />;
}
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(field, "min-h-24 py-2", className)} {...props} />;
}
export { Input, Textarea };
