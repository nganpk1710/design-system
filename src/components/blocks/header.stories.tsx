import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, type HeaderData } from "./header";

// Copy tạm theo Figma Hero 2332:184
const data: HeaderData = {
  logo: "Lưuload",
  logoHref: "/",
  nav: [
    { id: "about", label: "Về Chúng Tôi", href: "/about" },
    { id: "projects", label: "Triển Lãm", href: "/projects" },
    { id: "community", label: "Cộng Đồng", href: "/community" },
  ],
  cta: { label: "Kết Nối Ngay", href: "/contact" },
  signIn: { label: "Đăng nhập", href: "/sign-in" },
};
const meta: Meta<typeof Header> = { title: "Blocks/Header", component: Header, args: { header: data }, parameters: { layout: "fullscreen" } };
export default meta;
export const Guest: StoryObj<typeof Header> = { args: { state: "guest" } };
export const GuestActive: StoryObj<typeof Header> = { args: { state: "guest", active: "community" } };
export const AuthedDraft: StoryObj<typeof Header> = {
  args: { state: "authed", active: "community", account: <span style={{ color: "var(--color-text-on-primary)" }}>[chuông] [thư] [avatar]</span> },
};
