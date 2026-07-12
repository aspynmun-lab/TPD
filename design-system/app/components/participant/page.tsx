import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { ParticipantRow } from "@/lib/components/product/ParticipantRow";
import { ChipDemo } from "@/lib/components/site/ChipDemo";
import { StatusBadge } from "@/lib/components/ui/StatusBadge";
import { Avatar } from "@/lib/components/ui/Avatar";
import { Inline } from "@/lib/components/layout/Inline";

export const metadata = { title: "Participant · TPD Design System" };

export default function ParticipantPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Components · TIER 3</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Participant</h1>
          <p className="ds-lead type-b3">
            참석자 추가·상태 표시. 확정 스펙상 <strong>참석 중요도(필수/선택) 구분은 범위에서 제외</strong>했습니다 —
            응답 상태만 다룹니다.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">Chip · 참석자 선택</h2><p className="ds-lead type-b4">선택 시 accent-subtle + pop.</p></header>
          <div className="ds-card"><ChipDemo /></div>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">ParticipantRow</h2></header>
          <Stack gap="sm">
            <ParticipantRow name="김서연" responded />
            <ParticipantRow name="이준호" responded />
            <ParticipantRow name="박민지" />
            <ParticipantRow name="정우성" />
          </Stack>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">Avatar · StatusBadge</h2></header>
          <div className="ds-card">
            <Inline gap="lg" wrap>
              <Avatar name="김서연" />
              <Avatar name="이준호" />
              <StatusBadge tone="done">응답 완료</StatusBadge>
              <StatusBadge tone="waiting">대기 중</StatusBadge>
              <StatusBadge tone="accent">조율 중</StatusBadge>
            </Inline>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
