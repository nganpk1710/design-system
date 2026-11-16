# Lưu Load Design System: Hướng dẫn cho AI Agent

> **Đọc file này đầu tiên.** Trách nhiệm: luật chơi, nguồn nào thắng khi xung đột, link Figma, cách gọi component, quy trình làm việc. Lộ trình và câu trả lời của chủ dự án nằm ở `PLAN.md`.

Người dùng là **designer, không phải lập trình viên**. Khi giải thích hoặc báo cáo, dùng ngôn ngữ đời thường, nêu ví dụ, tránh thuật ngữ trần trụi.

Trạng thái repo: **Đợt 0 xong phần nền** (14/11/2026). Đã có: `tokens/*.json`, `npm run tokens:sync`, `npm run check:hardcode`, `npm run build`, `npm run storybook` (trang Foundations/Tokens). Đã có component (xem `components.manifest.json`, trường `implemented`). Trang Figma `Design System` (2432:186) là wireframe cũ: chỉ lấy cấu trúc, không lấy phong cách. Chưa tải được component từ `ui.shadcn.com` (bị chặn), nên viết tay theo mẫu shadcn. `src/styles/tokens.css` tự sinh, không commit.

## 1. Đây là gì

Thư viện component React của **Lưu Load**, cộng đồng sáng tạo chuyên về văn hóa Việt Nam, ra mắt 28/12/2026. Mục tiêu: để AI dựng UI đúng thiết kế Figma mà không phải đoán.

- Repo này: https://github.com/nganpk1710/design-system
- Repo web HTML thuần (đang chạy, quy tắc riêng, **không sửa từ đây**): https://github.com/nganpk1710/luuload
- Quan hệ: Figma là gốc. Token đi một chiều Figma → repo này → (web `luuload` lấy theo khi cần). Chi tiết `PLAN.md` mục 2.2.

## 2. Đọc theo nhiệm vụ

| Nhiệm vụ | Đọc theo thứ tự |
|---|---|
| Sửa hoặc thêm token (màu, font, khoảng cách) | Mục 6 → `tokens/*.json` → Figma Variables |
| Dựng hoặc sửa một component | Mục 8 và 9 → `components.manifest.json` → Figma frame → file component cùng thư mục |
| Dựng một màn hình từ component | Mục 8 → manifest (chỉ dùng `stable`) |
| Chuyển động | Mục 9 |
| Chữ, nhãn, microcopy | Mục 10 |
| Quyết định đang chờ | `PLAN.md` mục 3 và 5 |

Không đọc toàn bộ tài liệu mỗi lần.

## 3. Thứ tự ưu tiên khi xung đột

1. **Quyết định `CHỐT`** trong `PLAN.md` mục 3. Thắng mọi thứ.
2. **Figma** cho bố cục, tỉ lệ, khoảng cách, thứ tự thị giác.
3. **Token trong `tokens/*.json`**, sinh ra từ Figma Variables.
4. **Code hiện có và các file `.md`.** Mâu thuẫn với 1–3 thì file đó đã cũ, báo lại, không tự sửa.
5. **Phỏng đoán của AI: không được dùng.**

Quy tắc phụ:

- Figma khác token: liệt kê chênh lệch, **chờ chủ dự án xác nhận**, không tự sửa.
- Quyết định `CHỜ` hoặc `OPEN-xx` (`PLAN.md` mục 5) không được build như đã chốt. Dùng giá trị tạm, ghi rõ `pending`.
- Chỉ **một** nguồn phong cách: Figma web (xanh `#0800B2`, vàng, đỏ). Không dùng bảng màu kem / xanh sương của Brand Guideline, và không dựa vào bản wireframe HTML do Claude dựng trước đây.

## 4. Quy tắc cứng

