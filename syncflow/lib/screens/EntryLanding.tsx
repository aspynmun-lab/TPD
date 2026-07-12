"use client";

import Link from "next/link";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Column, Col } from "@/lib/components/layout/Column";
import { Logo } from "@/lib/components/site/Logo";
import { Icon, type IconName } from "@/lib/components/ui/Icon";

const roles: { href: string; icon: IconName; title: string; role: string; desc: string; cta: string }[] = [
  {
    href: "/host",
    icon: "calendar",
    title: "회의를 여는 사람",
    role: "주최자",
    desc: "새 회의를 만들고, 후보 시간을 정하지 않아도 부담이 가장 적은 시간을 찾아드려요.",
    cta: "새 회의 만들기",
  },
  {
    href: "/invite",
    icon: "check",
    title: "초대받은 사람",
    role: "참여자",
    desc: "가능/불가가 아니라 얼마나 괜찮은지, 내 선호를 시간표에 칠하기만 하면 돼요.",
    cta: "일정 입력하기",
  },
];

export function EntryLanding() {
  return (
    <div className="sf-scroll">
      {/* Section 1 — 인트로: 무한 루프 영상 + 중앙 로고 (스르르 1회 등장, 새로고침 전까지 유지) */}
      <section className="sf-snap sf-intro">
        <video className="sf-hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="/landingbg.mp4" type="video/mp4" />
        </video>
        <div className="sf-intro-logo sf-logo-fadein">
          <Logo size={72} />
        </div>
        <a href="#entry" className="sf-scrollhint" aria-label="아래로 스크롤">
          <span className="type-d1">스크롤</span>
          <Icon name="chevron-down" size="md" color="currentColor" />
        </a>
      </section>

      {/* Section 2 — 원래 랜딩: 역할 선택 */}
      <section id="entry" className="sf-snap sf-entry">
        <PageContainer>
          <Stack gap="xl" style={{ maxWidth: 880, marginInline: "auto" }}>
            <Stack gap="md" align="center" style={{ textAlign: "center" }}>
              <Logo size={36} />
              <h1 className="type-h2" style={{ marginTop: 8 }}>
                모두가 편한 시간을, <span className="sf-hero-gradient">부담 없이</span>
              </h1>
              <p className="ds-lead type-b2" style={{ color: "var(--color-text-secondary)", marginInline: "auto" }}>
                가능/불가를 넘어 선호 강도까지 담아, 특정인에게 부담이 쏠리지 않는 회의 시간을 찾습니다.
              </p>
            </Stack>

            <Column>
              {roles.map((r) => (
                <Col span={6} key={r.href}>
                  <Link href={r.href} className="sf-rolecard">
                    <Stack gap="sm">
                      <span className="emoji" aria-hidden><Icon name={r.icon} size="lg" color="var(--color-text-accent)" /></span>
                      <span className="sf-badge type-d1" style={{ alignSelf: "start" }}>{r.role}</span>
                      <h2 className="type-s1">{r.title}</h2>
                      <p className="type-b4" style={{ color: "var(--color-text-secondary)" }}>{r.desc}</p>
                      <span className="type-s6" style={{ color: "var(--color-text-accent)", marginTop: 4 }}>{r.cta} →</span>
                    </Stack>
                  </Link>
                </Col>
              ))}
            </Column>

            <p className="type-d1" style={{ color: "var(--color-text-tertiary)", textAlign: "center" }}>
              실제 서비스에서는 주최자는 관리자 링크로, 참여자는 초대 링크로 각자 진입해요.
            </p>
          </Stack>
        </PageContainer>
      </section>
    </div>
  );
}
