import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { radiusScale, radiusRoles } from "@/lib/tokens";

export const metadata = { title: "Radius · TPD Design System" };

export default function RadiusPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Radius</h1>
          <p className="ds-lead type-b3">
            A radius scale (Tier 1) grouped into role families (Tier 2): interactive (controls),
            container (panels), surface (cards & sections).
          </p>
        </header>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 1 · Primitive</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Scale</h2>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: 16 }}>
            {radiusScale.map((r) => (
              <div key={r.token} className="ds-card" style={{ textAlign: "center" }}>
                <div style={{ height: 72, background: "var(--color-bg-accent-subtle)", border: "1px solid var(--color-border-brand)", borderRadius: r.value === "9999px" ? 9999 : r.value, marginBottom: 12 }} />
                <div className="type-d1" style={{ color: "var(--color-text-secondary)" }}>{r.token.replace("--radius-", "")}</div>
                <div className="type-d2" style={{ color: "var(--color-text-tertiary)" }}>{r.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 2 · Role</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Radius roles</h2>
          </header>
          <div className="ds-card ds-scroll">
            <table className="ds-table">
              <thead><tr><th>Role token</th><th>Maps to</th></tr></thead>
              <tbody>
                {radiusRoles.map((t) => (
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