1. **Không hardcode** màu, cỡ chữ, khoảng cách, bo góc, thời lượng, chữ trong component. Dùng token, biến thể, hoặc nội dung truyền qua props.
2. **Không thêm** màu, font, khoảng cách ngoài token. Muốn thêm token: Figma Variables trước, rồi `tokens/`, rồi mới code.
3. **Không** shadow, gradient, glassmorphism. Chiều sâu đến từ chồng khối màu phẳng.
4. **Không dùng giá trị tuỳ ý của Tailwind** như `w-[137px]`, `bg-[#fff]`, `text-[13px]`. Chỉ class gắn với token.
5. **Không đổi tên hay thay nội dung** biến thể đã có mà không báo.
6. **Không tự tạo biến thể** mà Figma không có.
7. **Không đoán** số liệu hay chữ. Thiếu thì ghi `TODO(figma)` hoặc `TODO(content)`.
8. Frame Figma trống thì breakpoint đó **không được gọi là "đã đối chiếu"**.
9. **Không trộn Radix và Base UI.** Dự án dùng Radix (`DS-12`).
10. Chỉ dùng **chế độ sáng** (`DS-08`).
11. Đổi code thì cập nhật manifest, story và docs **trong cùng lượt**.
12. Chữ trên nền phải đạt tương phản WCAG AA. Dùng cặp `on-*` của token.

## 5. Link Figma

File: **ALL-IN**, `fileKey` = `I71sGioA9j1HHrIwpe2e5V`

URL mẫu: `https://www.figma.com/design/I71sGioA9j1HHrIwpe2e5V/ALL-IN?node-id=<ID-dùng-dấu-gạch>` (ví dụ `2332:184` thành `2332-184`).

| Trang Figma | Node | Dùng cho |
|---|---|---|
| web | `1407:96` | Thiết kế website, trang tham chiếu chính |
| Branding | `1906:2` | Slide thương hiệu, logo, graphic |
| Sitemap + Flow + Wireframe | `2432:186` | Cấu trúc trang và luồng |
| Research | `216:2` | Nghiên cứu, persona, journey (không dùng để dựng UI) |

Frame đáng chú ý trên trang `web`:

| Frame | Node | Ghi chú |
|---|---|---|
| Hero Section (1920) | `2332:184` | Hero, nav, nút CTA |
| Community (1920) | `2121:355` | Accordion 4 nhóm màu, tiêu đề display |
| Hero các bản 1440 | `2002:218`, `2002:228`, `2002:245`, `2002:275`, `2002:290`, `2046:24` | Biến thể 1440 |
| Tác phẩm nổi bật (1440) | `2046:224` | Gallery project |
| Community (1440) | `2049:419` | |

Các node mà repo `luuload` đã dùng (đối chiếu chéo): hero `2363:2492`, features projects `2221:375` và `2295:339`, USP `2155:1423`, hashtag `2155:1230`, community `2155:1323`, last CTA `2155:1472`, footer `2155:1493`, nav chip hover `2352:812`, preloader `2357:1661`.

**Gate Figma trước khi dựng bất kỳ component nào:** gọi `get_design_context` và `get_screenshot` ở 1920 và 1440; thêm `get_variable_defs` nếu nghi token đổi. Phải gọi `create_session` với `fileKey` trước khi dùng các công cụ Figma khác.

## 6. Token (nguồn: Figma Variables, 3 bộ)

Bản chụp ngày 14/11/2026. Giá trị thật nằm trong `tokens/*.json`. Nếu hai bên khác nhau, Figma Variables thắng và báo chênh lệch.

**Primitives** (màu theo thang 50–950): `blue`, `yellow`, `red`, `sky`, `mint`, `green`, `orange`, `neutral`. Màu lõi: blue 500 `#0800B2`, yellow 500 `#FFF11C`, red 500 `#BA1616`, sky 500 `#32BBFF`, mint 500 `#4BFFDF`, green 500 `#24FC7D`, orange 500 `#FF6932`, neutral 50 `#FDFDFD` đến 950 `#0A0A0C`.
Spacing: **số thô theo px, bội số của 8, từ `space/0` đến `space/256`** (33 bước: `space/8` = 8px, `space/24` = 24px). Không còn 4, 12, 20 (đã bỏ ngày 16/11/2026). Radius: `none` 0, `sm` 8, `md` 12, `lg` 24, `full` 999. Font: tiêu đề **Vina Vịt Lộn**, nội dung **Aeonik**. Cỡ chữ: 12, 16, 18, 20, 24, 28, 32, 40, 48, 56, 96, 140. Letter-spacing: `tight` −2.8, `wide` 0.64.

