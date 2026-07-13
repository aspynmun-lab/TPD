import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Button } from "@/lib/components/ui/Button";

export const metadata = { title: "Button · SyncFlow Design System" };

const compTokens: { token: string; maps: string }[] = [
  { token: "--color-comp-button-primary-bg", maps: "--color-brand-primary (teal-500 / teal-500)" },
  { token: "--color-comp-button-primary-bg-hover", maps: "--color-brand-primary-hover (teal-400 / teal-600)" },
  { token: "--color-comp-button-primary-bg-pressed", maps: "--color-brand-primary-pressed (teal-600 / teal-700)" },
  { token: "--color-comp-button-primary-label", maps: "--color-text-on-brand (grey-900)" },
  { token: "--color-comp-button-secondary-bg", maps: "--color-brand-secondary (orange-500)" },
  { token: "--color-comp-button-secondary-label", maps: "--color-text-on-brand (grey-900)" },
  { token: "--color-comp-button-outline-border", maps: "--color-border-default" },
  { token: "--color-comp-button-outline-label", maps: "--color-text-primary" },
  { token: "--color-comp-button-ghost-label", maps: "--color-text-primary" },
  { token: "--color-comp-button-disabled-bg", maps: "--color-bg-disabled" },
  { token: "--color-comp-button-disabled-label", maps: "--color-text-disabled" },
  { token: "--radius-comp-button", maps: "--radius-interactive-md (16px)" },
  { token: "--space-comp-inset-button-md-x / -y", maps: "--space-scale-20 / --space-scale-12" },
];

export default function ButtonPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Components · TIER 3</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Button</h1>
          <p className="ds-lead type-b3">
            Reference for the component-tier pattern: the button names its own roles as
            <code> --*-comp-button-*</code> tokens, which bind to Tier-2 role tokens — never to
            primitives. Layout/shape follow the Kairo button; all color is SyncFlow. Brand fills use a
            dark label because teal/orange fail contrast against white.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">Variants</h2></header>
          <div className="ds-card">
            <Inline gap="md" wrap>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </Inline>
          </div>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">Sizes</h2></header>
          <div className="ds-card">
            <Inline gap="md" wrap>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Inline>
          </div>
        </section>

        <section className="ds-section">
          <header>
            <h2 className="type-h4">Token mapping</h2>
            <p className="ds-lead type-b4">Component role → Tier-2 role (theme-resolved value in parentheses).</p>
          </header>
          <div className="ds-card ds-scroll">
            <table className="ds-table">
              <thead><tr><th>Component token (TIER 3)</th><th>Maps to (TIER 2 → resolved)</th></tr></thead>
              <tbody>
                {compTokens.map((t) => (
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
