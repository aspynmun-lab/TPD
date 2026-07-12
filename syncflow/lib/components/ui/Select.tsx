"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  "aria-label"?: string;
  fullWidth?: boolean;
}

/** Custom listbox dropdown (design-system UI component). Token-styled, keyboard + outside-click aware. */
export function Select({ value, onChange, options, placeholder = "선택", disabled, fullWidth, ...rest }: SelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="ds-select-wrap" ref={wrapRef} style={fullWidth ? { width: "100%" } : undefined}>
      <button
        type="button"
        className="ds-select-trigger type-b4"
        data-open={open || undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={rest["aria-label"]}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selected ? undefined : "ds-select-placeholder"}>{selected ? selected.label : placeholder}</span>
        <Icon name={open ? "chevron-up" : "chevron-down"} size="sm" color="var(--color-icon-secondary)" />
      </button>
      {open && (
        <ul className="ds-select-menu" role="listbox">
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className="ds-select-option type-b4"
              data-selected={o.value === value || undefined}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              <span>{o.label}</span>
              {o.value === value && <Icon name="check" size="sm" color="var(--color-icon-accent)" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
