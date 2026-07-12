import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { BurdenMeter } from "./BurdenMeter";

export interface CandidateCardProps {
  when: string;          // e.g. "화 14:00–15:00"
  total: number;
  available: number;     // how many can attend
  burden: number;        // how many feel burdened (aggregate)
  recommended?: boolean;
  confirmed?: boolean;
  selected?: boolean;
}

/**
 * A recommended candidate time. Confirmed spec: show aggregate attend/burden
 * counts (never who). Recommended = least burden, marked with brand gradient.
 * Selection is a single 2px brand border (no outer outline → no doubled stroke).
 */
export function CandidateCard({ when, total, available, burden, recommended, confirmed, selected }: CandidateCardProps) {
  return (
    <div className="ds-candidate" data-recommended={recommended || undefined} data-confirmed={confirmed || undefined} data-selected={selected || undefined}>
      <Stack gap="md">
        <Inline justify="between" align="start">
          <Stack gap="xs">
            <span className="type-s2">{when}</span>
            <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>
              선호 {available} / {total}명
            </span>
          </Stack>
          {confirmed ? (
            <span className="ds-status type-d1" data-tone="done">확정</span>
          ) : recommended ? (
            <span className="ds-badge-reco type-d1">추천 · 부담 최소</span>
          ) : null}
        </Inline>
        <BurdenMeter total={total} burden={burden} />
      </Stack>
    </div>
  );
}
