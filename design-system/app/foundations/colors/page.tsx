import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { palettes, roleGroups } from "@/lib/tokens";

export const metadata = { title: "Colors · TPD Design System" };

export default function ColorsPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Colors</h1>
          <p className="ds-lead type-b3">
            Tier 1 primitives are the raw palette. Tier 2 roles map those primitives to purpose,
            and flip between dark (default) and light themes. Use the theme toggle to preview.
          </p>
        </header>

        {/* TIER 1 */}
        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 1 · Primitive</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Palette</h2>
          </header>
          <Stack gap="lg">
            {palettes.map((p) => (
              <div key={p.name}>
                <Stack gap="xs" style={{ marginBottom: 12 }}>
                  <h3 className="type-s2">{p.name}</h3>
                  <span className="type-d1" style={{ color: "var(--color-text-tertiary)" }}>{p.role}</span>
                </Stack>
                <div className="swatch-scale">
                  {p.swatches.map((s) => (
                    <div className="swatch" key={s.step}>
                      <div className="chip" style={{ background: s.hex }} />
                      <div className="meta">
                        <div className="step type-d1">{p.name.split(" ")[0].toLowerCase()}-{s.step}</div>
                        <div className="hex type-d2">{s.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Stack>
        </section>

        {/* TIER 2 */}
        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 2 · Role / Semantic</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Role mapping</h2>
            <p className="ds-lead type-b4">Each role resolves to a different primitive per theme.</p>
          </header>
          <Stack gap="lg">
            {roleGroups.map((rg) => (
              <div className="ds-card" key={rg.group}>
                <h3 className="type-s2" style={{ marginBottom: 12 }}>{rg.group}</h3>
                <div className="ds-scroll">
                  <table className="ds-table">
                    <thead>
                      <tr>
                        <th>Role token</th>
                        <th>Dark (default)</th>
                        <th>Light</th>
                        <th style={{ width: 80 }}>Live</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rg.tokens.map((t) => (
                        <tr key={t.token}>
                          <td><code>{t.token}</code></td>
                          <td className="type-b5">{t.dark}</td>
                          <td className="type-b5">{t.light}</td>
                          <td>
                            <span
                              aria-hidden
                              style={{
                                display: "inline-block", width: 40, height: 24,
                                borderRadius: "var(--radius-xs)",
                                border: "1px solid var(--color-border-default)",
                                background: `var(${t.token})`,
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </Stack>
        </section>
      </Stack>
    </PageContainer>
  );
}
