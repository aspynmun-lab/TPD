"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { PreferenceScale } from "@/lib/components/product/PreferenceScale";
import { TimeSlotCell } from "@/lib/components/product/TimeSlotCell";
import { Button } from "@/lib/components/ui/Button";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { MemoModal, type MemoRule } from "@/lib/components/product/MemoModal";
import { Logo } from "@/lib/components/site/Logo";
import { PREFERENCE_LEVELS, type PreferenceKey } from "@/lib/product/preference";
import { WEEK, HOURS, hh, MEETING } from "@/lib/product/schedule";

const cellKey = (dayKey: string, h: number) => `${dayKey}-${h}`;
const INTENSITY_LABEL = Object.fromEntries(PREFERENCE_LEVELS.map((l) => [l.key, l.label])) as Record<PreferenceKey, string>;
const ACTIVE_DAYS = WEEK.filter((d) => !d.past);

interface ConditionChip { id: number; rule: MemoRule; label: string; }

export function PreferenceInputScreen() {
  const [brush, setBrush] = useState<PreferenceKey>("good");
  const [cells, setCells] = useState<Record<string, PreferenceKey>>({});
  const [painting, setPainting] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chips, setChips] = useState<ConditionChip[]>([]);
  const [chipSeq, setChipSeq] = useState(1);
  const [appliedChip, setAppliedChip] = useState<number | null>(null);

  useEffect(() => {
    const stop = () => setPainting(false);
    window.addEventListener("mouseup", stop);
    return () => window.removeEventListener("mouseup", stop);
  }, []);

  const paint = useCallback((key: string) => setCells((p) => ({ ...p, [key]: brush })), [brush]);

  const filledCount = Object.keys(cells).length;
  const canSubmit = filledCount > 0;

  const stats = useMemo(() => {
    const c: Record<PreferenceKey, number> = { unavailable: 0, burden: 0, okay: 0, good: 0 };
    Object.values(cells).forEach((v) => { c[v] += 1; });
    return c;
  }, [cells]);

  // Paint from a saved condition — only on active (non-past) days.
  const applyRule = useCallback((rule: MemoRule) => {
    const targetWeekdays = rule.days.length ? rule.days : [ACTIVE_DAYS[0]?.weekday];
    setCells((prev) => {
      const next = { ...prev };
      ACTIVE_DAYS.filter((d) => targetWeekdays.includes(d.weekday)).forEach((d) => {
        for (let h = rule.startHour; h < rule.endHour; h++) {
          if (HOURS.includes(h)) next[cellKey(d.key, h)] = rule.intensity;
        }
      });
      return next;
    });
  }, []);

  function saveCondition(rule: MemoRule) {
    const days = rule.days.length ? rule.days.join("·") : "1회";
    const label = rule.label || `${INTENSITY_LABEL[rule.intensity]} · ${days} ${hh(rule.startHour)}–${hh(rule.endHour)}`;
    const id = chipSeq;
    setChipSeq(id + 1);
    setChips((c) => [...c, { id, rule, label }]);
    applyRule(rule);
    setMemoOpen(false);
  }

  function runChip(c: ConditionChip) {
    applyRule(c.rule);
    setAppliedChip(c.id);
    window.setTimeout(() => setAppliedChip(null), 320);
  }

  if (submitted) {
    return (
      <PageContainer>
        <Stack gap="lg" style={{ maxWidth: 520, marginInline: "auto", paddingBlock: "8vh" }}>
          <Logo size={24} />
          <span className="sf-badge type-d1" style={{ alignSelf: "start" }}>응답 완료</span>
          <h1 className="type-h3">일정을 저장했어요</h1>
          <p className="type-b3" style={{ color: "var(--color-text-secondary)" }}>
            마감 전까지 언제든 수정할 수 있어요. 개인 응답은 주최자에게 <strong>집계 수치로만</strong> 전달되며, 누가 어떤 시간을 골랐는지는 공개되지 않습니다.
          </p>
          <div className="ds-candidate" style={{ padding: "var(--space-scale-20)" }}>
            <Stack gap="sm">
              <span className="type-s6" style={{ color: "var(--color-text-tertiary)" }}>내 응답 요약</span>
              <Inline gap="lg" wrap>
                {PREFERENCE_LEVELS.map((l) => (
                  <Inline gap="xs" key={l.key}>
                    <span className="ds-slot" data-level={l.key} style={{ width: 16, height: 16, minHeight: 16, cursor: "default" }} />
                    <span className="type-b5">{l.label} {stats[l.key]}</span>
                  </Inline>
                ))}
              </Inline>
            </Stack>
          </div>
          <Inline gap="sm">
            <Button variant="outline" onClick={() => setSubmitted(false)}>수정하기</Button>
          </Inline>
        </Stack>
      </PageContainer>
    );
  }

  return (
    <>
      <div className="sf-topbar">
        <PageContainer padding="default">
          <Inline justify="between" align="center" wrap style={{ paddingBlock: "var(--space-scale-12)" }}>
            <Inline gap="md" align="center">
              <Logo size={22} />
              <span style={{ width: 1, height: 20, background: "var(--color-border-default)" }} aria-hidden />
              <Stack gap="xs">
                <span className="type-s6">{MEETING.title}</span>
                <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>
                  주최 {MEETING.organizer} · 소요 {MEETING.duration} · {MEETING.range}
                </span>
              </Stack>
            </Inline>
            <span className="sf-badge type-d1">마감 D-{MEETING.dday}</span>
          </Inline>
        </PageContainer>
      </div>

      <PageContainer>
        <Stack gap="xl" style={{ paddingBlock: "var(--space-scale-24)" }}>
          <header>
            <h1 className="type-h4">언제가 좋으세요?</h1>
            <p className="ds-lead type-b3" style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
              가능/불가가 아니라 <strong>얼마나 괜찮은지</strong>를 칠해 주세요. 브러시를 고르고 시간표를 드래그하면 됩니다. 지난 날짜는 선택할 수 없어요.
            </p>
          </header>

          {/* Brush */}
          <Stack gap="sm">
            <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>브러시</span>
            <Inline gap="md" wrap justify="between">
              <PreferenceScale value={brush} onChange={setBrush} showDesc={false} />
              <Button variant="ghost" onClick={() => setMemoOpen(true)}>+ 조건 칩 만들기</Button>
            </Inline>
          </Stack>

          {/* 조건 칩 — 히트맵 자동선택 컨트롤 버튼 */}
          {chips.length > 0 && (
            <Stack gap="sm">
              <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>
                내 조건 칩 · 클릭하면 그리드에 자동 적용돼요
              </span>
              <Inline gap="sm" wrap>
                {chips.map((c) => (
                  <span
                    key={c.id}
                    className={"sf-condchip" + (appliedChip === c.id ? " is-applied" : "")}
                    role="button"
                    tabIndex={0}
                    onClick={() => runChip(c)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") runChip(c); }}
                  >
                    <span className="dot" data-level={c.rule.intensity} aria-hidden />
                    <span className="type-b5">{c.label}</span>
                    <button
                      className="rm"
                      aria-label="조건 삭제"
                      onClick={(e) => { e.stopPropagation(); setChips((x) => x.filter((y) => y.id !== c.id)); }}
                    >×</button>
                  </span>
                ))}
              </Inline>
            </Stack>
          )}

          {/* Grid */}
          <div
            className="ds-grid"
            style={{ gridTemplateColumns: `64px repeat(${WEEK.length}, 1fr)`, maxWidth: 720 }}
            onMouseLeave={() => setPainting(false)}
          >
            <span aria-hidden />
            {WEEK.map((d) => (
              <div key={d.key} className="ds-grid-head" style={{ display: "flex", flexDirection: "column", gap: 1, opacity: d.past ? 0.5 : 1 }}>
                <span className="type-s6" style={{ color: "var(--color-text-secondary)" }}>{d.weekday}</span>
                <span className="type-d3" style={{ color: "var(--color-text-tertiary)" }}>{d.label}</span>
              </div>
            ))}
            {HOURS.map((h) => (
              <Fragment key={h}>
                <span className="ds-grid-time type-d2" style={{ alignSelf: "center" }}>{hh(h)}</span>
                {WEEK.map((d) => {
                  const key = cellKey(d.key, h);
                  return (
                    <TimeSlotCell
                      key={key}
                      level={cells[key]}
                      disabled={d.past}
                      label={`${d.weekday} ${d.label} ${hh(h)}`}
                      onMouseDown={() => { setPainting(true); paint(key); }}
                      onMouseEnter={() => { if (painting) paint(key); }}
                    />
                  );
                })}
              </Fragment>
            ))}
          </div>

          {/* Save */}
          <Stack gap="sm">
            {!canSubmit && (
              <p className="type-b5" style={{ color: "var(--color-text-warning)" }}>
                최소 한 칸 이상 선호를 칠해 주세요.
              </p>
            )}
            <Inline gap="md" align="center">
              <CTAButton disabled={!canSubmit} onAdvance={() => setSubmitted(true)}>일정 저장하기</CTAButton>
              <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>{filledCount}칸 선택됨</span>
            </Inline>
          </Stack>
        </Stack>
      </PageContainer>

      {memoOpen && (
        <MemoModal weekdays={ACTIVE_DAYS.map((d) => d.weekday)} hours={HOURS} onApply={saveCondition} onClose={() => setMemoOpen(false)} />
      )}
    </>
  );
}
