import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: { children: "Kết nối ngay" },
  argTypes: { variant: { control: "inline-radio", options: ["accent", "primary"] }, showIcon: { control: "boolean" } },
};
export default meta;
type S = StoryObj<typeof Button>;
export const Accent: S = { args: { variant: "accent", showIcon: true } };
export const AccentNoIcon: S = { args: { variant: "accent", showIcon: false } };
export const PrimaryDraft: S = { args: { variant: "primary", showIcon: true } };
export const Disabled: S = { args: { disabled: true, showIcon: false } };
export const AllOnBlue: S = {
  render: () => (
    <div style={{ background: "var(--color-bg-primary)", padding: 32, display: "flex", gap: 24 }}>
      <Button>Kết nối ngay</Button>
      <Button showIcon={false}>Kết nối ngay</Button>
      <Button disabled showIcon={false}>Kết nối ngay</Button>
    </div>
  ),
};