**Semantic** (chế độ Light). Luôn dùng tên vai trò, không dùng màu thô:

| Nhóm | Token |
|---|---|
| Nền | `bg/primary`, `bg/accent`, `bg/red`, `bg/mint`, `bg/sky`, `bg/green`, `bg/orange`, `bg/default`, `bg/surface`, `bg/surface-raised`, `bg/surface-sunken`, `bg/ink`, `bg/nav-item`, `bg/overlay` |
| Chữ | `text/default`, `text/secondary`, `text/tertiary`, `text/disabled`, `text/brand`, `text/link`, `text/link-hover`, `text/on-primary`, `text/on-accent`, `text/on-red`, `text/on-ink` |
| Viền | `border/subtle`, `border/default`, `border/strong`, `border/focus` |
| Thương hiệu | `brand/primary`, `brand/primary-hover`, `brand/accent`, `brand/accent-hover`, `brand/red` |
| Section luân phiên | `section/01` (nền xanh, chữ vàng), `section/02` (nền vàng, chữ xanh), `section/03` (nền đỏ, chữ vàng) |
| Trạng thái | `state/success`, `state/warning`, `state/error`, `state/info`, `state/disabled`, mỗi cái có `bg` và `fg` |
| Hình | `radius/card` (0), `radius/cta` (8), `radius/nav` (8), `radius/graphic` (full) |
| Chữ (kiểu) | `type/display`, `type/heading/{lg,md,sm}`, `type/body/{lg,md,sm}`, `type/small`, `type/caption`, `type/nav`, `type/button`, `type/label` |

**Khoảng cách theo vai trò** (học Atlassian Forge, 3 tầng): Primitives `space/N` → Semantic `inset/*`, `stack/*`, `inline/*` (size `none, xxs, xs, sm, md, lg, xl` = 0, 8, 16, 24, 32, 48, 64) → Responsive `responsive/inset|stack|inline/*` (3 mode, trỏ về Semantic). Component `Box` dùng `inset` (padding), `Stack` dùng `stack` (khoảng cách dọc), `Inline` dùng `inline` (khoảng cách ngang). Trong code: `p-inset-md`, `gap-stack-md`, `gap-inline-md`. Tablet: `xl` lùi về `lg`. Mobile: `xs..xl` lùi một bậc. Không dùng số px trực tiếp cho khoảng cách.

**Responsive** (3 mode: Desktop, Tablet, Mobile): `layout/margin`, `layout/gutter`, `layout/section-padding`, `layout/section-gap`, `layout/element-gap`, và `responsive/type/{display, heading-lg, heading-md, heading-sm, body}` (cỡ và line-height).

**Đã chốt (14/11/2026):**

- Nút CTA và nav chip bo **8px** (`radius/cta`, `radius/nav`). **Không dùng pill** (`DS-16`).
- Breakpoint: **1920, 1440, 768, 390 px** (`DS-17`). Frame Figma ở 1920 và 1440 là mốc đối chiếu chính.
- Cỡ chữ nhỏ nhất: **12px** (`font/size/12`) (`DS-18`).

Chỗ chưa khớp (đừng tự giải quyết): `OPEN-02a` cách nối 4 mốc breakpoint với 3 mode Figma (Desktop, Tablet, Mobile), `OPEN-03` màu SVG khác token, `OPEN-07` alpha của overlay. Xem `PLAN.md` mục 5.

Lưu ý: repo `luuload` đang ghi khác ở hai điểm (pill ở D-03, cỡ chữ tối thiểu 14px ở D-05). Ở thư viện này, quyết định bên trên thắng. Không sửa `luuload` từ đây.

## 7. Cấu trúc thư mục (đích, sẽ có sau Đợt 0)

