import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { inventory, type CompStatus } from "@/lib/inventory";

export const metadata = { title: "Component Inventory · TPD Design System" };

const statusMeta: Record<CompStatus, { label: string; color: string; bg: string }> = {
  done:  { label: "완료", color: "var(--color-text-success)", bg: "var(--color-bg-success)" },
  reuse: { label: "재사용", color: "var(--color-text-accent)", bg: "var(--color-bg-accent-subtle)" },
  new:   { label: "신규", color: "var(--color-text-warning)", bg: "var(--color-bg-warning)" },
};

function Badge({ status }: { status: CompStatus }) {
  const m = statusMeta[status];
  return (
    <span className="type-d2" style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", color: m.color, background: m.bg, whiteSpace: "nowrap" }}>
      {m.label}
    </span>
  );
}

export default function InventoryPage() {
  const total = inventory.flatMap((f) => f.items);
  const counts = {
    done: total.filter((i) => i.status === "done").length,
    reuse: total.filter((i) => i.status === "reuse").length,
    new: total.filter((i) => i.status === "new").length,
  };

  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Components</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Component inventory</h1>
          <p className="ds-lead type-b3">
            기능정책서 IA flow에 필요한 컴포넌트 목록입니다. 화면(flow)별로, 레퍼런스에서 <strong>재사용</strong>할 것과
            이 기획에만 필요한 <strong>신규</strong> 컴포넌트를 구분했습니다.
          </p>
          <div className="ds-card" style={{ marginTop: 16, borderColor: "var(--color-border-brand)" }}>
            <p className="type-b5" style={{ color: "var(--color-text-secondary)" }}>
              📎 제공해 주신 <strong>UXFront(확정 UX 토대)</strong> + 레퍼런스 DS에서 <strong>flow를 해석해 파생</strong>한
              인벤토리입니다. UXFront는 화면 단위 flowchart가 아니라 리서치·HMW·미해결 긴장이라, flow(0~7)는 제 해석이
              들어갔습니다 — 어긋난 부분이나 이상한 UX가 있으면 알려주시면 자체리뷰·수정 후 확정하겠습니다.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <span className="type-b5"><Badge status="done" /> {counts.done}</span>
            <span className="type-b5"><Badge status="reuse" /> {counts.reuse}</span>
            <span className="type-b5"><Badge status="new" /> {counts.new}</span>
          </div>
        </header>

        {inventory.map((f) => (
          <section className="ds-section" key={f.flow}>
            <header>
              <h2 className="type-h4">{f.flow}</h2>
              <p className="ds-lead type-b4">{f.intent}</p>
            </header>
            <div className="ds-card ds-scroll">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th style={{ width: 220 }}>Component</th>
                    <th style={{ width: 80 }}>구분</th>
                    <th style={{ width: 180 }}>출처</th>
                    <th>역할 / 토큰 · UX 노트</th>
                  </tr>
                </thead>
                <tbody>
                  {f.items.map((i) => (
                    <tr key={f.flow + i.name}>
                      <td className="type-s6">{i.name}</td>
                      <td><Badge status={i.status} /></td>
                      <td className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>{i.from}</td>
                      <td className="type-b5" style={{ color: "var(--color-text-secondary)" }}>{i.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </Stack>
    </PageContainer>
  );
}
