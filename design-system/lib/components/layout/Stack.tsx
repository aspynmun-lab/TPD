import type { CSSProperties, ElementType, ReactNode } from "react";

type Gap = "xs" | "sm" | "md" | "lg" | "xl" | "gutter";
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

export interface StackProps {
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Vertical flow container. Gap binds to --space-layout-stack-* role tokens. */
export function Stack({
  gap = "md",
  align,
  justify,
  as: Tag = "div",
  className,
  style,
  children,
}: StackProps) {
  return (
    <Tag
      className={["ds-stack", className].filter(Boolean).join(" ")}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      style={style}
    >
      {children}
    </Tag>
  );
}
