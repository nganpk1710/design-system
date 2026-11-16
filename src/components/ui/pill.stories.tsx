import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pill } from "./pill";

const meta: Meta<typeof Pill> = { title: "UI/Pill (hashtag)", component: Pill, args: { children: "#sangngutoitao" } };
export default meta;
export const Primary: StoryObj<typeof Pill> = { args: { tone: "primary" } };
export const Sky: StoryObj<typeof Pill> = { args: { tone: "sky", children: "#dnavietlensong" } };
export const Orange: StoryObj<typeof Pill> = { args: { tone: "orange", children: "#khongankhongngu" } };
