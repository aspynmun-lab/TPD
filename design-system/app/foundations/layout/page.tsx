import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Column, Col } from "@/lib/components/layout/Column";

export const metadata = { title: "Layout · SyncFlow Design System" };

const box = (label: string) => <div className="demo-box type-d1">{label}</div>;

export default function LayoutPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations · Ported from Kairo</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Layout system</h1>
          <p className="ds-lead type-b3">
            Four primitives carried over as-is: <code>Stack</code> (vertical), <code>Inline</code> (horizontal),
            <code> Column</code> (12-track grid), <code>PageContainer</code> (page shell). Gaps bind to
            <code> --space-layout-*</code> role tokens; the grid gutter is 24px. Behaviour is preserved — only
            colors are SyncFlow.
          </p>
        </header>

        {/* Stack */}
        <section className="ds-section">
          <header><h2 className="type-h4">Stack</h2><p className="ds-lead type-b4">Vertical flow. Gap: xs·4 / sm·8 / md·16 / lg·24 / xl·40.</p></header>
          <div className="demo-frame">
            <Inline gap="xl" wrap align="start">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((g) => (
                <Stack gap={g} key={g} style={{ minWidth: 96 }}>
                  <span className="type-d2" style={{ color: "var(--color-text-tertiary)" }}>gap {g}</span>
                  {box("A")}{box("B")}{box("C")}
                </Stack>
              ))}
            </Inline>
          </div>
        </section>

        {/* Inline */}
        <section className="ds-section">
          <header><h2 className="type-h4">Inline</h2><p className="ds-lead type-b4">Horizontal flow with wrap & justify-between.</p></header>
          <Stack gap="md">
            <div className="demo-frame">
              <Inline gap="md">{box("Item 1")}{box("Item 2")}{box("Item 3")}</Inline>
            </div>
            <div className="demo-frame">
              <Inline gap="md" justify="between">{box("Leading")}{box("Trailing")}</Inline>
            </div>
          </Stack>
        </section>

        {/* Column */}
        <section className="ds-section">
          <header><h2 className="type-h4">Column · 12-track grid</h2><p className="ds-lead type-b4">Collapses to a single column below the md breakpoint (768px).</p></header>
          <Stack gap="md">
            <div className="demo-frame">
              <Column>
                <Col span={8}>{box("span 8")}</Col>
                <Col span={4}>{box("span 4")}</Col>
              </Column>
            </div>
            <div className="demo-frame">
              <Column>
                <Col span={6}>{box("span 6")}</Col>
                <Col span={6}>{box("span 6")}</Col>
              </Column>
            </div>
            <div className="demo-frame">
              <Column>
                <Col span={4}>{box("span 4")}</Col>
                <Col span={4}>{box("span 4")}</Col>
                <Col span={4}>{box("span 4")}</Col>
              </Column>
            </div>
          </Stack>
        </section>

        {/* PageContainer */}
        <section className="ds-section">
          <header><h2 className="type-h4">PageContainer</h2><p className="ds-lead type-b4">Centered shell, max-width 1280px, responsive inline padding 16 → 24 → 40 → 80.</p></header>
          <div className="demo-frame">
            <div style={{ background: "var(--color-bg-canvas)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-container-md)" }}>
              <PageContainer>{box("Content constrained by PageContainer")}</PageContainer>
            </div>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
