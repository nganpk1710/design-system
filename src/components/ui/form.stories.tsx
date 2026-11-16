import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Textarea } from "./input";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./dialog";

const meta: Meta = { title: "UI/Form và Modal (draft)", parameters: { layout: "padded" } };
export default meta;

export const Form: StoryObj = {
  render: () => (
    <form style={{ display: "grid", gap: 16, maxWidth: 400 }}>
      <div style={{ display: "grid", gap: 8 }}><Label htmlFor="e">Email</Label><Input id="e" type="email" placeholder="ban@vidu.com" /></div>
      <div style={{ display: "grid", gap: 8 }}><Label htmlFor="m">Lời nhắn</Label><Textarea id="m" placeholder="Kể mình nghe..." /></div>
      <div style={{ display: "grid", gap: 8 }}><Label htmlFor="x">Có lỗi</Label><Input id="x" aria-invalid defaultValue="sai" /></div>
      <div style={{ display: "grid", gap: 8 }}><Label htmlFor="d">Bị khóa</Label><Input id="d" disabled defaultValue="khóa" /></div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Checkbox id="c" defaultChecked /><Label htmlFor="c">Nhận bản tin</Label></div>
      <Button type="submit" showIcon={false}>Gửi</Button>
    </form>
  ),
};

export const Modal: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button showIcon={false}>Mở hộp thoại</Button></DialogTrigger>
      <DialogContent closeLabel="Đóng">
        <DialogHeader>
          <DialogTitle>Kết nối với Lưu Load</DialogTitle>
          <DialogDescription>Nội dung tạm, TODO(content).</DialogDescription>
        </DialogHeader>
        <DialogFooter><DialogClose asChild><Button variant="primary" showIcon={false}>Xong</Button></DialogClose></DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
