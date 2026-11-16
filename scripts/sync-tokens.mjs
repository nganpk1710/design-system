// Sinh src/styles/tokens.css từ tokens/*.json. KHÔNG sửa file tokens.css bằng tay.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const load = (n) => JSON.parse(readFileSync(resolve(root, "tokens", n + ".json"), "utf8"));
const P = load("primitives"), S = load("semantic"), R = load("responsive");

function walk(obj, path = [], out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$") && k !== "$value" && k !== "$modes") continue;
    if (v && typeof v === "object" && ("$value" in v || "$modes" in v)) out.push({ path: [...path, k], ...v });
    else if (v && typeof v === "object") walk(v, [...path, k], out);
  }
  return out;
}
const prims = walk(P), sems = walk(S), resps = walk(R);
const primMap = new Map(prims.map((t) => [t.path.join("."), t]));
const semMap = new Map(sems.map((t) => [t.path.join("."), t]));
const respMap = new Map(resps.map((t) => [t.path.join("."), t]));

const px = (t, v) => (t.$type === "dimension" ? (v === 0 ? "0" : v + "px") : t.$type === "fontFamily" ? `"${v}", system-ui, sans-serif` : v);
const primVar = (p) => "--primitive-" + p.join("-");
const semVar = (p) => "--" + p.join("-");
const respVar = (p) => "--responsive-" + p.join("-");

function refVar(ref) {
  const m = ref.match(/^\{(primitives|responsive|semantic)\.(.+)\}$/);
  if (!m) throw new Error("Tham chiếu lạ: " + ref);
  const p = m[2].split(".");
  if (m[1] === "primitives") { if (!primMap.has(m[2])) throw new Error("Thiếu primitive " + m[2]); return `var(${primVar(p)})`; }
  if (m[1] === "semantic") { if (!semMap.has(m[2])) throw new Error("Thiếu semantic " + m[2]); return `var(${semVar(p)})`; }
  if (!respMap.has(m[2])) throw new Error("Thiếu responsive " + m[2]); return `var(${respVar(p)})`;
}

let css = `/* TỰ SINH bởi scripts/sync-tokens.mjs từ tokens/*.json. KHÔNG sửa tay. */\n\n:root {\n  /* Primitives */\n`;
for (const t of prims) css += `  ${primVar(t.path)}: ${px(t, t.$value)};\n`;
css += `\n  /* Responsive: mặc định = Desktop */\n`;
for (const t of resps) css += `  ${respVar(t.path)}: ${refVar(t.$modes.desktop)};\n`;
css += `\n  /* Semantic (Light) */\n`;
const inTheme = (t) => t.path[0] === "color" || t.path[0] === "radius";
for (const t of sems) if (!inTheme(t)) css += `  ${semVar(t.path)}: ${refVar(t.$value)};\n`;
css += `}\n\n/* Tablet. OPEN-02a: cách nối 4 mốc breakpoint với 3 mode Figma còn chờ xác nhận (ĐỀ XUẤT) */\n@media (max-width: 1439px) {\n  :root {\n`;
for (const t of resps) css += `    ${respVar(t.path)}: ${refVar(t.$modes.tablet)};\n`;
css += `  }\n}\n\n/* Mobile */\n@media (max-width: 767px) {\n  :root {\n`;
for (const t of resps) css += `    ${respVar(t.path)}: ${refVar(t.$modes.mobile)};\n`;
css += `  }\n}\n\n`;

// Tailwind v4 theme: chỉ lộ ra token Semantic, bỏ bảng màu mặc định
css += `@theme static {\n  --color-*: initial;\n  --radius-*: initial;\n  --font-*: initial;\n  --spacing: 4px;\n`;
// Khoảng cách theo vai trò: p-inset-md, gap-stack-md, gap-inline-md (co theo thiết bị)
for (const t of resps) if (t.path[0] === "responsive" && ["inset", "stack", "inline"].includes(t.path[1])) css += `  --spacing-${t.path.slice(1).join("-")}: var(${respVar(t.path)});\n`;
for (const t of sems) {
  if (inTheme(t)) css += `  ${semVar(t.path)}: ${refVar(t.$value)};\n`;
}
css += `  --font-title: var(--type-heading-family);\n  --font-body: var(--type-body-family);\n`;
css += `  --color-transparent: var(${primVar(["color", "transparent"])});\n`;
css += `}\n\n`;

// Lớp chữ theo vai trò: .type-display, .type-heading-lg ...
const roles = new Map();
for (const t of sems) if (t.path[0] === "type") {
  const [, role, a, b] = t.path;
  roles.set(role, roles.get(role) || new Set()); roles.get(role).add(a + (b ? "/" + b : ""));
}
const has = (n) => sems.some((t) => t.path.join("-") === n);
const sizeVariants = ["lg", "md", "sm"];
css += `/* Lớp chữ theo vai trò (từ token type/*) */\n`;
for (const role of roles.keys()) {
  for (const v of sizeVariants) {
    if (!has(`type-${role}-${v}-size`)) continue;
    const cls = role === "display" || role === "heading" || role === "body" || role === "small" || role === "caption" || role === "nav" || role === "button" || role === "label" ? `.type-${role}-${v}` : null;
    if (!cls) continue;
    css += `${cls} {\n  font-family: var(--type-${role}-family);\n`;
    if (has(`type-${role}-weight`)) css += `  font-weight: var(--type-${role}-weight);\n`;
    css += `  font-size: var(--type-${role}-${v}-size);\n  line-height: var(--type-${role}-${v}-line-height);\n`;
    if (has(`type-${role}-letter-spacing`)) css += `  letter-spacing: var(--type-${role}-letter-spacing);\n`;
    css += `}\n`;
  }
}

const out = resolve(root, "src/styles/tokens.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, css);
console.log(`tokens.css: ${prims.length} primitives, ${resps.length} responsive, ${sems.length} semantic`);
