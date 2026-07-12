import type { CSSProperties } from "react";

export interface AvatarProps {
  name: string;
  size?: number;
  style?: CSSProperties;
}

/** Circular initial avatar. Individual identity stays minimal (privacy-aware). */
export function Avatar({ name, size = 36, style }: AvatarProps) {
  const initial = name.trim().slice(0, 1).toUpperCase();
  return (
    <span
      className="ds-avatar type-s6"
      aria-hidden
      style={{ width: size, height: size, ...style }}
      title={name}
    >
      {initial}
    </span>
  );
}
