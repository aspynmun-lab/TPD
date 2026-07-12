import type { CSSProperties, ElementType, ReactNode } from "react";

type Gap = "xs" | "sm" | "md" | "lg" | "xl" | "gutter";
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

export interface InlineProps {
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Horizontal flow container. Gap binds to --space-layout-inline-* role tokens. */
export function Inline({
  gap = "md",
  align = "center",
  justify,
  wrap = false,
  as: Tag = "div",
  className,
  style,
  children,
}: InlineProps) {
  return (
    <Tag
      className={["ds-inline", className].filter(Boolean).join(" ")}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap ? "true" : undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
