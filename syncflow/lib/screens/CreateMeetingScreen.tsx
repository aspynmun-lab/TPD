"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Button } from "@/lib/components/ui/Button";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { Select } from "@/lib/components/ui/Select";
import { DatePicker } from "@/lib/components/ui/DatePicker";
import { Logo } from "@/lib/components/site/Logo";
import { TODAY_ISO } from "@/lib/product/schedule";

export function CreateMeetingScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState<string[]>(["김서연", "이준호"]);
  const [entry, setEntry] = useState("");
  const [rangeStart, setRangeStart] = useState(TODAY_ISO);      // 오늘부터 (이번 주도 가능)
  const [rangeEnd, setRangeEnd] = useState("2026-07-17");
  const [duration, setDuration] = useState("60");               // 고정 1시간
  const [deadline, setDeadline] = useState("2026-07-16");

  const rangeInvalid = rangeEnd < rangeStart;
  const deadlineInvalid = deadline > rangeEnd; // 마감일이 조율 기간(종료)보다 이후면 안 됨
  const canSubmit = title.trim().length > 0 && participants.length > 0 && !rangeInvalid && !deadlineInvalid;

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

          {/* 소요시간 (고정 1시간) — Select(단일 옵션) */}
          <div>
            <span className="ds-field-label type-d1">소요 시간</span>
            <Select aria-label="소요 시간" value={duration} onChange={setDuration} options={[{ value: "60", label: "1시간 (고정)" }]} fullWidth />
          </div>

          {/* 조율 기간 — 날짜 범위 (오늘부터, 이번 주도 가능) */}
          <div>
            <span className="ds-field-label type-d1">조율 기간</span>
            <Inline gap="sm" align="center">
              <DatePicker aria-label="조율 시작일" value={rangeStart} onChange={setRangeStart} minDate={TODAY_ISO} fullWidth />
              <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>~</span>
              <DatePicker aria-label="조율 종료일" value={rangeEnd} onChange={setRangeEnd} minDate={rangeStart} fullWidth />
            </Inline>
            {rangeInvalid && <p className="type-d1" style={{ color: "var(--color-text-error)", marginTop: 6 }}>종료일이 시작일보다 빨라요.</p>}
          </div>

          {/* 마감일 — 조율 종료일 이전이어야 함 */}
          <div>
            <span className="ds-field-label type-d1">응답 마감일</span>
            <DatePicker aria-label="응답 마감일" value={deadline} onChange={setDeadline} minDate={TODAY_ISO} fullWidth />
            {deadlineInvalid && <p className="type-d1" style={{ color: "var(--color-text-error)", marginTop: 6 }}>마감일은 조율 기간(종료일)보다 이전이어야 해요.</p>}
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
