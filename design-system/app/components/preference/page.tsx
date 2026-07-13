import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { PreferenceDemo } from "@/lib/components/site/PreferenceDemo";
import { AvailabilityGrid } from "@/lib/components/product/AvailabilityGrid";

export const metadata = { title: "Preference input · SyncFlow Design System" };

export default function PreferencePage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Components · TIER 3</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Preference input</h1>
          <p className="ds-lead type-b3">
            확정 스펙의 핵심 — 선호를 <strong>불가 · 부담 · 괜찮음 · 좋음</strong> 4단계로 입력합니다(이분법 지양).
            &quot;좋음&quot;은 브랜드 그라디언트로 채워지고, 선택 시 살짝 팝합니다.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">PreferenceScale</h2><p className="ds-lead type-b4">4단계 세그먼트. 눌러보세요.</p></header>
          <div className="ds-card"><PreferenceDemo /></div>
        </section>

        <section className="ds-section">
          <header>
            <h2 className="type-h4">AvailabilityGrid</h2>
            <p className="ds-lead type-b4">시간표에서 드래그로 선호를 칠합니다. 위 브러시로 강도를 바꿔 칠해 보세요.</p>
          </header>
          <div className="ds-card"><AvailabilityGrid /></div>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">토큰 매핑</h2></header>
          <div className="ds-card ds-scroll">
            <table className="ds-table">
              <thead><tr><th>선호 단계</th><th>bg</th><th>fg</th></tr></thead>
              <tbody>
                <tr><td className="type-s6">불가</td><td className="type-b5">bg-subtle</td><td className="type-b5">text-tertiary</td></tr>
                <tr><td className="type-s6">부담</td><td className="type-b5">bg-warning</td><td className="type-b5">text-warning</td></tr>
                <tr><td className="type-s6">괜찮음</td><td className="type-b5">bg-accent-subtle</td><td className="type-b5">text-info</td></tr>
                <tr><td className="type-s6">좋음</td><td className="type-b5"><strong>gradient-interactive</strong></td><td className="type-b5">on-gradient (grey-900)</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
