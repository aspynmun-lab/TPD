import type { ReactNode } from "react";

export type StatusTone = "done" | "waiting" | "accent";

export interface StatusBadgeProps {
  tone?: StatusTone;
  children: ReactNode;
}

export function StatusBadge({ tone = "waiting", children }: StatusBadgeProps) {
  return (
    <span className="ds-status type-d1" data-tone={tone}>
      {children}
    </span>
  );
}
