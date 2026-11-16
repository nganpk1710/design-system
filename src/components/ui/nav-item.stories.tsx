import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavItem } from "./nav-item";

const meta: Meta<typeof NavItem> = { title: "UI/NavItem", component: NavItem, args: { children: "Về chúng tôi", href: "#" } };
export default meta;
export const Chip: StoryObj<typeof NavItem> = { args: { tone: "chip" } };
export const ChipActive: StoryObj<typeof NavItem> = { args: { tone: "chip", active: true } };
export const BareOnBlue: StoryObj<typeof NavItem> = {
  args: { tone: "bare" },
  decorators: [(S) => <div style={{ background: "var(--color-bg-primary)", padding: 32 }}><S /></div>],
};
