import type { CSSProperties } from "react";

export interface LogoProps {
  /** rendered height in px */
  size?: number;
  style?: CSSProperties;
}

const RATIO = 694 / 164;

/**
 * SyncFlow brand logo (official SVG assets).
 * Dark theme → logo-dark.svg (light fill). Light theme → logo-light.svg (dark fill).
 * Only the theme-matching image is shown (toggled by .sf-logo-* in product.css).
 */
export function Logo({ size = 28, style }: LogoProps) {
  const dims = { height: size, width: Math.round(size * RATIO) };
  return (
    <span className="sf-logo" style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sf-logo-img sf-logo-dark-only" src="/logo-dark.svg" alt="SyncFlow" {...dims} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sf-logo-img sf-logo-light-only" src="/logo-light.svg" alt="SyncFlow" {...dims} />
    </span>
  );
}
