import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { typeStyles } from "@/lib/tokens";

export const metadata = { title: "Typography · TPD Design System" };

export default function TypographyPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Typography</h1>
          <p className="ds-lead type-b3">
            Headings use <strong>SUITE</strong>; subtitle, body and detail use <strong>Pretendard</strong>.
            Every style shares a <code>-0.2px</code> letter-spacing. Values follow the TPD type spec exactly.
          </p>
        </header>

        {typeStyles.map((cat) => (
          <section className="ds-section" key={cat.category}>
            <header><h2 className="type-h4">{cat.category}</h2></header>
            <Stack gap="md">
              {cat.styles.map((s) => (
                <div className="ds-card" key={s.name}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "baseline", justifyContent: "space-between" }}>
                    <div className={s.cls} style={{ minWidth: 0 }}>{s.sample}</div>
                    <div style={{ display: "flex", gap: 16, flexShrink: 0 }} className="type-d1">
                      <span style={{ color: "var(--color-text-accent)", fontWeight: 600 }}>{s.name}</span>
                      <span style={{ color: "var(--color-text-tertiary)" }}>{s.size}px</span>
                      <span style={{ color: "var(--color-text-tertiary)" }}>lh {s.line}px</span>
                      <span style={{ color: "var(--color-text-tertiary)" }}>-0.2px</span>
                      <span style={{ color: "var(--color-text-tertiary)" }}>{s.weight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Stack>
          </section>
        ))}
      </Stack>
    </PageContainer>
  );
}
