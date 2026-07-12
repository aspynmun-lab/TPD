"use client";

import { Fragment, useMemo, useState } from "react";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Column, Col } from "@/lib/components/layout/Column";
import { CandidateCard } from "@/lib/components/product/CandidateCard";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { Button } from "@/lib/components/ui/Button";
import { Logo } from "@/lib/components/site/Logo";
import { ConfirmedScreen } from "./ConfirmedScreen";
import { WEEK, HOURS, hh, MEETING, type DayCol } from "@/lib/product/schedule";

const TOTAL = MEETING.total;   // 동료 6명
const RESPONDED = 5;           // 데모: 5명 응답, 1명 미응답 (집계는 응답 인원을 넘지 않음)

// Deterministic aggregate (counts only — never identity). Past days are excluded upstream.
// colIdx-based so it works for any selected 조율 기간, not just the default week.
// 선호한 인원 수는 응답 인원(RESPONDED)을 넘지 않는다.
function agg(colIdx: number, h: number): { available: number; burden: number } {
  const available = Math.max(0, RESPONDED - ((colIdx * 2 + (h - 9)) % 4)); // 2..5
  const burden = (colIdx + h) % 3 === 0 ? 1 : 0;
  return { available, burden: Math.min(burden, available) };
}

interface Candidate { key: string; when: string; available: number; burden: number; recommended: boolean; }
type Scenario = "normal" | "empty" | "allBurden";

// Top-2 후보를 그리드에서 자동 선정: 부담 적고(오름) 참여 많은(내림) 순. 지난 일자 제외.
function computeCandidates(week: DayCol[], scenario: Scenario): Candidate[] {
  if (scenario === "empty") return [];
  const cells: { key: string; col: number; h: number; available: number; burden: number }[] = [];
  week.forEach((d, col) => {
    if (d.past) return;
    HOURS.forEach((h) => {
      const { available, burden } = agg(col, h);
      cells.push({ key: `${d.key}-${h}`, col, h, available, burden });
    });
  });
  cells.sort((a, b) => a.burden - b.burden || b.available - a.available);
  return cells.slice(0, 2).map((c, i) => {
    const d = week[c.col];
    // 전부 부담 시나리오: 부담 없는 후보가 하나도 없도록 보정
    const burden = scenario === "allBurden" ? Math.max(1, c.burden) + i : c.burden;
    return {
      key: c.key,
      when: `${d.weekday} ${d.label} ${hh(c.h)}–${hh(c.h + 1)}`,
      available: c.available,
      burden: Math.min(burden, c.available),
      recommended: i === 0,
    };
  });
}

const recommendedKeyFor = (week: DayCol[], scenario: Scenario): string | null =>
  computeCandidates(week, scenario).find((c) => c.recommended)?.key ?? null;

