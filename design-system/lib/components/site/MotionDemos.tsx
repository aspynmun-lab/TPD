"use client";

import { useState } from "react";
import { Inline } from "@/lib/components/layout/Inline";
import { Stack } from "@/lib/components/layout/Stack";
import { CTAButton } from "@/lib/components/ui/CTAButton";

const intensities = ["불가", "부담", "괜찮음", "좋음"];

/** Interactive micro-interaction demos tuned to the TPD scheduling product. */
export function MotionDemos() {
  const [picked, setPicked] = useState<number | null>(2);
  const [explainKey, setExplainKey] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <Stack gap="lg">
      {/* CTA confirm -> advance (accent interaction gradient on click) */}
      <div className="ds-card">
        <Stack gap="sm">
          <span className="type-s3">CTA 확정 · accent interaction</span>
          <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>
            CTA를 누르면 <strong>클릭 순간에만</strong> primary가 accent-interaction 그라디언트로 채워져 잠깐 보여준 뒤 다음 화면으로 넘어갑니다.
          </span>
          <Inline gap="md">
            <CTAButton onAdvance={() => setStep((s) => (s % 3) + 1)}>다음 단계로</CTAButton>
            <span className="type-b4" style={{ color: "var(--color-text-secondary)" }}>현재: {step} / 3 단계</span>
          </Inline>
        </Stack>
      </div>

      {/* Preference intensity — selection pop (tactile confirm, not binary) */}
      <div className="ds-card">
        <Stack gap="sm">
          <span className="type-s3">선호 강도 선택 · selection pop</span>
          <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>
            가능/불가 이분법이 아니라 강도를 고르는 순간, 살짝 튀어오르는 촉각 피드백으로 &quot;선택됨&quot;을 확인시켜 줍니다.
          </span>
          <Inline gap="sm" wrap>
            {intensities.map((label, i) => (
              <button
                key={i}
                className="motion-pop motion-press type-b5"
                data-selected={picked === i}
                onClick={() => setPicked(i)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-interactive-lg)",
                  border: "1px solid " + (picked === i ? "var(--color-border-brand)" : "var(--color-border-default)"),
                  background: picked === i ? "var(--color-bg-accent-subtle)" : "var(--color-bg-canvas)",
                  color: picked === i ? "var(--color-text-accent)" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  transition: "background-color var(--motion-control), border-color var(--motion-control), color var(--motion-control)",
                }}
              >
                {label}
              </button>
            ))}
          </Inline>
        </Stack>
      </div>

      {/* Adaptive recommendation — explain glow */}
      <div className="ds-card">
        <Stack gap="sm">
          <span className="type-s3">추천 변경 · explain</span>
          <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>
            추천 시간이 바뀔 때 소리 없이 바꾸지 않고, 바뀐 카드를 잠깐 강조해 &quot;왜 바뀌었는지&quot;에 주의를 모읍니다.
          </span>
          <Inline gap="md">
            <button
              className="ds-button motion-press"
              data-variant="outline"
              data-size="md"
              onClick={() => setExplainKey((k) => k + 1)}
            >
              추천 다시 계산
            </button>
            <div
              key={explainKey}
              className={explainKey ? "motion-explain" : undefined}
              style={{
                padding: "12px 16px",
                borderRadius: "var(--radius-container-sm)",
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              <div className="type-s6">화 14:00–15:00</div>
              <div className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>6명 중 5명 선호 · 부담 균형 ↑</div>
            </div>
          </Inline>
        </Stack>
      </div>

      {/* Raise on hover */}
      <div className="ds-card">
        <Stack gap="sm">
          <span className="type-s3">표면 hover · raise</span>
          <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>탭 가능한 카드는 hover 시 살짝 떠오릅니다.</span>
          <Inline gap="md" wrap>
            {[1, 2, 3].map((n) => (
              <div key={n} className="motion-raise" style={{
                width: 140, height: 84, borderRadius: "var(--radius-container-md)",
                background: "var(--color-bg-surface)", border: "1px solid var(--color-border-default)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="type-b5" style={{ color: "var(--color-text-secondary)" }}>후보 {n}</span>
              </div>
            ))}
          </Inline>
        </Stack>
      </div>
    </Stack>
  );
}
