# Lưu Load Design System: PLAN

> Trách nhiệm của file này: ghi lại câu trả lời của chủ dự án, các quyết định đã chốt, và lộ trình triển khai. Luật làm việc cho AI nằm ở `INSTRUCTION.md`, không nằm ở đây.

Cập nhật: 14/11/2026. Ra mắt web: 28/12/2026. Chủ dự án là designer, không phải lập trình viên: mọi giải thích kỹ thuật phải bằng ngôn ngữ đời thường.

## 1. Mục tiêu

Xây bộ Design System của Lưu Load thành **thư viện component React "agent-ready"** trên GitHub: code sạch, cấu trúc rõ, để Claude và các AI khác tự đọc hiểu và dựng UI đúng thiết kế Figma, không phải đoán.

"Agent-ready" nghĩa là:

- Có một sổ tay duy nhất AI đọc đầu tiên (`INSTRUCTION.md`).
- Có danh sách component dạng máy đọc (`components.manifest.json`) ghi tên, trạng thái, props, link Figma.
- Biến thể chỉ chọn từ danh sách có sẵn (TypeScript chặn tên sai). Không có màu hay số pixel tuỳ ý.
- Một nguồn token duy nhất, đồng bộ từ Figma Variables.
- Mọi component có trang xem trong Storybook, đủ trạng thái.

## 2. Câu trả lời của chủ dự án

### 2.1 Phỏng vấn

| # | Câu hỏi | Trả lời |
|---|---|---|
| 1 | Bộ màu và phong cách nào là chuẩn? | **Figma web: xanh, vàng, đỏ rực.** Brand Guideline kem / đen than / xanh sương không dùng làm gốc (có thể thành theme phụ sau) |
| 2 | Nhóm component làm trước? | Cả 4 nhóm: (a) nền tảng Button, Pill, Header, Footer; (b) Card dự án và bộ lọc Gallery; (c) Community: feed post, composer, 4 nhóm; (d) Form, Auth, Modal, Toast |
| 3 | Thư viện "sống" ở đâu, xem bằng cách nào? | Thư viện **kèm trang demo Storybook** |
| 4 | Motion xử lý thế nào? | **Gói motion cơ bản và motion nâng cao.** Brand graphic element chưa chốt nên phần motion sẽ còn bổ sung, nhưng phải đảm bảo có các chuyển động kiểu Creative website |
| 5 | Font Vina Vịt Lộn và Aeonik? | **Có file font, được dùng cho web** |
| 6 | Ngôn ngữ giao diện và tên component? | **Giao diện tiếng Việt, tên code tiếng Anh** |
| 7 | Repo? | Repo mới riêng: https://github.com/nganpk1710/design-system (repo web cũ: https://github.com/nganpk1710/luuload) |
| 8 | Vị trí file hướng dẫn? | Repo mới, kèm một dòng trỏ từ `docs/INSTRUCTION.md` của repo `luuload` |
| 9 | Web hiện tại còn đổi, nên làm gì? | Tạo repo riêng và khởi tạo Design System từ đó |
| 10 | Dùng shadcn/ui được không? | Được. Chốt dùng **shadcn/ui, nền Radix** |
| 12 | OPEN-01: radius nút CTA | **8px, theo Figma Variables** (`radius/cta` = `radius/sm`) |
| 13 | OPEN-02: mốc breakpoint | **1920px, 1440px, 768px, 390px** |
| 14 | OPEN-08: cỡ chữ nhỏ nhất | **12px** |
| 11 | Duyệt đề xuất stack và lộ trình | "ok viết" sau khi được hỏi 5 điểm: shadcn/ui nền Radix, Vite, Storybook lên mạng, chỉ chế độ sáng, lộ trình 4 đợt. Hiểu là đồng ý cả 5. Nếu sai thì sửa mục 3 và mục 6 |

### 2.2 Bối cảnh đã thu thập khi audit

- Repo `luuload` đã có trang chủ HTML/CSS/JS thuần, không build, chạy `file://` (quyết định D-06 `CHỐT` bên repo đó). Quyết định này **giữ nguyên cho repo `luuload`**. Thư viện React nằm ngoài repo đó nên không vi phạm.
- Repo `luuload` có bộ luật tốt, đã dùng được: không hardcode, không shadow, không gradient, không glassmorphism, token trước rồi mới tới code, gate Figma trước khi dựng. Thư viện này **kế thừa** các luật đó.
- Figma ALL-IN **đã có Variables** (Primitives 152, Semantic 118, Responsive 15). Changelog repo `luuload` ghi "Variables rỗng" là đã cũ, cần đối chiếu lại với `css/tokens.css`.
- Figma có 3 nguồn phong cách khác nhau. Chỉ nguồn số 1 là chuẩn:
  1. Figma web (trang `web`, token Variables): xanh `#0800B2`, vàng `#FFF11C`, đỏ `#BA1616`. **Chuẩn.**
  2. Brand Guideline (copywriting): kem, đen than, xanh sương. Chỉ dùng cho tone, từ vựng, microcopy.
  3. Bản wireframe HTML do Claude dựng (kem, xanh rêu, cam): **chỉ để tham khảo cấu trúc và luồng, không dùng làm chuẩn màu.**

