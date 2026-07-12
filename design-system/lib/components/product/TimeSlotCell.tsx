import type { CSSProperties } from "react";
import type { PreferenceKey } from "@/lib/product/preference";

export interface TimeSlotCellProps {
  level?: PreferenceKey;
  style?: CSSProperties;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  label?: string;
}

/** A single timetable cell coloured by its preference level. */
export function TimeSlotCell({ level, style, onMouseDown, onMouseEnter, label }: TimeSlotCellProps) {
  return (
    <div
      className="ds-slot"
      data-level={level}
      style={style}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      role="gridcell"
      aria-label={label}
    />
  );
}
