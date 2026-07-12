import Link from "next/link";
import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Column, Col } from "@/lib/components/layout/Column";

const tiers = [
  {
    badge: "TIER 1",
    title: "Primitive",
    body: "Raw, context-free values — our Teal / Orange / Grey palette plus a minimal functional Red·Green set, and the spacing / radius / shadow / type scales. Never referenced directly by components.",
    href: "/foundations/colors",
  },
  {
    badge: "TIER 2",
    title: "Role · Semantic",
    body: "Purpose-named tokens (brand, bg, text, border, icon, semantic, layout) mapped onto primitives. Dark is the default; light is an opt-in override. Components consume only these.",
    href: "/foundations/colors",
  },
  {
    badge: "TIER 3",
    title: "Component",
    body: "Per-component tokens name each component's roles and bind them to Tier-2 roles. See Button for the reference mapping pattern.",
    href: "/components/button",
  },
];

const foundations = [
  { title: "Colors", href: "/foundations/colors", desc: "Palette + role mapping (dark/light)" },
  { title: "Typography", href: "/foundations/typography", desc: "SUITE + Pretendard, H/S/B/D scale" },
  { title: "Spacing", href: "/foundations/spacing", desc: "Scale + layout spacing roles" },
  { title: "Radius", href: "/foundations/radius", desc: "Scale + interactive/container/surface" },
  { title: "Shadow", href: "/foundations/shadow", desc: "Elevation + ambient + section" },
  { title: "Layout", href: "/foundations/layout", desc: "Stack / Inline / Column / PageContainer" },
  { title: "Motion", href: "/foundations/motion", desc: "Micro-interactions tuned to the product" },
];

const components = [
  { title: "Button", href: "/components/button", desc: "TIER 3 role→token 매핑 레퍼런스" },
  { title: "Preference input", href: "/components/preference", desc: "4단계 선호 · 시간표 그리드" },
  { title: "Coordination", href: "/components/coordination", desc: "추천 후보 · 부담 분산" },
  { title: "Participant", href: "/components/participant", desc: "참석자 · 상태 · 칩" },
];

export default function Home() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">TPD · Design System</span>
          <h1 className="type-h1" style={{ marginTop: 8 }}>
            Dark-first design tokens & layout system
          </h1>
          <p className="ds-lead type-b3">
            A three-tier token architecture (Primitive → Role → Component) built on the TPD
            Teal / Orange / Grey palette, with SUITE + Pretendard typography and a layout system
            ported from the Kairo reference. Colors are entirely TPD; layout behaviour is preserved.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">Token tiers</h2></header>
          <Column>
            {tiers.map((t) => (
              <Col span={4} key={t.badge}>
                <Link href={t.href} className="ds-card" style={{ display: "block", height: "100%" }}>
                  <Stack gap="sm">
                    <span className="ds-tier-badge type-d2">{t.badge}</span>
                    <h3 className="type-s1">{t.title}</h3>
                    <p className="type-b5" style={{ color: "var(--color-text-secondary)" }}>{t.body}</p>
                  </Stack>
                </Link>
              </Col>
            ))}
          </Column>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">Foundations</h2></header>
          <Column>
            {foundations.map((f) => (
              <Col span={4} key={f.title}>
                <Link href={f.href} className="ds-card" style={{ display: "block", height: "100%" }}>
                  <Stack gap="xs">
                    <h3 className="type-s2">{f.title}</h3>
                    <p className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>{f.desc}</p>
                  </Stack>
                </Link>
              </Col>
            ))}
          </Column>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">Components</h2></header>
          <Column>
            {components.map((c) => (
              <Col span={4} key={c.title}>
                <Link href={c.href} className="ds-card" style={{ display: "block", height: "100%" }}>
                  <Stack gap="xs">
                    <h3 className="type-s2">{c.title}</h3>
                    <p className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>{c.desc}</p>
                  </Stack>
                </Link>
              </Col>
            ))}
          </Column>
        </section>
      </Stack>
    </PageContainer>
  );
}
