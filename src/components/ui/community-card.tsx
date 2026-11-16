import * as React from "react";
import { cn } from "@/lib/utils";

// Figma: Homepage_1920px > Community (2502:375). Thẻ nhóm chất liệu văn hóa.
// Hình đồ họa là slot (ReactNode): chờ Brand Graphic Element (OPEN-06).
// TODO(token): bo góc Figma là 10, token gần nhất radius/nav (8).
export interface CommunityCardProps extends Omit<React.ComponentProps<"article">, "title"> {
  /** Ví dụ "(01)" */
  index: string;
  title: string;
  artwork: React.ReactNode;
  href?: string;
}

function CommunityCard({ index, title, artwork, href, className, ...props }: CommunityCardProps) {
  const body = (
    <>
      <div data-slot="community-card-artwork" className="aspect-441/388 w-full overflow-hidden">{artwork}</div>
      <div className="flex flex-col items-center gap-6 px-6 py-8 text-center text-text-default">
        <span className="type-heading-sm">{index}</span>
        <h3 className="type-heading-md">{title}</h3>
      </div>
    </>
  );
  return (
    <article data-slot="community-card" className={cn("flex flex-col overflow-hidden rounded-nav bg-bg-default", className)} {...props}>
      {href ? (
        <a href={href} className="flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-border-focus">{body}</a>
      ) : body}
    </article>
  );
}
export { CommunityCard };
