"use client";

import { PREFERENCE_LEVELS, type PreferenceKey } from "@/lib/product/preference";

export interface PreferenceScaleProps {
  value: PreferenceKey | null;
  onChange: (key: PreferenceKey) => void;
  showDesc?: boolean;
}

/**
 * 4-level preference selector (불가 / 부담 / 괜찮음 / 좋음). Confirmed spec:
 * never binary. "좋음" fills with the brand gradient; selection pops.
 */
export function PreferenceScale({ value, onChange, showDesc = true }: PreferenceScaleProps) {
  return (
    <div className="ds-pref-scale" role="group" aria-label="선호 강도">
      {PREFERENCE_LEVELS.map((lvl) => (
        <button
          key={lvl.key}
          type="button"
          className="ds-pref-seg"
          data-level={lvl.key}
          aria-pressed={value === lvl.key}
          onClick={() => onChange(lvl.key)}
          title={lvl.desc}
        >
          <span className="type-s6">{lvl.label}</span>
          {showDesc && <span className="type-d2" style={{ opacity: 0.8 }}>{lvl.desc}</span>}
        </button>
      ))}
    </div>
  );
}