export function DashboardScreen({ week = WEEK, title }: { week?: DayCol[]; title?: string }) {
  const meetingTitle = title?.trim() || MEETING.title;
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [selectedCell, setSelectedCell] = useState<string | null>(() => recommendedKeyFor(week, "normal"));
  const [picked, setPicked] = useState<string | null>(() => recommendedKeyFor(week, "normal"));
  const [confirmed, setConfirmed] = useState<Candidate | null>(null);

  const responded = scenario === "empty" ? 0 : RESPONDED;
  const candidates = useMemo(() => computeCandidates(week, scenario), [week, scenario]);
  const noPerfect = candidates.length > 0 && candidates.every((c) => c.burden > 0);
  const progressPct = (responded / TOTAL) * 100;
  const pickedCand = candidates.find((c) => c.key === picked) ?? null;

  const detail = (() => {
    if (!selectedCell) return null;
    const idx = selectedCell.lastIndexOf("-");
    const dayKey = selectedCell.slice(0, idx);
    const hStr = selectedCell.slice(idx + 1);
    const col = week.findIndex((d) => d.key === dayKey);
    if (col < 0) return null;
    const a = agg(col, Number(hStr));
    return { label: `${week[col].weekday} ${week[col].label} ${hh(Number(hStr))}`, ...a };
  })();

  if (confirmed) {
    return <ConfirmedScreen when={confirmed.when} participantCount={TOTAL} title={meetingTitle} />;
  }

  const ScenarioSwitch = (
    <Inline gap="xs" align="center">
      <span className="type-d2" style={{ color: "var(--color-text-tertiary)" }}>데모 시나리오</span>
      {([["normal", "정상"], ["allBurden", "전부 부담"], ["empty", "응답 0"]] as [Scenario, string][]).map(([s, label]) => (
        <button key={s} className="ds-radio type-d1" aria-pressed={scenario === s}
          onClick={() => { setScenario(s); const k = recommendedKeyFor(week, s); setPicked(k); setSelectedCell(k); }}
          style={{ padding: "4px 10px" }}>{label}</button>
      ))}
    </Inline>
  );

  return (
    <>
      <div className="sf-topbar">
        <PageContainer padding="default">
          <Inline justify="between" align="center" wrap style={{ paddingBlock: "var(--space-scale-12)" }}>
            <Inline gap="md" align="center">
              <Logo size={22} />
              <span style={{ width: 1, height: 20, background: "var(--color-border-default)" }} aria-hidden />
              <Stack gap="xs">
                <span className="type-s6">{meetingTitle}</span>
                <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>주최자 현황보드</span>
              </Stack>
            </Inline>
            <span className="sf-badge type-d1">응답 {responded}/{TOTAL}</span>
          </Inline>
        </PageContainer>
      </div>

      <PageContainer>
        <Stack gap="xl" style={{ paddingBlock: "var(--space-scale-24)" }}>
          <header>
            <Inline justify="between" align="start" wrap gap="md">
              <div>
                <h1 className="type-h4">언제로 정하면 좋을까요?</h1>
                <p className="ds-lead type-b3" style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
                  <strong>선호하는 사람이 많고</strong> 부담이 가장 적은 시간을 추천해 드려요. 개인 응답은 공개되지 않고 집계 수치만 보여집니다.
                </p>
              </div>
              {ScenarioSwitch}
            </Inline>
          </header>

          {responded === 0 ? (
            <div className="ds-candidate" style={{ padding: "var(--space-scale-48)", textAlign: "center" }}>
              <Stack gap="md" align="center">
                <span className="type-h5">아직 응답이 없어요</span>
                <p className="type-b4" style={{ color: "var(--color-text-secondary)", maxWidth: "42ch" }}>
                  참여자들이 선호를 입력하면 이곳에 히트맵과 추천 후보가 나타납니다.
                </p>
                <Button variant="primary" onClick={() => alert("리마인드를 보냈어요 (데모)")}>리마인드 보내기</Button>
              </Stack>
            </div>
          ) : (
            <>
              <Stack gap="xs">
                <Inline justify="between">
                  <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>응답 진행률</span>
                  <span className="type-d1" style={{ color: "var(--color-text-secondary)" }}>
                    {responded} / {TOTAL}명 · 미응답 {TOTAL - responded}명
                  </span>
                </Inline>
                <div className="sf-progress-track"><div className="sf-progress-fill" style={{ width: `${progressPct}%` }} /></div>
              </Stack>

              <Column>
                <Col span={8}>
                  <Stack gap="sm">
                    <span className="type-s6">선호하는 일정</span>
                    <div className="ds-grid" style={{ gridTemplateColumns: `56px repeat(${week.length}, 1fr)` }}>
                      <span aria-hidden />
                      {week.map((d) => (
                        <div key={d.key} className="ds-grid-head" style={{ display: "flex", flexDirection: "column", gap: 1, opacity: d.past ? 0.5 : 1 }}>
                          <span className="type-d1" style={{ color: "var(--color-text-secondary)" }}>{d.weekday}</span>
                          <span className="type-d3" style={{ color: "var(--color-text-tertiary)" }}>{d.label}</span>
                        </div>
                      ))}
                      {HOURS.map((h) => (
                        <Fragment key={h}>
                          <span className="ds-grid-time type-d3" style={{ alignSelf: "center" }}>{hh(h)}</span>
                          {week.map((d, di) => {
                            const key = `${d.key}-${h}`;
                            if (d.past) {
                              return <div key={key} className="sf-heatcell" data-disabled aria-disabled style={{ cursor: "not-allowed" }} />;
                            }
                            const { available, burden } = agg(di, h);
                            const ratio = available / TOTAL;
                            const strong = ratio > 0.55;
                            return (
                              <div
                                key={key}
                                className="sf-heatcell"
                                data-selected={selectedCell === key || undefined}
                                style={{ background: `color-mix(in srgb, var(--color-brand-primary) ${Math.round(ratio * 85 + 4)}%, var(--color-bg-surface))` }}
                                onClick={() => setSelectedCell(key)}
                                role="button"
                                aria-label={`${d.weekday} ${d.label} ${hh(h)} 선호 ${available}명 부담 ${burden}명`}
                              >
                                <span className="type-d3" style={{ color: strong ? "var(--palette-grey-900)" : "var(--color-text-tertiary)" }}>{available}</span>
                                {burden > 0 && <span className="burdendot" aria-hidden />}
                              </div>
                            );
                          })}
                        </Fragment>
                      ))}
                    </div>
                  </Stack>
                </Col>
                <Col span={4}>
                  <Stack gap="sm">
                    <span className="type-s6">선택한 시간</span>
                    {detail ? (
                      <div className="sf-heat-detail">
                        <Stack gap="xs">
                          <span className="type-s2">{detail.label}</span>
                          <Inline gap="lg">
                            <span className="type-b5" style={{ color: "var(--color-text-accent)" }}>선호 {detail.available}명</span>
                            <span className="type-b5" style={{ color: "var(--color-text-warning)" }}>부담 {detail.burden}명</span>
                          </Inline>
                          <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>이름·사유는 공개되지 않아요</span>
                        </Stack>
                      </div>
                    ) : (
                      <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>셀을 클릭하면 집계가 보여요</span>
                    )}
                  </Stack>
                </Col>
              </Column>

              {noPerfect && (
                <div className="sf-heat-detail" style={{ borderColor: "var(--color-semantic-warning)" }}>
                  <span className="type-b5" style={{ color: "var(--color-text-warning)" }}>
                    ⚠️ 모두에게 부담 없는 시간이 없어요. <strong>부담이 가장 적은</strong> 후보를 추천합니다 — 최종 판단은 주최자 몫이에요.
                  </span>
                </div>
              )}

              <Stack gap="sm">
                <span className="type-s6">추천 후보 Top 2 · 부담이 가장 적은 시간</span>
                <Column>
                  {candidates.map((c) => (
                    <Col span={6} key={c.key}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setPicked(c.key)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setPicked(c.key); }}
                        style={{ cursor: "pointer" }}
                      >
                        <CandidateCard when={c.when} total={TOTAL} available={c.available} burden={c.burden} recommended={c.recommended} selected={picked === c.key} />
                      </div>
                    </Col>
                  ))}
                </Column>
              </Stack>

              <Inline gap="md" align="center" wrap>
                <CTAButton disabled={!pickedCand} onAdvance={() => setConfirmed(pickedCand)}>이 시간으로 확정</CTAButton>
                <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>
                  {pickedCand ? `${pickedCand.when} 선택됨` : "추천 후보를 선택하세요"}
                </span>
                <span style={{ flex: 1 }} />
                <Button variant="ghost" onClick={() => alert("리마인드를 보냈어요 (데모)")}>미응답자에게 리마인드</Button>
              </Inline>
            </>
          )}
        </Stack>
      </PageContainer>
    </>
  );
}
