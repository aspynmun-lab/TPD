/* Structured token metadata — the single source the showcase pages render from.
 * Values here mirror styles/primitives.css, semantic.css, typography.css. */

export interface Swatch { step: string; hex: string; }
export interface PaletteScale { name: string; role: string; swatches: Swatch[]; }

export const palettes: PaletteScale[] = [
  {
    name: "Blue (Teal)",
    role: "Brand · Primary",
    swatches: [
      { step: "50", hex: "#e6fafa" }, { step: "100", hex: "#b0eef1" },
      { step: "200", hex: "#8ae6ea" }, { step: "300", hex: "#54dbe0" },
      { step: "400", hex: "#33d4da" }, { step: "500", hex: "#00c9d1" },
      { step: "600", hex: "#00b7be" }, { step: "700", hex: "#008f94" },
      { step: "800", hex: "#006f73" }, { step: "900", hex: "#005458" },
    ],
  },
  {
    name: "Orange",
    role: "Brand · Secondary",
    swatches: [
      { step: "50", hex: "#fdf4ea" }, { step: "100", hex: "#f9debe" },
      { step: "200", hex: "#f6cd9e" }, { step: "300", hex: "#f2b772" },
      { step: "400", hex: "#efa957" }, { step: "500", hex: "#eb932d" },
      { step: "600", hex: "#d68629" }, { step: "700", hex: "#a76820" },
      { step: "800", hex: "#815119" }, { step: "900", hex: "#633e13" },
    ],
  },
  {
    name: "Grey",
    role: "Neutral",
    swatches: [
      { step: "50", hex: "#ececec" }, { step: "100", hex: "#c5c5c5" },
      { step: "200", hex: "#a9a9a9" }, { step: "300", hex: "#828282" },
      { step: "400", hex: "#696969" }, { step: "500", hex: "#444444" },
      { step: "600", hex: "#3e3e3e" }, { step: "700", hex: "#303030" },
      { step: "800", hex: "#252525" }, { step: "900", hex: "#1d1d1d" },
    ],
  },
  {
    name: "Red",
    role: "Functional · Error only",
    swatches: [
      { step: "100", hex: "#fde8e8" }, { step: "300", hex: "#f4a3a6" },
      { step: "400", hex: "#f2777c" }, { step: "500", hex: "#ef5a60" },
      { step: "600", hex: "#e5484d" }, { step: "700", hex: "#c13539" },
      { step: "900", hex: "#4d1114" },
    ],
  },
  {
    name: "Green",
    role: "Functional · Success only",
    swatches: [
      { step: "100", hex: "#e3f6ec" }, { step: "300", hex: "#7ed6a3" },
      { step: "400", hex: "#4fce89" }, { step: "500", hex: "#35c078" },
      { step: "600", hex: "#23a866" }, { step: "700", hex: "#1a7d4d" },
      { step: "900", hex: "#0d3b25" },
    ],
  },
];

export interface RoleToken { token: string; dark: string; light: string; }
export interface RoleGroup { group: string; tokens: RoleToken[]; }

