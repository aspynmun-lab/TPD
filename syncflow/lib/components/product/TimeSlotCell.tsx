import type { CSSProperties } from "react";
import type { PreferenceKey } from "@/lib/product/preference";

export interface TimeSlotCellProps {
  level?: PreferenceKey;
  disabled?: boolean;
  style?: CSSProperties;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  label?: string;
}

/** A single timetable cell coloured by its preference level. Past dates are disabled. */
export function TimeSlotCell({ level, disabled, style, onMouseDown, onMouseEnter, label }: TimeSlotCellProps) {
  return (
    <div
      className="ds-slot"
      data-level={disabled ? undefined : level}
      data-disabled={disabled || undefined}
      style={style}
      onMouseDown={disabled ? undefined : onMouseDown}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      role="gridcell"
      aria-disabled={disabled || undefined}
      aria-label={label}
    />
  );
}
