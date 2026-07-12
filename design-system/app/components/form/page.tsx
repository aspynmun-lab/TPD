import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { FormDemos } from "@/lib/components/site/FormDemos";

export const metadata = { title: "Form controls · TPD Design System" };

const tokens = [
  { token: ".ds-select-trigger", maps: "bg-canvas + border-default, radius-interactive-sm" },
  { token: ".ds-select-menu", maps: "bg-surface + shadow-elevation-high" },
  { token: ".ds-select-option[data-selected]", maps: "text-accent + check icon" },
  { token: ".ds-dp-day[data-selected]", maps: "accent-interaction gradient + on-accent label" },
  { token: ".ds-dp-day:disabled", maps: "text-disabled (past / < minDate)" },
];

export default function FormPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Components · TIER 3</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Form controls</h1>
          <p className="ds-lead type-b3">
            자체 UI 컴포넌트인 <strong>Select</strong>(커스텀 드롭다운)과 <strong>DatePicker</strong>(커스텀 캘린더).
            네이티브 컨트롤 대신 토큰으로 완전히 스타일링되고, 자유입력을 막고 지난 날짜를 disabled 처리합니다.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">Live</h2></header>
          <FormDemos />
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">토큰</h2></header>
          <div className="ds-card ds-scroll">
            <table className="ds-table">
              <thead><tr><th>클래스</th><th>매핑</th></tr></thead>
              <tbody>{tokens.map((t) => (<tr key={t.token}><td><code>{t.token}</code></td><td className="type-b5">{t.maps}</td></tr>))}</tbody>
            </table>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