```
design-system/
├── CLAUDE.md, INSTRUCTION.md, PLAN.md, README.md
├── components.manifest.json     # danh sách component dạng máy đọc
├── tokens/                      # primitives.json, semantic.json, responsive.json
├── src/
│   ├── styles/                  # tokens.css (tự sinh, không sửa tay)
│   ├── components/
│   │   ├── ui/                  # viên gạch: button, pill, input, checkbox…
│   │   ├── blocks/              # bức tường: header, footer, project-card, feed-post…
│   │   └── sections/            # căn phòng (ngoài phạm vi Đợt 1–3)
│   ├── motion/                  # gói chuyển động
│   ├── lib/                     # tiện ích dùng chung (hàm cn…)
│   └── index.ts
├── .storybook/
├── fonts/
└── scripts/                     # sync-tokens, check-hardcode
```

Quy ước đặt tên (theo kiểu shadcn): file `kebab-case.tsx`, component `PascalCase`, mỗi component cạnh nhau: `button.tsx`, `button.stories.tsx`. Tầng `ui / blocks / sections` trùng cách đặt tên của repo `luuload` để dễ đối chiếu.

## 8. Cách gọi component

> Dưới đây là **API đề xuất** (`ĐỀ XUẤT`). Chưa có code. Khi dựng component, bám theo mẫu này, rồi cập nhật manifest cho khớp.

```tsx
<Button variant="accent" size="lg" icon="arrow">Kết nối ngay</Button>
<NavItem href="/gallery" active>Các dự án</NavItem>
<Header state="guest" active="gallery" />
<Header state="authed" active="community" />
<ProjectCard project={project} />
<FeedPost post={post} onLike={…} />
<CommunityAccordion groups={groups} />
```

Quy tắc gọi:

- **Biến thể chỉ chọn từ danh sách** (TypeScript chặn tên sai). Không thêm `className` để đổi màu hay cỡ.
- **Chữ đi qua props hoặc `children`.** Không viết cứng tiếng Việt trong thân component.
- Khối lớn (block) nhận **một object dữ liệu** có kiểu rõ (ví dụ `project`, `post`), không nhận chục props rời.
- Component tương tác dùng nền Radix qua shadcn/ui. Bật `asChild` khi cần đổi thẻ, không tự bọc thêm.
- Mọi component có `data-slot` để dễ chọn và kiểm thử, theo mẫu shadcn.

### components.manifest.json

Mỗi component có một mục. Ví dụ:

```json
{
  "name": "Button",
  "layer": "ui",
  "status": "stable",
  "figma": ["2332:184"],
  "variants": { "variant": ["primary", "accent"], "size": ["md", "lg"], "icon": ["none", "arrow"] },
  "states": ["default", "hover", "focus", "disabled"],
  "story": "src/components/ui/button.stories.tsx"
}
```

**Trạng thái:**

| Nhãn | Nghĩa | AI được làm gì |
|---|---|---|
| `stable` | Figma đã chốt | Dùng bình thường |
| `draft` | Có thể còn đổi | Dùng được nhưng **báo chủ dự án trước** và ghi chú trong kết quả |
| `planned` | Chưa làm | **Không** tự dựng. Báo thiếu |

## 9. Quy trình dựng một component

| Bước | Việc | Đầu ra |
|---|---|---|
| 1 | Đọc mục 3, 4, 6 và mục của component trong manifest | Nắm luật |
| 2 | **Gate Figma** (mục 5): ngữ cảnh thiết kế và ảnh ở 1920 và 1440 | Thông số, ảnh đối chiếu |
| 3 | **Báo khoảng trống**: token thiếu, biến thể thiếu, asset thiếu, copy thiếu, quyết định `CHỜ` | Danh sách để chủ dự án quyết |
| 4 | **Dừng** nếu có quyết định chặn bố cục hoặc thiếu asset | Không code phần bị chặn |
| 5 | Dựng bằng token. Bắt đầu từ shadcn/ui rồi **đổi style** theo Lưu Load (không giữ bóng, bo, màu xám mặc định) | File component |
| 6 | Viết story đủ biến thể và trạng thái | `*.stories.tsx` |
| 7 | Kiểm: hardcode (sẽ có `scripts/check-hardcode`), bàn phím, focus, tương phản, đối chiếu Figma | Báo cáo chênh lệch cụ thể |
| 8 | Cập nhật manifest, docs, `PLAN.md` mục 9 | Docs khớp code |