export const roleGroups: RoleGroup[] = [
  {
    group: "Brand",
    tokens: [
      { token: "--color-brand-primary", dark: "blue-500", light: "blue-500" },
      { token: "--color-brand-primary-hover", dark: "blue-400", light: "blue-600" },
      { token: "--color-brand-primary-pressed", dark: "blue-600", light: "blue-700" },
      { token: "--color-brand-secondary", dark: "orange-500", light: "orange-500" },
      { token: "--color-brand-secondary-hover", dark: "orange-400", light: "orange-600" },
      { token: "--color-brand-secondary-pressed", dark: "orange-600", light: "orange-700" },
      { token: "--color-brand-selection", dark: "blue-800", light: "blue-100" },
    ],
  },
  {
    group: "Background",
    tokens: [
      { token: "--color-bg-canvas", dark: "grey-900", light: "white" },
      { token: "--color-bg-surface", dark: "grey-800", light: "white" },
      { token: "--color-bg-subtle", dark: "grey-700", light: "grey-50" },
      { token: "--color-bg-inverse", dark: "grey-50", light: "grey-800" },
      { token: "--color-bg-disabled", dark: "grey-700", light: "grey-100" },
      { token: "--color-bg-accent", dark: "blue-600", light: "blue-600" },
      { token: "--color-bg-accent-subtle", dark: "blue-900", light: "blue-50" },
      { token: "--color-bg-error", dark: "red-900", light: "red-100" },
      { token: "--color-bg-success", dark: "green-900", light: "green-100" },
      { token: "--color-bg-warning", dark: "orange-900", light: "orange-100" },
      { token: "--color-bg-info", dark: "blue-900", light: "blue-50" },
    ],
  },
  {
    group: "Text",
    tokens: [
      { token: "--color-text-primary", dark: "white", light: "grey-900" },
      { token: "--color-text-secondary", dark: "grey-100", light: "grey-500" },
      { token: "--color-text-tertiary", dark: "grey-200", light: "grey-300" },
      { token: "--color-text-disabled", dark: "grey-400", light: "grey-200" },
      { token: "--color-text-inverse", dark: "grey-900", light: "white" },
      { token: "--color-text-accent", dark: "blue-400", light: "blue-800" },
      { token: "--color-text-on-brand", dark: "grey-900", light: "grey-900" },
      { token: "--color-text-on-selection", dark: "white", light: "grey-900" },
      { token: "--color-text-error", dark: "red-400", light: "red-600" },
      { token: "--color-text-success", dark: "green-400", light: "green-600" },
      { token: "--color-text-warning", dark: "orange-300", light: "orange-700" },
      { token: "--color-text-info", dark: "blue-300", light: "blue-800" },
    ],
  },
  {
    group: "Border",
    tokens: [
      { token: "--color-border-default", dark: "grey-700", light: "grey-100" },
      { token: "--color-border-subtle", dark: "grey-800", light: "grey-50" },
      { token: "--color-border-hover", dark: "grey-600", light: "grey-200" },
      { token: "--color-border-brand", dark: "blue-500", light: "blue-500" },
    ],
  },
  {
    group: "Icon",
    tokens: [
      { token: "--color-icon-primary", dark: "white", light: "grey-900" },
      { token: "--color-icon-secondary", dark: "grey-200", light: "grey-500" },
      { token: "--color-icon-tertiary", dark: "grey-300", light: "grey-300" },
      { token: "--color-icon-disabled", dark: "grey-500", light: "grey-200" },
      { token: "--color-icon-accent", dark: "blue-400", light: "blue-600" },
      { token: "--color-icon-on-brand", dark: "grey-900", light: "grey-900" },
    ],
  },
  {
    group: "Semantic status",
    tokens: [
      { token: "--color-semantic-error", dark: "red-500", light: "red-600" },
      { token: "--color-semantic-success", dark: "green-500", light: "green-600" },
      { token: "--color-semantic-warning", dark: "orange-400", light: "orange-600" },
      { token: "--color-semantic-info", dark: "blue-400", light: "blue-700" },
    ],
  },
];

export interface ScaleToken { token: string; value: string; }

export const spacingScale: ScaleToken[] = [
  { token: "--space-scale-2", value: "2px" }, { token: "--space-scale-4", value: "4px" },
  { token: "--space-scale-6", value: "6px" }, { token: "--space-scale-8", value: "8px" },
  { token: "--space-scale-10", value: "10px" }, { token: "--space-scale-12", value: "12px" },
  { token: "--space-scale-16", value: "16px" }, { token: "--space-scale-20", value: "20px" },
  { token: "--space-scale-24", value: "24px" }, { token: "--space-scale-32", value: "32px" },
  { token: "--space-scale-40", value: "40px" }, { token: "--space-scale-48", value: "48px" },
  { token: "--space-scale-60", value: "60px" }, { token: "--space-scale-64", value: "64px" },
  { token: "--space-scale-80", value: "80px" },
];

export const layoutSpacing: { token: string; maps: string }[] = [
  { token: "--space-layout-inline-xs", maps: "scale-4 · 4px" },
  { token: "--space-layout-inline-sm", maps: "scale-8 · 8px" },
  { token: "--space-layout-inline-md", maps: "scale-12 · 12px" },
  { token: "--space-layout-inline-lg", maps: "scale-16 · 16px" },
  { token: "--space-layout-inline-xl", maps: "scale-24 · 24px" },
  { token: "--space-layout-stack-xs", maps: "scale-4 · 4px" },
  { token: "--space-layout-stack-sm", maps: "scale-8 · 8px" },
  { token: "--space-layout-stack-md", maps: "scale-16 · 16px" },
  { token: "--space-layout-stack-lg", maps: "scale-24 · 24px" },
  { token: "--space-layout-stack-xl", maps: "scale-40 · 40px" },
  { token: "--space-layout-gutter", maps: "scale-24 · 24px" },
];

export const radiusScale: ScaleToken[] = [
  { token: "--radius-xs", value: "4px" }, { token: "--radius-sm", value: "8px" },
  { token: "--radius-md", value: "12px" }, { token: "--radius-lg", value: "16px" },
  { token: "--radius-xl", value: "20px" }, { token: "--radius-2xl", value: "24px" },
  { token: "--radius-3xl", value: "40px" }, { token: "--radius-4xl", value: "48px" },
  { token: "--radius-full", value: "9999px" },
];

