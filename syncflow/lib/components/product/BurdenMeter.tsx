import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";

export interface BurdenMeterProps {
  total: number;
  burden: number; // how many feel burdened (aggregate only — never who)
  label?: string;
}

/**
 * Aggregate burden distribution. Confirmed spec: only counts are shown, never
 * who or why. Lower burden = more of the bar is brand gradient.
 */
export function BurdenMeter({ total, burden, label = "부담 분산" }: BurdenMeterProps) {
  const ok = Math.max(0, total - burden);
  const okPct = total ? (ok / total) * 100 : 0;
  const burdenPct = 100 - okPct;
  return (
    <Stack gap="xs">
      <Inline justify="between">
        <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>{label}</span>
        <span className="type-d1" style={{ color: "var(--color-text-secondary)" }}>
          부담 {burden}명 / {total}명
        </span>
      </Inline>
      <div className="ds-burden-track" role="img" aria-label={`${total}명 중 ${burden}명이 부담`}>
        <div className="ds-burden-fill-ok" style={{ width: `${okPct}%` }} />
        <div className="ds-burden-fill-burden" style={{ width: `${burdenPct}%` }} />
      </div>
    </Stack>
  );
}
