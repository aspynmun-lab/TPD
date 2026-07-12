"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { CTAButton } from "@/lib/components/ui/CTAButton";
import { Logo } from "@/lib/components/site/Logo";
import { Icon } from "@/lib/components/ui/Icon";

const POINTS = [
  "후보 시간을 미리 정하지 않아요 — 한 사람 기준으로 맞추는 부담을 없앱니다",
  "참여자 선호가 모이면 부담이 가장 적은 시간을 추천해요",
  "누가 부담을 느끼는지는 공개되지 않고, 집계 수치만 보여요",
];

export function HostLanding() {
  const router = useRouter();
  return (
    <div className="sf-landing">
      <PageContainer>
        <Stack gap="xl" style={{ maxWidth: 640, marginInline: "auto" }}>
          <Link href="/" className="sf-backlink type-b5" style={{ alignSelf: "start" }}>← 처음으로</Link>
          <Logo size={28} />
          <Stack gap="sm">
            <span className="sf-badge type-d1" style={{ alignSelf: "start" }}>주최자</span>
            <h1 className="type-h2">새 회의 만들기</h1>
            <p className="ds-lead type-b2" style={{ color: "var(--color-text-secondary)" }}>
              조율 기간과 마감일만 정하면 돼요. 나머지는 SyncFlow가 부담 없이 맞춰드립니다.
            </p>
          </Stack>

          <Stack gap="md">
            {POINTS.map((text) => (
              <Inline key={text} gap="md" align="start">
                <span
                  aria-hidden
                  style={{ width: 24, height: 28, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Icon name="check" size="md" color="var(--color-text-accent)" />
                </span>
                <span className="type-b3" style={{ color: "var(--color-text-secondary)" }}>{text}</span>
              </Inline>
            ))}
          </Stack>

          <CTAButton onAdvance={() => router.push("/create")}>새 회의 만들기</CTAButton>
        </Stack>
      </PageContainer>
    </div>
  );
}