## 3. Quyết định kỹ thuật

| ID | Mục | Quyết định | Trạng thái |
|---|---|---|---|
| DS-01 | Nguồn phong cách | Figma web (xanh, vàng, đỏ) | `CHỐT` |
| DS-02 | Framework | React + TypeScript | `CHỐT` |
| DS-03 | Bộ component nền | shadcn/ui, nền Radix UI | `CHỐT` |
| DS-04 | Style | Tailwind CSS v4 + class-variance-authority (cva) | `CHỐT` |
| DS-05 | Trang xem | Storybook, có đưa lên mạng | `CHỐT` (nơi host: `CHỜ`) |
| DS-06 | Đóng gói | Vite (library mode) | `CHỐT` |
| DS-07 | Motion | Gói riêng `motion/`: GSAP + ScrollTrigger + Lenis | `CHỐT` (phạm vi: `ĐỀ XUẤT`) |
| DS-08 | Chế độ màu | Chỉ Light (Figma chỉ có Light) | `CHỐT` |
| DS-09 | Ngôn ngữ | UI tiếng Việt, tên code tiếng Anh | `CHỐT` |
| DS-10 | Token | Một nguồn: Figma Variables → `tokens/*.json` → CSS, Tailwind, tài liệu tự sinh | `CHỐT` |
| DS-11 | Trạng thái component | `stable` / `draft` / `planned` trong `components.manifest.json` | `CHỐT` |
| DS-12 | Không trộn Radix với Base UI | Giữ Radix toàn dự án | `CHỐT` |
| DS-13 | Đưa lên npm | Chưa. Dùng qua GitHub hoặc registry shadcn riêng, xét sau | `CHỜ` |
| DS-14 | Giấy phép GSAP cho dùng thương mại | Cần kiểm tra điều khoản hiện hành trước khi dùng | `CHỜ` |
| DS-15 | Nơi host Storybook: Vercel hay GitHub Pages | Chưa chọn | `CHỜ` |
| DS-16 | Radius nút CTA và nav | 8px (`radius/cta`, `radius/nav`). Không dùng pill trong thư viện này | `CHỐT` (14/11/2026) |
| DS-17 | Breakpoint | 4 mốc thiết kế: 1920, 1440, 768, 390 (px). Cách nối với 3 mode Figma (Desktop / Tablet / Mobile): xem OPEN-02a | `CHỐT` (14/11/2026) |
| DS-18 | Cỡ chữ nhỏ nhất | 12px (đúng token `font/size/12`, dùng cho caption) | `CHỐT` (14/11/2026) |

### Vì sao chọn như vậy (bản đời thường)

- **React** là Component / Master Component của Figma ở dạng code.
- **TypeScript** là bảng checklist tự soát: AI gõ sai tên biến thể thì báo lỗi ngay.
- **shadcn/ui** là bộ component dựng sẵn mà code được chép thẳng vào repo của mình, nên mình sở hữu và đổi style tự do. **Radix** là phần "ruột" lo bàn phím, đọc màn hình, mở/đóng.
- **Tailwind + cva**: Tailwind cho style ngắn gọn gắn với token; cva khai báo biến thể giống Variant trong Figma.
- **Storybook** là cuốn catalog xem từng component và từng trạng thái.
- **Vite** là máy đóng gói chạy nền.
- Không dùng styled-components (AI hay viết sai) và chưa dùng Next.js (thư viện chưa cần khung chạy cả website).

## 4. Phạm vi component

Nhãn trạng thái: `stable` Figma đã chốt, dùng được. `draft` có thể còn đổi, AI phải báo trước khi dùng. `planned` chưa làm.

