import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma: Homepage_1920px > USP > Brand Foundation (2502:204). Băng tiêu đề + hai vòng tròn đồng tâm.
// TODO(figma): vòng trong của Vision là 362 (0.79 vòng ngoài), hai thẻ kia 324 (0.71). Đang dùng 4/5 và 5/7 cho khớp.
const bandVariants = cva("type-heading-md flex h-24 items-center justify-between px-inset-md", {
  variants: {
    kind: {
      vision: "bg-bg-primary text-section-01-fg",
      mission: "bg-bg-accent text-text-brand",
      value: "bg-bg-red text-section-03-fg",
    },
  },
});
const outerVariants = cva("relative aspect-square w-5/7 rounded-graphic", {
  variants: { kind: { vision: "bg-brand-primary", mission: "bg-bg-red", value: "bg-bg-accent" } },
});
const innerVariants = cva("absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-graphic", {
  variants: {
    kind: {
      vision: "w-4/5 bg-brand-accent",
      mission: "w-5/7 bg-brand-primary",
      value: "w-5/7 bg-brand-primary",
    },
  },
});

export interface BrandFoundationCardProps extends Omit<React.ComponentProps<"article">, "title"> {
  kind: "vision" | "mission" | "value";
  /** Số thứ tự hiển thị, ví dụ "(01)" */
  index: string;
  title: string;
  /** Slot Graphic. Mặc định là hai vòng tròn đồng tâm (Figma). */
  graphic?: React.ReactNode;
}

function BrandFoundationCard({ kind, index, title, graphic, className, ...props }: BrandFoundationCardProps) {
  return (
    <article data-slot="brand-foundation-card" data-kind={kind} className={cn("flex flex-col", className)} {...props}>
      <div className={bandVariants({ kind })}>
        <span>{index}</span>
        <h3>{title}</h3>
      </div>
      {/* TODO(token): nền xám trong Figma hơi khác bg/surface-sunken, xem mô tả trong Figma */}
      <div className="flex aspect-640/559 items-center justify-center bg-bg-surface-sunken">
        {graphic ?? (
          <div className={outerVariants({ kind })} aria-hidden="true">
            <div className={innerVariants({ kind })} />
          </div>
        )}
      </div>
    </article>
  );
}
export { BrandFoundationCard };
