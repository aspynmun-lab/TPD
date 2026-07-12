"use client";

import { Fragment, useState } from "react";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Column, Col } from "@/lib/components/layout/Column";
import { CandidateCard } from "@/lib/components/product/CandidateCard";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { Button } from "@/lib/components/ui/Button";
import { Logo } from "@/lib/components/site/Logo";
import { ConfirmedScreen } from "./ConfirmedScreen";

const MEETING = { title: "3분기 킥오프 미팅", total: 8, responded: 6 };
const WEEKDAYS = ["월", "화", "수", "목", "금"];
const DATE_OF: Record<string, string> = { "월": "7/14", "화": "7/15", "수": "7/16", "목": "7/17", "금": "7/18" };
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

// Deterministic aggregate heatmap (no per-user identity — counts only).
function agg(dayIdx: number, h: number): { available: number; burden: number } {
  if (dayIdx === 1 && h === 14) return { available: 7, burden: 0 }; // Top1
  if (dayIdx === 2 && h === 11) return { available: 8, burden: 1 }; // Top2
  const available = Math.max(0, 8 - ((dayIdx * 2 + (h - 9)) % 6));
  const burden = (dayIdx + h) % 3 === 0 ? 1 : 0;
  return { available, burden: Math.min(burden, available) };
}

interface Candidate { key: string; when: string; available: number; burden: number; recommended: boolean; }
const CANDIDATES: Candidate[] = [
  { key: "화-14", when: "화 14:00–15:00", available: 7, burden: 0, recommended: true },
  { key: "수-11", when: "수 11:00–12:00", available: 8, burden: 1, recommended: false },
];

export function DashboardScreen() {
  const [selectedCell, setSelectedCell] = useState<string | null>("화-14");
  const [picked, setPicked] = useState<string | null>("화-14");
  const [confirmed, setConfirmed] = useState<Candidate | null>(null);

  const progressPct = (MEETING.responded / MEETING.total) * 100;
  const pickedCand = CANDIDATES.find((c) => c.key === picked) ?? null;

  const detail = (() => {
    if (!selectedCell) return null;
    const [d, hStr] = selectedCell.split("-");
    const a = agg(WEEKDAYS.indexOf(d), Number(hStr));
    return { label: `${d} ${hh(Number(hStr))}`, ...a };
  })();

  if (confirmed) {
    return <ConfirmedScreen when={confirmed.when} participantCount={MEETING.total} title={MEETING.title} />;
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
                <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>주최자 현황보드</span>
              </Stack>
            </Inline>
            <span className="sf-badge type-d1">응답 {MEETING.responded}/{MEETING.total}</span>
          </Inline>
        </PageContainer>
      </div>

      <PageContainer>
        <Stack gap="xl" style={{ paddingBlock: "var(--space-scale-24)" }}>
          <header>
            <h1 className="type-h4">언제로 정하면 좋을까요?</h1>
            <p className="ds-lead type-b3" style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
              참여 가능 인원이 많고 <strong>부담이 가장 적은</strong> 시간을 추천해 드려요. 개인 응답은 공개되지 않고 집계 수치만 보여집니다.
            </p>
          </header>

          {/* 진행률 */}
          <Stack gap="xs">
            <Inline justify="between">
              <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>응답 진행률</span>
              <span className="type-d1" style={{ color: "var(--color-text-secondary)" }}>
                {MEETING.responded} / {MEETING.total}명 · 미응답 {MEETING.total - MEETING.responded}명
              </span>
            </Inline>
            <div className="sf-progress-track"><div className="sf-progress-fill" style={{ width: `${progressPct}%` }} /></div>
          </Stack>

          {/* 히트맵 */}
          <Column>
            <Col span={8}>
              <Stack gap="sm">
                <span className="type-s6">참여 가능 히트맵</span>
                <div className="ds-grid" style={{ gridTemplateColumns: `56px repeat(${WEEKDAYS.length}, 1fr)` }}>
                  <span aria-hidden />
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="ds-grid-head" style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <span className="type-d1" style={{ color: "var(--color-text-secondary)" }}>{d}</span>
                      <span className="type-d3" style={{ color: "var(--color-text-tertiary)" }}>{DATE_OF[d]}</span>
                    </div>
                  ))}
                  {HOURS.map((h) => (
                    <Fragment key={h}>
                      <span className="ds-grid-time type-d3" style={{ alignSelf: "center" }}>{hh(h)}</span>
                      {WEEKDAYS.map((d, di) => {
                        const key = `${d}-${h}`;
                        const { available, burden } = agg(di, h);
                        const ratio = available / MEETING.total;
                        const strong = ratio > 0.55;
                        return (
                          <div
                            key={key}
                            className="sf-heatcell"
                            data-selected={selectedCell === key || undefined}
                            style={{ background: `color-mix(in srgb, var(--color-brand-primary) ${Math.round(ratio * 85 + 4)}%, var(--color-bg-surface))` }}
                            onClick={() => setSelectedCell(key)}
                            role="button"
                            aria-label={`${d} ${hh(h)} 참여 ${available}명 부담 ${burden}명`}
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
                        <span className="type-b5" style={{ color: "var(--color-text-accent)" }}>참여 {detail.available}명</span>
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

          {/* 추천 Top2 */}
          <Stack gap="sm">
            <span className="type-s6">추천 후보 Top 2 · 부담이 가장 적은 시간</span>
            <Column>
              {CANDIDATES.map((c) => (
                <Col span={6} key={c.key}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setPicked(c.key)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setPicked(c.key); }}
                    style={{ borderRadius: "var(--radius-container-md)", outline: picked === c.key ? "2px solid var(--color-border-brand)" : "2px solid transparent", cursor: "pointer" }}
                  >
                    <CandidateCard when={c.when} total={MEETING.total} available={c.available} burden={c.burden} recommended={c.recommended} />
                  </div>
                </Col>
              ))}
            </Column>
          </Stack>

          {/* 확정 */}
          <Inline gap="md" align="center" wrap>
            <CTAButton disabled={!pickedCand} onAdvance={() => setConfirmed(pickedCand)}>이 시간으로 확정</CTAButton>
            <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>
              {pickedCand ? `${pickedCand.when} 선택됨` : "추천 후보를 선택하세요"}
            </span>
            <span style={{ flex: 1 }} />
            <Button variant="ghost" onClick={() => alert("리마인드를 보냈어요 (데모)")}>미응답자에게 리마인드</Button>
          </Inline>
        </Stack>
      </PageContainer>
    </>
  );
}
