import { PageContainer } from "@/lib/components/layout/PageContainer";
import { Stack } from "@/lib/components/layout/Stack";
import { Column, Col } from "@/lib/components/layout/Column";
import { CandidateCard } from "@/lib/components/product/CandidateCard";
import { BurdenMeter } from "@/lib/components/product/BurdenMeter";

export const metadata = { title: "Coordination · TPD Design System" };

export default function CoordinationPage() {
  return (
    <PageContainer>
      <Stack gap="xl">
        <header>
          <span className="ds-eyebrow type-d1">Components · TIER 3</span>
          <h1 className="type-h2" style={{ marginTop: 8 }}>Coordination</h1>
          <p className="ds-lead type-b3">
            주최자는 후보 시간을 먼저 정하지 않습니다. 응답이 모이면 시스템이 <strong>부담이 가장 적은</strong> 후보를 계산합니다.
            개인 응답은 끝까지 비공개이고, <strong>집계 수치</strong>(참석 가능·부담 인원)만 보여줍니다.
          </p>
        </header>

        <section className="ds-section">
          <header><h2 className="type-h4">CandidateCard</h2><p className="ds-lead type-b4">추천(부담 최소)은 그라디언트 액센트로 강조. hover 시 떠오릅니다.</p></header>
          <Column>
            <Col span={4}><CandidateCard when="화 14:00–15:00" total={6} available={6} burden={1} recommended /></Col>
            <Col span={4}><CandidateCard when="수 11:00–12:00" total={6} available={5} burden={2} /></Col>
            <Col span={4}><CandidateCard when="목 16:00–17:00" total={6} available={6} burden={3} /></Col>
          </Column>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">확정 상태</h2></header>
          <Column>
            <Col span={6}><CandidateCard when="화 14:00–15:00" total={6} available={6} burden={1} confirmed /></Col>
          </Column>
        </section>

        <section className="ds-section">
          <header><h2 className="type-h4">BurdenMeter</h2><p className="ds-lead type-b4">집계만 — 누가/왜는 표시하지 않습니다.</p></header>
          <div className="ds-card">
            <Stack gap="lg">
              <BurdenMeter total={6} burden={1} />
              <BurdenMeter total={6} burden={3} />
              <BurdenMeter total={6} burden={5} />
            </Stack>
          </div>
        </section>
      </Stack>
    </PageContainer>
  );
}
