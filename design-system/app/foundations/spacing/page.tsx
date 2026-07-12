import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { spacingScale, layoutSpacing } from "@/lib/tokens";

export const metadata = { title: "Spacing · TPD Design System" };

export default function SpacingPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Spacing</h1>
          <p className="ds-lead type-b3">
            A px-based scale (Tier 1) feeds semantic layout spacing roles (Tier 2) used by the
            Stack / Inline / Column components.
          </p>
        </header>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 1 · Primitive</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Scale</h2>
          </header>
          <Stack gap="sm">
            {spacingScale.map((s) => (
              <div key={s.token} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <code style={{ width: 180, flexShrink: 0, color: "var(--color-text-secondary)", fontSize: 13 }}>{s.token}</code>
                <span className="type-d1" style={{ width: 48, flexShrink: 0, color: "var(--color-text-tertiary)" }}>{s.value}</span>
                <span style={{ height: 16, width: s.value, background: "var(--color-brand-primary)", borderRadius: 4, display: "inline-block" }} />
              </div>
            ))}
          </Stack>
        </section>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 2 · Role</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Layout spacing</h2>
          </header>
          <div className="ds-card ds-scroll">
            <table className="ds-table">
              <thead><tr><th>Role token</th><th>Maps to</th></tr></thead>
              <tbody>
                {layoutSpacing.map((t) => (
                  <tr key={t.token}><td><code>{t.token}</code></td><td className="type-b5">{t.maps}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
