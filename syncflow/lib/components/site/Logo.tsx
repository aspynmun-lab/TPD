import type { CSSProperties } from "react";

export interface LogoProps {
  /** rendered height in px */
  size?: number;
  style?: CSSProperties;
}

/**
 * SyncFlow wordmark — inline SVG (crisp, bulletproof across browsers).
 * Dark theme: accent-interaction teal gradient fill.
 * Light theme: auto solid grey-900 (see .sf-logo-text override in product.css).
 */
export function Logo({ size = 24, style }: LogoProps) {
  const height = size;
  const width = size * (150 / 30); // viewBox aspect 150x30
  return (
    <svg
      className="sf-logo"
      role="img"
      aria-label="SyncFlow"
      width={width}
      height={height}
      viewBox="0 0 150 30"
      style={style}
    >
      <defs>
        <linearGradient id="sf-logo-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67e0d9" />
          <stop offset="50%" stopColor="#00c9d1" />
          <stop offset="100%" stopColor="#2fd4d6" />
        </linearGradient>
      </defs>
      <text
        className="sf-logo-text"
        x="0"
        y="23"
        fontFamily="var(--font-family-heading)"
        fontWeight={700}
        fontSize="26"
        letterSpacing="-0.6"
        textLength="148"
        lengthAdjust="spacingAndGlyphs"
      >
        SyncFlow
      </text>
    </svg>
  );
}
