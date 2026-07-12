"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { Logo } from "@/lib/components/site/Logo";

// From the invite link in the real product.
const INVITE = { organizer: "김서연", title: "3분기 킥오프 미팅", duration: "1시간", range: "다음 주 평일 (7/14–7/18)", dday: 3 };

export function InviteLanding() {
  const router = useRouter();
  return (
    <div className="sf-landing">
      <PageContainer>
        <Stack gap="xl" style={{ maxWidth: 560, marginInline: "auto" }}>
          <Link href="/" className="sf-backlink type-b5" style={{ alignSelf: "start" }}>← 처음으로</Link>
          <Logo size={28} />
          <Stack gap="sm">
            <span className="sf-badge type-d1" style={{ alignSelf: "start" }}>참여자</span>
            <h1 className="type-h2">
              <span className="sf-hero-gradient">{INVITE.organizer}</span>님의 회의에 초대되었어요
            </h1>
            <p className="ds-lead type-b2" style={{ color: "var(--color-text-secondary)" }}>
              회의 일정 선호를 입력해주세요. 가능/불가가 아니라 <strong>얼마나 괜찮은지</strong>만 칠하면 돼요.
            </p>
          </Stack>

          <div className="ds-candidate" style={{ padding: "var(--space-scale-20)" }}>
            <Stack gap="sm">
              <Inline justify="between" wrap gap="md">
                <span className="type-s2">{INVITE.title}</span>
                <span className="sf-badge type-d1">마감 D-{INVITE.dday}</span>
              </Inline>
              <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>
                주최 {INVITE.organizer} · 소요 {INVITE.duration} · {INVITE.range}
              </span>
            </Stack>
          </div>

          <CTAButton onAdvance={() => router.push("/respond")}>일정 입력하기</CTAButton>
        </Stack>
      </PageContainer>
    </div>
  );
}
