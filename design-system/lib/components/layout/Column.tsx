import type { CSSProperties, ReactNode } from "react";

type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColumnProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface ColProps {
  /** Grid span at md+ breakpoint (1–12). Collapses to full width below md. */
  span?: Span;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** 12-track responsive grid. Gutter binds to --space-layout-gutter. */
export function Column({ className, style, children }: ColumnProps) {
  return (
    <div className={["ds-column", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}

/** A single grid cell inside <Column>. */
export function Col({ span = 12, className, style, children }: ColProps) {
  return (
    <div
      className={["ds-col", className].filter(Boolean).join(" ")}
      data-span={span}
      style={style}
    >
      {children}
    </div>
  );
}
