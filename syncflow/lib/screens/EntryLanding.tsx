"use client";

import Link from "next/link";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Column, Col } from "@/lib/components/layout/Column";
import { Logo } from "@/lib/components/site/Logo";
import { Icon, type IconName } from "@/lib/components/ui/Icon";

// UXFront 리서치 장표 (1920×1080) — 한 장씩 스크롤 섹션으로
const uxSlides: { src: string; alt: string }[] = [
  { src: "/ux/slide-1.jpg", alt: "Background — 같은 연차 동료들이 모여도 한 사람이 낸 시간이 채택되는 경우가 많았습니다" },
  { src: "/ux/slide-2.jpg", alt: "How Might We — 어떻게 하면 회의 조율에서 부담이 특정인에게 쏠리지 않게 할 수 있을까요?" },
  { src: "/ux/slide-3.jpg", alt: "Desk Research 1·2 — 빈 시간만으론 선호를 표현하기 어렵고, 가용성·선호·중요도를 함께 표현해야 합니다" },
  { src: "/ux/slide-4.jpg", alt: "Desk Research 3·4 — 적응형 변화는 혼란을 유발할 수 있고, 캘린더 행동은 진짜 선호를 반영하지 않습니다" },
  { src: "/ux/slide-5.jpg", alt: "Desk Research 5 & Weak-evidence — 선호는 조율 과정에서 구성될 수 있습니다" },
];

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
        <a href="#ux-1" className="sf-scrollhint" aria-label="리서치 배경 보기">
          <span className="type-d1">배경 리서치</span>
          <Icon name="chevron-down" size="md" color="currentColor" />
        </a>
      </section>

      {/* Section 3+ — UXFront 리서치 장표 (한 장씩) */}
      {uxSlides.map((s, i) => (
        <section key={s.src} id={`ux-${i + 1}`} className="sf-snap sf-slide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.alt} className="sf-slide-img" loading={i === 0 ? "eager" : "lazy"} />
        </section>
      ))}
    </div>
  );
}
