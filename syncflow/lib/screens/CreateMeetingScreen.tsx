"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Button } from "@/lib/components/ui/Button";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { Logo } from "@/lib/components/site/Logo";

export function CreateMeetingScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState<string[]>(["김서연", "이준호"]);
  const [entry, setEntry] = useState("");
  const [rangeLabel, setRangeLabel] = useState("다음 주 평일 (7/14–7/18)");
  const [deadline, setDeadline] = useState("2026-07-13T18:00");

  const canSubmit = title.trim().length > 0 && participants.length > 0;

  function addParticipant() {
    const v = entry.trim();
    if (!v) return;
    if (!participants.includes(v)) setParticipants((p) => [...p, v]);
    setEntry("");
  }

  return (
    <PageContainer>
      <Stack gap="xl" style={{ maxWidth: 620, marginInline: "auto", paddingBlock: "6vh" }}>
        <Logo size={24} />
        <header>
          <h1 className="type-h3">회의를 만들어요</h1>
          <p className="ds-lead type-b3" style={{ color: "var(--color-text-secondary)", marginTop: 8 }}>
            후보 시간을 미리 정하지 않아요. 조율 기간과 마감일만 정하면, 참여자들의 선호가 모여 부담이 가장 적은 시간을 찾아드려요.
          </p>
        </header>

        <Stack gap="lg">
          {/* 제목 */}
          <div>
            <span className="ds-field-label type-d1">회의 제목</span>
            <input className="ds-input type-b4" placeholder="예: 3분기 킥오프 미팅" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* 참여자 */}
          <div>
            <span className="ds-field-label type-d1">참여자</span>
            <Inline gap="sm">
              <input
                className="ds-input type-b4"
                placeholder="이름 또는 이메일 입력 후 Enter"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addParticipant(); } }}
              />
              <Button variant="outline" onClick={addParticipant}>추가</Button>
            </Inline>
            {participants.length > 0 && (
              <Inline gap="sm" wrap style={{ marginTop: "var(--space-scale-12)" }}>
                {participants.map((p) => (
                  <span key={p} className="ds-chip type-b5" aria-pressed="false" style={{ cursor: "default" }}>
                    {p}
                    <button className="rm" aria-label={`${p} 삭제`} onClick={() => setParticipants((cur) => cur.filter((x) => x !== p))}>×</button>
                  </span>
                ))}
              </Inline>
            )}
          </div>

          {/* 소요시간 (고정) */}
          <div>
            <span className="ds-field-label type-d1">소요 시간</span>
            <input className="ds-input type-b4" value="1시간" disabled aria-label="소요 시간 1시간 고정" />
          </div>

          {/* 조율 기간 */}
          <div>
            <span className="ds-field-label type-d1">조율 기간</span>
            <input className="ds-input type-b4" value={rangeLabel} onChange={(e) => setRangeLabel(e.target.value)} />
          </div>

          {/* 마감일 */}
          <div>
            <span className="ds-field-label type-d1">응답 마감일</span>
            <input className="ds-input type-b4" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
        </Stack>

        <Stack gap="sm">
          {!canSubmit && (
            <p className="type-b5" style={{ color: "var(--color-text-warning)" }}>
              회의 제목과 참여자를 최소 1명 이상 입력해 주세요.
            </p>
          )}
          <Inline gap="md" align="center">
            <CTAButton disabled={!canSubmit} onAdvance={() => router.push("/board")}>초대 보내기</CTAButton>
            <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>참여자 {participants.length}명</span>
          </Inline>
        </Stack>
      </Stack>
    </PageContainer>
  );
}
