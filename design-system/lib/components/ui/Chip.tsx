"use client";

import type { ReactNode } from "react";

export interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

/** Selectable pill. Selection uses the accent-subtle role + pop micro-interaction. */
export function Chip({ selected = false, onClick, children }: ChipProps) {
  return (
    <button type="button" className="ds-chip type-b5" aria-pressed={selected} onClick={onClick}>
      {children}
    </button>
  );
}
