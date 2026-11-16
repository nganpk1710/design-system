import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandFoundationCard } from "./brand-foundation-card";
import { CommunityCard } from "./community-card";
import { Tag } from "./tag";
import { BackToTop } from "./back-to-top";

const meta: Meta = { title: "UI/Thẻ trang chủ", parameters: { layout: "padded" } };
export default meta;

export const BrandFoundation: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <BrandFoundationCard kind="vision" index="(01)" title="Tầm nhìn" />
      <BrandFoundationCard kind="mission" index="(02)" title="Sứ mệnh" />
      <BrandFoundationCard kind="value" index="(03)" title="Giá trị cốt lõi" />
    </div>
  ),
};
const art = (c: string) => <div style={{ height: "100%", background: c }} />;
export const Community: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
      <CommunityCard index="(01)" title="Nghệ thuật & Chế tác" artwork={art("var(--color-bg-primary)")} />
      <CommunityCard index="(02)" title="Đời sống & Phong vị" artwork={art("var(--color-bg-accent)")} />
      <CommunityCard index="(03)" title="Dòng chảy & Cõi thiêng" artwork={art("var(--color-bg-red)")} />
      <CommunityCard index="(04)" title="Kiến trúc & Cảnh quan" artwork={art("var(--color-bg-sky)")} />
    </div>
  ),
};
export const TagsAndBackToTop: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Tag tone="orange">#creativity</Tag>
      <Tag tone="green">#connection</Tag>
      <BackToTop label="Về đầu trang" />
    </div>
  ),
};
