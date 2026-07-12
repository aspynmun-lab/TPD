import type { CSSProperties, ReactNode } from "react";

export interface PageContainerProps {
  /** Remove the max-width cap and let content fill the viewport. */
  fluid?: boolean;
  /** Remove inline padding. */
  padding?: "default" | "none";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Page shell: centers content, caps at --layout-page-max-width, and applies
 * responsive inline padding (16 → 24 → 40 → 80 across sm/md/lg/xl).
 */
export function PageContainer({
  fluid = false,
  padding = "default",
  className,
  style,
  children,
}: PageContainerProps) {
  return (
    <div
      className={["ds-page", className].filter(Boolean).join(" ")}
      data-fluid={fluid ? "true" : undefined}
      data-padding={padding === "none" ? "none" : undefined}
      style={style}
    >
      {children}
    </div>
  );
}
