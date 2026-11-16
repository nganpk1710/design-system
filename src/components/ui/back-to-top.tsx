import * as React from "react";
import { cn } from "@/lib/utils";

// Figma: Footer > Back To Top button (2502:256). Hover/focus: chưa có thiết kế.
export interface BackToTopProps extends React.ComponentProps<"button"> {
  /** Nhãn đọc cho người dùng trình đọc màn hình */
  label: string;
}
function BackToTop({ label, className, ...props }: BackToTopProps) {
  return (
    <button
      type="button"
      aria-label={label}
      data-slot="back-to-top"
      className={cn(
        "inline-flex size-24 items-center justify-center rounded-graphic bg-brand-accent text-text-brand outline-none transition-colors duration-(--motion-hover-duration) ease-(--motion-ease) hover:bg-brand-accent-hover focus-visible:ring-2 focus-visible:ring-border-focus",
        className,
      )}
      {...props}
    >
      <svg viewBox="0 0 30 30" className="size-8" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M15 28V2M3 14 15 2l12 12" />
      </svg>
    </button>
  );
}
export { BackToTop };
