import type { Meta, StoryObj } from "@storybook/react-vite";
import primitives from "../../tokens/primitives.json";
import semantic from "../../tokens/semantic.json";

type Tok = { path: string[]; $type: string; $value: string | number };
function walk(o: Record<string, any>, path: string[] = [], out: Tok[] = []): Tok[] {
  for (const [k, v] of Object.entries(o)) {
    if (k.startsWith("$") && k !== "$value") continue;
    if (v && typeof v === "object" && "$value" in v) out.push({ path: [...path, k], $type: v.$type, $value: v.$value });
    else if (v && typeof v === "object") walk(v, [...path, k], out);
  }
  return out;
}
const prim = walk(primitives as any);
const sem = walk(semantic as any);
const pv = (p: string[]) => `var(--primitive-${p.join("-")})`;
const sv = (p: string[]) => `var(--${p.join("-")})`;

const H = ({ children }: { children: string }) => (
  <h2 style={{ fontFamily: "var(--font-title)", fontSize: 32, margin: "48px 0 16px" }}>{children}</h2>
);
const Swatch = ({ name, bg, note }: { name: string; bg: string; note?: string }) => (
  <div style={{ width: 160 }}>
    <div style={{ height: 64, background: bg, border: "1px solid var(--color-border-default)" }} />
    <div style={{ fontSize: 12, marginTop: 4, wordBreak: "break-all" }}>{name}</div>
    {note && <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{note}</div>}
  </div>
);
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>{children}</div>
);

function Page() {
  const colorGroups = [...new Set(prim.filter((t) => t.path[0] === "color" && t.path.length === 3).map((t) => t.path[1]))];
  const colorsOf = (g: string) => prim.filter((t) => t.path[0] === "color" && t.path[1] === g && t.path.length === 3);
  const specials = prim.filter((t) => t.path[0] === "color" && t.path.length === 2);
  const spacing = prim.filter((t) => t.path[0] === "space");
  const radius = prim.filter((t) => t.path[0] === "radius");
  const semColors = sem.filter((t) => t.path[0] === "color");
  const roles = ["display", "heading", "body", "small", "caption", "nav", "button", "label"];
  return (
    <div style={{ padding: 48, background: "var(--color-bg-default)", color: "var(--color-text-default)", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "var(--font-title)", fontSize: 56, margin: 0 }}>Tokens Lưu Load</h1>
      <p style={{ fontSize: 16, maxWidth: 640 }}>Nguồn: Figma Variables (file ALL-IN), chụp 14/11/2026. Trang này đọc trực tiếp từ <code>tokens/*.json</code>; đối chiếu bằng mắt với Figma.</p>

      <H>Font</H>
      <div style={{ fontFamily: "var(--font-title)", fontSize: 48 }}>Vina Vịt Lộn: Lưu Load, văn hóa Việt</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 24, marginTop: 8 }}>Aeonik Regular: Cộng đồng sáng tạo chất liệu văn hóa Việt Nam</div>
      <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 24, marginTop: 8 }}>Aeonik Medium: Kết nối ngay</div>

      <H>Màu Semantic</H>
      <Grid>{semColors.map((t) => <Swatch key={t.path.join("-")} name={t.path.join("/")} bg={sv(t.path)} note={String(t.$value).replace(/[{}]|primitives\.color\./g, "")} />)}</Grid>

      <H>Màu Primitives (thang 50–950)</H>
      {colorGroups.map((g) => (
        <div key={g} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 16, marginBottom: 4 }}>{g}</div>
          <div style={{ display: "flex" }}>
            {colorsOf(g).map((t) => (
              <div key={t.path.join("-")} style={{ width: 88 }}>
                <div style={{ height: 48, background: pv(t.path), border: "1px solid var(--color-border-subtle)" }} />
                <div style={{ fontSize: 12 }}>{t.path[2]}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{String(t.$value)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Grid>{specials.map((t) => <Swatch key={t.path.join("-")} name={t.path.join("/")} bg={pv(t.path)} note={String(t.$value)} />)}</Grid>

      <H>Spacing (thang 4px)</H>
      {spacing.map((t) => (
        <div key={t.path.join("-")} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
          <div style={{ width: 120, fontSize: 12 }}>{t.path.join("/")} = {t.$value}px</div>
          <div style={{ height: 12, width: pv(t.path), background: "var(--color-bg-primary)" }} />
        </div>
      ))}

      <H>Bo góc</H>
      <Grid>{radius.map((t) => (
        <div key={t.path.join("-")}>
          <div style={{ width: 96, height: 96, background: "var(--color-bg-accent)", border: "1px solid var(--color-border-strong)", borderRadius: pv(t.path) }} />
          <div style={{ fontSize: 12 }}>{t.path.join("/")} = {t.$value}</div>
        </div>
      ))}</Grid>

      <H>Kiểu chữ (đổi theo cỡ màn hình)</H>
      {roles.map((r) => (
        <div key={r} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>.type-{r}-lg</div>
          <div className={`type-${r}-lg`}>Lưu Load — Văn hóa Việt</div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = { title: "Foundations/Tokens", component: Page, parameters: { layout: "fullscreen" } };
export default meta;
export const Tokens: StoryObj = {};