export const radiusRoles: { token: string; maps: string }[] = [
  { token: "--radius-interactive-xs", maps: "radius-xs · 4px" },
  { token: "--radius-interactive-sm", maps: "radius-sm · 8px" },
  { token: "--radius-interactive-md", maps: "radius-lg · 16px" },
  { token: "--radius-interactive-lg", maps: "radius-full" },
  { token: "--radius-container-sm", maps: "radius-md · 12px" },
  { token: "--radius-container-md", maps: "radius-xl · 20px" },
  { token: "--radius-container-lg", maps: "radius-2xl · 24px" },
  { token: "--radius-surface-sm", maps: "radius-2xl · 24px" },
  { token: "--radius-surface-md", maps: "radius-3xl · 40px" },
  { token: "--radius-surface-lg", maps: "radius-4xl · 48px" },
  { token: "--radius-card", maps: "surface-md · 40px" },
  { token: "--radius-section", maps: "surface-lg · 48px" },
];

export const shadowRoles: { token: string; maps: string }[] = [
  { token: "--shadow-elevation-low", maps: "scale-1" },
  { token: "--shadow-elevation-mid", maps: "scale-2" },
  { token: "--shadow-elevation-high", maps: "scale-3" },
  { token: "--shadow-ambient-low", maps: "ambient-sm" },
  { token: "--shadow-ambient-mid", maps: "ambient-md" },
  { token: "--shadow-ambient-high", maps: "ambient-lg" },
  { token: "--shadow-section-sm", maps: "ambient-low" },
  { token: "--shadow-section-md", maps: "ambient-mid" },
  { token: "--shadow-section-lg", maps: "ambient-high" },
];

export interface TypeStyle {
  name: string; cls: string; font: "SUITE" | "Pretendard";
  size: number; line: number; weight: string; sample: string;
}
export const typeStyles: { category: string; styles: TypeStyle[] }[] = [
  {
    category: "Heading · SUITE",
    styles: [
      { name: "H1", cls: "type-h1", font: "SUITE", size: 36, line: 46, weight: "Bold", sample: "제목 Heading 1" },
      { name: "H2", cls: "type-h2", font: "SUITE", size: 36, line: 46, weight: "Medium", sample: "제목 Heading 2" },
      { name: "H3", cls: "type-h3", font: "SUITE", size: 32, line: 44, weight: "Bold", sample: "제목 Heading 3" },
      { name: "H4", cls: "type-h4", font: "SUITE", size: 28, line: 38, weight: "Bold", sample: "제목 Heading 4" },
      { name: "H5", cls: "type-h5", font: "SUITE", size: 24, line: 36, weight: "Medium", sample: "제목 Heading 5" },
    ],
  },
  {
    category: "Subtitle · Pretendard",
    styles: [
      { name: "S1", cls: "type-s1", font: "Pretendard", size: 20, line: 24, weight: "Bold", sample: "소제목 Subtitle" },
      { name: "S2", cls: "type-s2", font: "Pretendard", size: 20, line: 24, weight: "Medium", sample: "소제목 Subtitle" },
      { name: "S3", cls: "type-s3", font: "Pretendard", size: 18, line: 22, weight: "Bold", sample: "소제목 Subtitle" },
      { name: "S4", cls: "type-s4", font: "Pretendard", size: 18, line: 22, weight: "Semibold", sample: "소제목 Subtitle" },
      { name: "S5", cls: "type-s5", font: "Pretendard", size: 18, line: 22, weight: "Medium", sample: "소제목 Subtitle" },
      { name: "S6", cls: "type-s6", font: "Pretendard", size: 16, line: 20, weight: "Semibold", sample: "소제목 Subtitle" },
    ],
  },
  {
    category: "Body · Pretendard",
    styles: [
      { name: "B1", cls: "type-b1", font: "Pretendard", size: 20, line: 30, weight: "Medium", sample: "본문 Body text 본문입니다." },
      { name: "B2", cls: "type-b2", font: "Pretendard", size: 20, line: 30, weight: "Regular", sample: "본문 Body text 본문입니다." },
      { name: "B3", cls: "type-b3", font: "Pretendard", size: 18, line: 28, weight: "Medium", sample: "본문 Body text 본문입니다." },
      { name: "B4", cls: "type-b4", font: "Pretendard", size: 16, line: 24, weight: "Regular", sample: "본문 Body text 본문입니다." },
      { name: "B5", cls: "type-b5", font: "Pretendard", size: 14, line: 22, weight: "Regular", sample: "본문 Body text 본문입니다." },
    ],
  },
  {
    category: "Detail · Pretendard",
    styles: [
      { name: "D1", cls: "type-d1", font: "Pretendard", size: 14, line: 20, weight: "Medium", sample: "디테일 Detail label" },
      { name: "D2", cls: "type-d2", font: "Pretendard", size: 12, line: 16, weight: "Medium", sample: "디테일 Detail label" },
      { name: "D3", cls: "type-d3", font: "Pretendard", size: 10, line: 14, weight: "Medium", sample: "디테일 Detail label" },
      { name: "D4", cls: "type-d4", font: "Pretendard", size: 8, line: 12, weight: "Medium", sample: "디테일 Detail label" },
    ],
  },
];
