import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: { children: "Kết nối ngay" },
  argTypes: { variant: { control: "inline-radio", options: ["accent", "primary"] }, icon: { control: "inline-radio", options: ["none", "arrow"] } },
};
export default meta;
type S = StoryObj<typeof Button>;
export const Accent: S = { args: { variant: "accent", icon: "arrow" } };
export const AccentNoIcon: S = { args: { variant: "accent", icon: "none" } };
export const PrimaryDraft: S = { args: { variant: "primary", icon: "arrow" } };
export const Disabled: S = { args: { disabled: true } };
export const AllOnBlue: S = {
  render: () => (
    <div style={{ background: "var(--color-bg-primary)", padding: 32, display: "flex", gap: 24 }}>
      <Button icon="arrow">Kết nối ngay</Button>
      <Button>Kết nối ngay</Button>
      <Button disabled>Kết nối ngay</Button>
    </div>
  ),
};