**Chuyển động.** Gói `src/motion/` chia hai tầng: **cơ bản** (reveal, hover, transition) và **nâng cao** (Lenis, GSAP ScrollTrigger, chuyển trang, hero card 3D, preloader, gallery xoắn ốc). Tầng nâng cao `planned` vì Brand Graphic Element chưa chốt. Thời lượng và easing lấy từ một file cấu hình, không viết số trong component. Phải tôn trọng `prefers-reduced-motion`. Giấy phép GSAP chờ kiểm tra (`DS-14`): chưa thêm vào dự án cho tới khi chủ dự án xác nhận.

## 10. Nội dung và giọng văn

- **Giao diện tiếng Việt, tên code tiếng Anh.**
- Tông: **Playful, Open-minded, Connected**. Xưng "mình, bạn" trong cộng đồng. Ngắn, ấm, nói rõ việc cần làm tiếp theo. Không giọng hành chính ("hệ thống đã ghi nhận yêu cầu của quý khách").
- Từ vựng chuẩn: **Creatives**, **Project**, **chất liệu văn hóa**, **Challenge theo mùa**, **Brief**, **Cộng đồng**. Tránh: người sáng tạo, tư liệu, cuộc thi, hội nhóm.
- Bốn nhóm chất liệu: Nghệ thuật & Chế tác · Đời sống & Phong vị · Dòng chảy & Cõi thiêng · Di sản kiến trúc & Cảnh quan. Slug: `nghe-thuat-che-tac`, `doi-song-phong-vi`, `dong-chay-coi-thieng`, `di-san-kien-truc-canh-quan`.
- Nhãn CTA chính đã chốt: **"Kết nối ngay"**.
- Nguồn đầy đủ: `docs/BRAND.md` và `docs/CONTENT` trong repo `luuload`. Viết tên thương hiệu: chờ `OPEN-05`.
- Không bịa chữ. Thiếu copy thì dùng giá trị tạm và ghi `TODO(content)`.

## 11. Lệnh

| Lệnh | Việc |
|---|---|
| `npm run storybook` | Mở catalog component |
| `npm run tokens:sync` | Sinh `tokens.css` và tài liệu từ `tokens/*.json` |
| `npm run check:hardcode` | Chặn màu, cỡ, số tuỳ ý |
| `npm run build` | Đóng gói thư viện |

Trước khi báo "xong", chạy các lệnh kiểm tra tương ứng và nêu kết quả. Nếu chưa chạy được thì nói thẳng là chưa kiểm.

## 12. Báo cáo cho chủ dự án

- Nói bằng ngôn ngữ đời thường, một hai câu kết quả trước, chi tiết sau.
- Nêu rõ: đã đối chiếu Figma ở khung nào, còn chênh lệch gì, quyết định nào đang chờ.
- Không khẳng định "khớp thiết kế" nếu chưa so ảnh.
- Hỏi trước khi làm điều **không thể hoàn tác** hoặc điều có thể làm hai cách khác nhau.

## 13. Đồng bộ

| Tình huống | Làm gì |
|---|---|
| Figma đổi | Chạy lại Gate Figma, so với code, liệt kê chênh lệch, rồi mới sửa |
| Token đổi | `get_variable_defs`, cập nhật `tokens/*.json`, chạy `tokens:sync`, ghi `PLAN.md` mục 9 |
| Thêm component | Figma trước, rồi manifest (`draft`), rồi code, rồi story |
| Quyết định được chốt | Cập nhật `PLAN.md` mục 3 và 5, rồi sửa code liên quan trong cùng lượt |
| Web `luuload` đổi mà muốn đưa vào thư viện | Chỉ khi Figma đã chốt. Đưa vào là `draft` trước |
