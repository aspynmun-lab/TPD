import type { CSSProperties } from "react";

export interface LogoProps {
  /** font-size in px */
  size?: number;
  /** gradient = accent-interaction fill (dark theme) → auto grey-900 in light theme.
   *  solid = single teal color. */
  variant?: "gradient" | "solid";
  style?: CSSProperties;
}

/**
 * SyncFlow wordmark (service logo). Heading font (SUITE).
 * Dark theme: accent-interaction gradient fill.
 * Light theme: automatically switches to solid grey-900 (see .sf-logo in product.css).
 */
export function Logo({ size = 22, variant = "gradient", style }: LogoProps) {
  return (
    <span className="sf-logo" data-variant={variant} aria-label="SyncFlow" style={{ fontSize: size, ...style }}>
      SyncFlow
    </span>
  );
}