| Nhóm | Tầng | Component | Trạng thái dự kiến |
|---|---|---|---|
| A. Nền tảng | `ui` | Button (pill, mũi tên), NavItem/Pill, Logo, Heading, Eyebrow, SkipLink | `stable` |
| A. Nền tảng | `blocks` | Header (khách / đã đăng nhập), Footer | `stable` |
| B. Gallery | `ui` | FilterChip, SearchInput, SortToggle, Dropdown lọc | `draft` |
| B. Gallery | `blocks` | ProjectCard, FilterBar | `draft` |
| C. Community | `blocks` | CommunityAccordion (4 nhóm), GroupTabs, FeedPost, Composer | `draft` |
| D. Form/Auth | `ui` | Input, Select, Checkbox, UploadDropzone, Modal, Toast | `draft` |
| D. Form/Auth | `blocks` | AuthCard, ConfirmDialog | `draft` |
| Motion | `motion` | Cơ bản: reveal, hover, transition. Nâng cao: Lenis, ScrollTrigger, chuyển trang, hero card 3D, preloader, gallery xoắn ốc | `planned` (chờ Brand Graphic Element) |

Các section nguyên trang (Hero, USP, Community section…) **chưa thuộc phạm vi Đợt 1–3**. Repo `luuload` đã dựng bản HTML; sẽ xét chuyển sang React sau ra mắt.

## 5. Chỗ chưa khớp, cần chủ dự án quyết

Phát hiện khi audit. Không được tự giải quyết.

| ID | Chênh lệch | Ghi chú |
|---|---|---|
| ~~OPEN-01~~ | ~~Radius CTA và nav~~ | **Đã chốt: 8px (DS-16).** Ghi chú: repo `luuload` D-03 đang đề xuất pill. Hai repo khác nhau ở điểm này, cần ai đó đồng bộ `luuload` về sau. Khi qua Gate Figma, đối chiếu lại ảnh nút CTA ở Hero để chắc 8px đúng thực tế |
| ~~OPEN-02~~ | ~~Breakpoint~~ | **Đã chốt: 1920, 1440, 768, 390 (DS-17).** Còn lại OPEN-02a ngay dưới |
| OPEN-02a | Figma Responsive chỉ có 3 mode (Desktop, Tablet, Mobile) nhưng có 4 mốc. `ĐỀ XUẤT`: 1920 và 1440 cùng dùng mode Desktop, 768 dùng Tablet, 390 dùng Mobile. Cần xác nhận, và cần biết mốc 1920 khác 1440 ở chỗ nào (co giãn hay đổi bố cục). Token layout hiện chưa phân biệt 1920 với 1440 | Xác nhận cách nối |
| OPEN-03 | Màu SVG khác token: vàng `#FFEF00` so với `#FFF11C`, đỏ `#BA2016` so với `#BA1616` (D-16 repo `luuload`) | Chọn bản chuẩn |
| OPEN-04 | `css/tokens.css` của `luuload` cũ so với Figma Variables | Đã đối chiếu 14/11: vàng `#FFEF00` vs `#FFF11C`, đỏ `#BA2016` vs `#BA1616`, neutral-500 `#787878` vs `#7A7A84`, ink `#000` vs neutral-900 `#111111`, paper `#FFF` vs neutral-50 `#FDFDFD`, on-accent `#090AE0` vs blue-500 `#0800B2`, CTA radius 6px vs 8px (DS-16), font tên `Vina Vit Lon` vs `Vina Vịt Lộn`. Thư viện này theo Figma. `luuload` chưa đổi, chờ chủ dự án quyết |
| OPEN-05 | Viết tên thương hiệu: LUULOAD hay Lưu Load (D-17 repo `luuload`) | Ảnh hưởng Logo, Footer |
| OPEN-06 | Brand Graphic Element chưa chốt | Chặn motion nâng cao và các section dùng graphic |
| OPEN-07 | ~~Thiếu alpha overlay~~ | Đã đọc từ Figma: `ink-overlay-16` = #111111 alpha 0.16, `paper-overlay-70` = #FDFDFD alpha 0.70, `transparent` alpha 0. Đã nằm trong `tokens/primitives.json` |
| ~~OPEN-08~~ | ~~Cỡ chữ nhỏ nhất~~ | **Đã chốt: 12px (DS-18).** Repo `luuload` D-05 đề xuất 14px, khác nhau như ở OPEN-01 |
| OPEN-09 | Có làm registry shadcn riêng (`shadcn build`) không | Xét Đợt 3. Lưu ý: `ui.shadcn.com` bị chặn trong môi trường của AI (403), nên `npx shadcn add` không tải được. Component được viết tay theo mẫu shadcn |

## 6. Lộ trình

Mốc ngày là gợi ý. Chủ dự án chỉnh theo sức làm việc.

