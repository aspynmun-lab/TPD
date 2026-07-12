"use client";

import { useState } from "react";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Button } from "@/lib/components/ui/Button";
import { Select } from "@/lib/components/ui/Select";
import type { PreferenceKey } from "@/lib/product/preference";

export interface MemoRule {
  intensity: PreferenceKey;
  startHour: number;
  endHour: number;
  days: string[];   // subset of weekdays; empty = one-off (first matching day)
  label?: string;
}

type Pattern = "unavailable" | "available";

const UNAVAILABLE_OPTS: { key: PreferenceKey; label: string }[] = [
  { key: "unavailable", label: "불가" },
  { key: "burden", label: "부담" },
];
const AVAILABLE_OPTS: { key: PreferenceKey; label: string }[] = [
  { key: "okay", label: "괜찮음" },
  { key: "good", label: "좋음" },
];

export function MemoModal({
  weekdays,
  hours,
  onApply,
  onClose,
}: {
  weekdays: string[];
  hours: number[];
  onApply: (rule: MemoRule) => void;
  onClose: () => void;
}) {
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [intensity, setIntensity] = useState<PreferenceKey | null>(null);
  const [startHour, setStartHour] = useState(hours[0]);
  const [endHour, setEndHour] = useState(hours[0] + 1);
  const [days, setDays] = useState<string[]>([]);
  const [label, setLabel] = useState("");

  const intensityOpts = pattern === "unavailable" ? UNAVAILABLE_OPTS : pattern === "available" ? AVAILABLE_OPTS : [];
  const timeInvalid = startHour >= endHour;
  const canApply = pattern !== null && intensity !== null && !timeInvalid;

  const ALL_DAYS = ["월", "화", "수", "목", "금"];

  function toggleDay(d: string) {
    setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));
  }

  return (
    <div className="ds-modal-overlay" role="dialog" aria-modal="true" aria-label="회의 선택 조건" onMouseDown={onClose}>
      <div className="ds-modal" onMouseDown={(e) => e.stopPropagation()}>
        <Stack gap="lg">
          <div>
            <h2 className="type-h5">회의 선택 조건</h2>
            <p className="type-b5" style={{ color: "var(--color-text-tertiary)", marginTop: 4 }}>
              저장하면 <strong>조건 칩</strong>이 만들어져요. 칩을 누르면 그리드에 자동으로 적용됩니다. 라벨은 나에게만 보여요.
            </p>
          </div>

          {/* 1. 패턴 */}
          <div>
            <span className="ds-field-label type-d1">1 · 패턴</span>
            <div className="ds-radio-row">
              <button className="ds-radio type-b5" aria-pressed={pattern === "unavailable"}
                onClick={() => { setPattern("unavailable"); setIntensity(null); }}>불가 패턴</button>
              <button className="ds-radio type-b5" aria-pressed={pattern === "available"}
                onClick={() => { setPattern("available"); setIntensity(null); }}>가능 패턴</button>
            </div>
          </div>

          {/* 2. 강도 */}
          <div>
            <span className="ds-field-label type-d1">2 · 강도</span>
            <div className="ds-radio-row">
              {intensityOpts.length === 0 && <span className="type-b5" style={{ color: "var(--color-text-disabled)" }}>패턴을 먼저 선택하세요</span>}
              {intensityOpts.map((o) => (
                <button key={o.key} className="ds-radio type-b5" aria-pressed={intensity === o.key} onClick={() => setIntensity(o.key)}>{o.label}</button>
              ))}
            </div>
          </div>

          {/* 3. 적용 시간대 */}
          <div>
            <span className="ds-field-label type-d1">3 · 적용 시간대</span>
            <Inline gap="sm" align="center">
              <Select
                aria-label="시작 시간"
                value={String(startHour)}
                onChange={(v) => setStartHour(Number(v))}
                options={hours.map((h) => ({ value: String(h), label: `${String(h).padStart(2, "0")}:00` }))}
              />
              <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>~</span>
              <Select
                aria-label="종료 시간"
                value={String(endHour)}
                onChange={(v) => setEndHour(Number(v))}
                options={hours.map((h) => ({ value: String(h + 1), label: `${String(h + 1).padStart(2, "0")}:00` }))}
              />
            </Inline>
            {timeInvalid && <p className="type-d1" style={{ color: "var(--color-text-error)", marginTop: 6 }}>시작 시간이 종료 시간보다 빨라야 합니다.</p>}
          </div>

          {/* 4. 반복 요일 */}
          <div>
            <span className="ds-field-label type-d1">4 · 반복 요일 <span style={{ color: "var(--color-text-disabled)" }}>(미선택 시 1회성)</span></span>
            <Inline gap="sm">
              {ALL_DAYS.map((d) => {
                const inRange = weekdays.includes(d);
                return (
                  <button key={d} className="ds-daytoggle type-b5" aria-pressed={days.includes(d)} disabled={!inRange} onClick={() => toggleDay(d)}>{d}</button>
                );
              })}
            </Inline>
          </div>

          {/* label */}
          <div>
            <span className="ds-field-label type-d1">라벨 <span style={{ color: "var(--color-text-disabled)" }}>(선택 · 나만 보임)</span></span>
            <input className="ds-input type-b5" placeholder="예: 회의 집중도 선호" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={30} />
          </div>

          <Inline gap="sm" justify="end">
            <Button variant="ghost" onClick={onClose}>취소</Button>
            <Button
              variant="primary"
              disabled={!canApply}
              onClick={() => {
                if (!canApply || !intensity) return;
                const chosen = days.filter((d) => weekdays.includes(d));
                onApply({ intensity, startHour, endHour, days: chosen, label: label.trim() || undefined });
              }}
            >조건 저장</Button>
          </Inline>
        </Stack>
      </div>
    </div>
  );
}
