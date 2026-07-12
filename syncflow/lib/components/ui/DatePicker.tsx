"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";

export interface DatePickerProps {
  /** ISO date string YYYY-MM-DD */
  value: string;
  onChange: (iso: string) => void;
  /** earliest selectable ISO date (inclusive); earlier days are disabled */
  minDate?: string;
  placeholder?: string;
  "aria-label"?: string;
  fullWidth?: boolean;
}

const WD = ["일", "월", "화", "수", "목", "금", "토"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s?: string) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m: m - 1, d };
};
const fmt = (s: string) => { const p = parse(s); return p ? `${p.y}.${pad(p.m + 1)}.${pad(p.d)}` : ""; };

/** Custom calendar DatePicker (design-system UI component). Past / < minDate days are disabled. */
export function DatePicker({ value, onChange, minDate, placeholder = "날짜 선택", fullWidth, ...rest }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sel = parse(value);
  const initial = sel ?? parse(minDate) ?? { y: 2026, m: 6, d: 1 };
  const [view, setView] = useState({ y: initial.y, m: initial.m });

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const grid = useMemo(() => {
    const first = new Date(view.y, view.m, 1).getDay();
    const days = new Date(view.y, view.m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    return cells;
  }, [view]);

  const minCmp = minDate ?? "";
  const shiftMonth = (delta: number) => {
    const m = view.m + delta;
    const y = view.y + Math.floor(m / 12);
    setView({ y, m: ((m % 12) + 12) % 12 });
  };

  return (
    <div className="ds-select-wrap" ref={wrapRef} style={fullWidth ? { width: "100%" } : undefined}>
      <button
        type="button"
        className="ds-select-trigger type-b4"
        data-open={open || undefined}
        aria-label={rest["aria-label"]}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? undefined : "ds-select-placeholder"}>{value ? fmt(value) : placeholder}</span>
        <Icon name="calendar" size="sm" color="var(--color-icon-secondary)" />
      </button>
      {open && (
        <div className="ds-datepicker-pop">
          <div className="ds-dp-head">
            <button type="button" className="ds-dp-nav" aria-label="이전 달" onClick={() => shiftMonth(-1)}>
              <Icon name="chevron-left" size="sm" color="var(--color-icon-secondary)" />
            </button>
            <span className="type-s6">{view.y}년 {view.m + 1}월</span>
            <button type="button" className="ds-dp-nav" aria-label="다음 달" onClick={() => shiftMonth(1)}>
              <Icon name="chevron-right" size="sm" color="var(--color-icon-secondary)" />
            </button>
          </div>
          <div className="ds-dp-grid">
            {WD.map((w) => <span key={w} className="ds-dp-wd type-d2">{w}</span>)}
            {grid.map((d, i) => {
              if (d === null) return <span key={`e${i}`} />;
              const cellIso = iso(view.y, view.m, d);
              const disabled = minCmp !== "" && cellIso < minCmp;
              const isSel = sel && sel.y === view.y && sel.m === view.m && sel.d === d;
              return (
                <button
                  key={cellIso}
                  type="button"
                  className="ds-dp-day type-b5"
                  data-selected={isSel || undefined}
                  disabled={disabled}
                  onClick={() => { onChange(cellIso); setOpen(false); }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