| Đợt | Thời gian | Việc | Kết quả kiểm được |
|---|---|---|---|
| **0. Nền móng** | 14–21/11 | Khởi tạo Vite + React + TS + Tailwind v4 + shadcn/ui + Storybook. Sao token từ Figma Variables vào `tokens/`, viết script sinh `tokens.css`. Copy font từ repo `luuload`. Viết script chặn hardcode. Khởi tạo `components.manifest.json`. Đối chiếu OPEN-04 | `npm run storybook` chạy được, trang Tokens hiện đủ màu, font, spacing đúng Figma |
| **1. Nền tảng + Form** | 22/11–5/12 | Nhóm A và D | Mỗi component có story đủ trạng thái, đối chiếu Figma 1920 và 1440, qua kiểm tra truy cập |
| **2. Gallery + Community** | 6–17/12 | Nhóm B và C | Như trên, gồm cả trạng thái rỗng, lỗi, đã đăng nhập / khách |
| **3. Motion cơ bản + hoàn thiện** | 18–28/12 | Motion cơ bản, rà soát, hoàn thiện `INSTRUCTION.md`, deploy Storybook, xét registry (OPEN-09) | Link Storybook công khai, manifest đủ, danh sách việc còn lại |
| **Sau ra mắt** | từ 29/12 | Motion nâng cao khi graphic chốt, section nguyên trang bằng React, cân nhắc chuyển `luuload` sang React | |

### Định nghĩa "xong" cho một component

1. Có trong `components.manifest.json` với trạng thái đúng.
2. Có story cho mọi biến thể và mọi trạng thái (mặc định, hover, focus, disabled, lỗi, rỗng nếu liên quan).
3. Khớp Figma ở 1920 và 1440 (ghi chênh lệch cụ thể nếu có). Frame Figma trống thì không gọi là "đã đối chiếu".
4. Chỉ dùng token. Qua script chặn hardcode.
5. Dùng bàn phím được, có focus nhìn thấy, tỉ lệ tương phản đạt WCAG AA.
6. Chữ tiếng Việt đi qua props hoặc file nội dung, không viết cứng trong component.
7. Không shadow, gradient, glassmorphism.

## 7. Rủi ro

| Rủi ro | Giảm thiểu |
|---|---|
| Hạn 28/12 gấp so với phạm vi | Chia 4 đợt, nhãn `stable/draft/planned`, motion nâng cao đẩy sau ra mắt |
| Web `luuload` đổi liên tục, thư viện lệch | Figma là nguồn sự thật; token đồng bộ một chiều; chỉ đưa vào thư viện khi Figma đã chốt |
| Style mặc định của shadcn (có bóng, bo vừa, xám) trái luật Lưu Load | Đổi style toàn bộ ở Đợt 0; nối biến shadcn vào token Semantic |
| Tailwind cho gõ số tuỳ ý, AI dễ vi phạm | Script chặn hardcode, chỉ mở class gắn với token |
| Giấy phép font, GSAP | Chủ dự án đã xác nhận font; GSAP ghi `CHỜ` (DS-14) |
| Brand graphic chưa chốt | Motion nâng cao `planned`, có chỗ chờ trong cấu trúc |

## 8. Việc tiếp theo (cho phiên làm việc kế)

1. Bắt đầu Đợt 0 theo mục 6 (OPEN-01, 02, 08 đã chốt, không còn chặn nhóm A).
2. Chủ dự án xác nhận OPEN-02a (nối 4 mốc với 3 mode Figma) trước khi làm responsive ở Đợt 1.
3. Chọn nơi host Storybook (DS-15).

## 9. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 14/11/2026 | Khởi tạo: audit Figma và repo `luuload`, phỏng vấn, chốt stack, viết `PLAN.md` và `INSTRUCTION.md` |
| 14/11/2026 | Chốt OPEN-01 (CTA 8px), OPEN-02 (1920/1440/768/390), OPEN-08 (12px) thành DS-16, DS-17, DS-18. Mở OPEN-02a |
| 14/11/2026 | Đợt 0: `tokens/*.json` (152 primitives, 118 semantic, 15 responsive, `shadcn-map.json`), `scripts/sync-tokens.mjs` sinh `src/styles/tokens.css`, `scripts/check-hardcode.mjs`, khung Vite + React + TS + Tailwind v4, Storybook 10 với trang Foundations/Tokens, font chép từ `luuload`, `components.manifest.json` rỗng. Đã so ảnh trang Tokens với số liệu Figma ở 1440. Cảnh báo `npm audit` mức vừa ở gói `glob` (công cụ dev, không vào bản build) |
| 16/11/2026 | Đợt 1 (lượt 1): dựng Button, Pill, NavItem, Label, Input, Textarea, Checkbox, Dialog, Header theo Figma Hero 2332:184, hashtag 2155:1230, nav chip 2352:812. Trang `Design System` (2432:186) là wireframe cũ nên chỉ lấy cấu trúc, không lấy phong cách. Chủ dự án xác nhận 4 mốc breakpoint (OPEN-02a, cách nối mode theo đề xuất). `check-hardcode` bỏ qua dòng chú thích. Còn lại: Footer, Toast, Auth |
