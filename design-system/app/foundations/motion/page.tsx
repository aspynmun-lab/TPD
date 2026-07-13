import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { MotionDemos } from "@/lib/components/site/MotionDemos";

export const metadata = { title: "Motion · SyncFlow Design System" };

const durations = [
  { token: "--motion-duration-fast", value: "120ms", use: "컨트롤 피드백 (버튼·토글)" },
  { token: "--motion-duration-base", value: "180ms", use: "일반 전환·선택 피드백" },
  { token: "--motion-duration-slow", value: "280ms", use: "표면 등장 (카드·모달)" },
  { token: "--motion-duration-deliberate", value: "420ms", use: "설명·안심 (추천 변경 강조)" },
];
const easings = [
  { token: "--motion-easing-standard", value: "cubic-bezier(.2,0,0,1)", use: "일반" },
  { token: "--motion-easing-enter", value: "cubic-bezier(0,0,0,1)", use: "등장(감속)" },
  { token: "--motion-easing-exit", value: "cubic-bezier(.3,0,1,1)", use: "퇴장(가속)" },
  { token: "--motion-easing-emphasized", value: "cubic-bezier(.2,0,0,1.4)", use: "촉각 팝/스프링" },
];
const roles = [
  { token: "--motion-control", maps: "fast + standard", use: "버튼/토글/입력" },
  { token: "--motion-surface", maps: "slow + enter", use: "카드/모달 등장·raise" },
  { token: "--motion-feedback", maps: "base + standard", use: "토스트/opacity" },
  { token: "--motion-select", maps: "base + emphasized", use: "선호 강도 선택 팝" },
  { token: "--motion-explain", maps: "deliberate + enter", use: "적응형 추천 변경 강조" },
];

export default function MotionPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Foundations</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Motion · Micro-interactions</h1>
          <p className="ds-lead type-b3">
            SyncFlow는 사람들이 선호를 반복해서 입력·비교·수정하는 도구입니다. 모션은 <strong>차분하고 빠르게</strong>(반복 사용에도
            거슬리지 않게), 선호를 정할 땐 <strong>촉각적 확인</strong>을, 상태가 바뀔 땐 <strong>안심</strong>을 줍니다.
            적응형 추천 변경은 조금 더 느리게 움직여 사용자가 &quot;왜 바뀌었는지&quot; 따라올 수 있게 합니다.
            <br />모든 모션은 <code>prefers-reduced-motion</code>에서 자동으로 축소됩니다.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">Live patterns</h2><p className="ds-lead type-b4">실제 기획 맥락에 맞춘 인터랙션 (클릭·hover 해보세요).</p></header>
          <MotionDemos />
        </section>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 1 · Primitive</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Durations & easings</h2>
          </header>
          <Stack gap="md">
            <div className="ds-card ds-scroll">
              <table className="ds-table">
                <thead><tr><th>Duration</th><th>Value</th><th>Use</th></tr></thead>
                <tbody>{durations.map((d) => (<tr key={d.token}><td><code>{d.token}</code></td><td className="type-b5">{d.value}</td><td className="type-b5">{d.use}</td></tr>))}</tbody>
              </table>
            </div>
            <div className="ds-card ds-scroll">
              <table className="ds-table">
                <thead><tr><th>Easing</th><th>Curve</th><th>Use</th></tr></thead>
                <tbody>{easings.map((d) => (<tr key={d.token}><td><code>{d.token}</code></td><td className="type-b5">{d.value}</td><td className="type-b5">{d.use}</td></tr>))}</tbody>
              </table>
            </div>
          </Stack>
        </section>

        <section className="ds-section">
          <header>
            <span className="ds-tier-badge type-d2">TIER 2 · Role</span>
            <h2 className="type-h4" style={{ marginTop: 12 }}>Motion roles</h2>
          </header>
          <div className="ds-card ds-scroll">
            <table className="ds-table">
              <thead><tr><th>Role token</th><th>Maps to</th><th>Applied to</th></tr></thead>
              <tbody>{roles.map((d) => (<tr key={d.token}><td><code>{d.token}</code></td><td className="type-b5">{d.maps}</td><td className="type-b5">{d.use}</td></tr>))}</tbody>
            </table>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
