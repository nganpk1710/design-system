// Chặn màu, cỡ, số tuỳ ý trong src/components và src/motion. Chạy: npm run check:hardcode
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["src/components", "src/motion"].map((d) => join(root, d)).filter(existsSync);
const exts = [".ts", ".tsx", ".css"];
const skip = (f) => /\.stories\.tsx$/.test(f) || /tokens\.css$/.test(f);

const rules = [
  [/#[0-9a-fA-F]{3,8}\b/, "màu hex viết cứng"],
  [/\b(?:rgb|rgba|hsl|hsla|oklch)\(/, "màu viết cứng (rgb/hsl/oklch)"],
  [/\b(?:bg|text|border|ring|fill|stroke|outline|p|px|py|pt|pb|pl|pr|m|mx|my|w|h|min-w|min-h|max-w|max-h|gap|top|left|right|bottom|rounded|leading|tracking)-\[[^\]]+\]/, "giá trị tuỳ ý của Tailwind"],
  [/\bshadow(?:-[a-z0-9]+)?\b/, "shadow bị cấm"],
  [/\b(?:bg|from|via|to)-(?:gradient|linear|radial|conic)[a-z-]*/, "gradient bị cấm"],
  [/\bbackdrop-blur\b|backdrop-filter/, "glassmorphism bị cấm"],
  [/\b(?:bg|text|border|ring)-(?:slate|gray|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/, "màu thô của Tailwind"],
  [/\b\d+(?:\.\d+)?px\b/, "số px viết cứng (dùng token)"],
];

function* files(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (exts.some((e) => p.endsWith(e)) && !skip(p)) yield p;
  }
}
let bad = 0, n = 0;
for (const d of dirs) for (const f of files(d)) {
  n++;
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (line.includes("check-hardcode-ignore")) return;
    for (const [re, why] of rules) if (re.test(line)) { console.log(`${relative(root, f)}:${i + 1}  ${why}\n    ${line.trim()}`); bad++; }
  });
}
console.log(bad ? `\n✗ ${bad} lỗi trong ${n} file` : `✓ sạch (${n} file đã quét)`);
process.exit(bad ? 1 : 0);
