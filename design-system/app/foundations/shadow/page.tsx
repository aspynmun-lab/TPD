import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { shadowRoles } from "@/lib/tokens";

export const metadata = { title: "Shadow · SyncFlow Design System" };

export default function ShadowPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Shadow</h1>
          <p className="ds-lead type-b3">
            Elevation (directional depth), ambient (soft glow) and section (surface framing) roles.
            Shadow opacity is tuned stronger on dark surfaces.
          </p>
        </header>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 2 · Role</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Elevation & ambient</h2>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 24 }}>
            {shadowRoles.map((s) => (
              <div key={s.token} style={{ textAlign: "center" }}>
                <div style={{ height: 96, background: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-container-md)", boxShadow: `var(${s.token})`, marginBottom: 12 }} />
                <div className="type-d1" style={{ color: "var(--color-text-secondary)" }}>{s.token.replace("--shadow-", "")}</div>
                <div className="type-d2" style={{ color: "var(--color-text-tertiary)" }}>{s.maps}</div>
              </div>
            ))}
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
