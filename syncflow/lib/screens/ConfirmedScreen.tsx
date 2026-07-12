"use client";

import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Logo } from "@/lib/components/site/Logo";

export function ConfirmedScreen({
  when,
  participantCount,
  title,
}: {
  when: string;
  participantCount: number;
  title: string;
}) {
  return (
    <PageContainer>
      <Stack gap="xl" style={{ maxWidth: 560, marginInline: "auto", paddingBlock: "10vh" }}>
        <Logo size={24} />
        <Stack gap="sm">
          <span className="sf-badge type-d1" style={{ alignSelf: "start" }}>확정 완료</span>
          <span className="type-b3" style={{ color: "var(--color-text-secondary)" }}>{title}</span>
          <h1 className="type-h1" style={{ marginTop: 4 }}>{when}</h1>
        </Stack>
        <p className="type-b3" style={{ color: "var(--color-text-secondary)" }}>
          <strong style={{ color: "var(--color-text-accent)" }}>전원에게 알림이 발송되었어요.</strong>
          {" "}참여자 {participantCount}명 모두에게 확정된 일정이 전달됩니다.
        </p>
        <div className="ds-candidate" style={{ padding: "var(--space-scale-20)" }}>
          <Inline justify="between" wrap gap="md">
            <Stack gap="xs">
              <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>확정 일정</span>
              <span className="type-s2">{when}</span>
            </Stack>
            <Stack gap="xs" style={{ textAlign: "right" }}>
              <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>참여자</span>
              <span className="type-s2">{participantCount}명</span>
            </Stack>
          </Inline>
        </div>
      </Stack>
    </PageContainer>
  );
}
