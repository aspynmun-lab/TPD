/* Component inventory for the TPD scheduling product.
 * DERIVED from the confirmed UX foundation (UXFront.pdf) + the Kairo reference
 * component set. This is a PROPOSAL pending the actual 기능정책서 IA flowchart —
 * flows and component lists should be confirmed/adjusted against it.
 *
 * status: "done" | "reuse" (port from reference) | "new" (product-specific) */

export type CompStatus = "done" | "reuse" | "new";

export interface CompItem {
  name: string;
  status: CompStatus;
  from: string;   // reference origin or "신규"
  note: string;   // role/token or UX-principle note
}
export interface FlowGroup {
  flow: string;        // IA step / screen
  intent: string;      // what the user does here
  items: CompItem[];
}

export const inventory: FlowGroup[] = [
  {
    flow: "0 · 공통 (Global)",
    intent: "모든 화면에서 쓰이는 기반 요소",
    items: [
      { name: "Button", status: "done", from: "Atoms/Button", note: "TIER3 완료 · role→token 매핑 레퍼런스" },
      { name: "Text", status: "reuse", from: "Atoms/Text", note: "type-* 토큰 사용" },
      { name: "Icon", status: "reuse", from: "Atoms/Icon", note: "icon-* role 색상" },
      { name: "Navbar", status: "reuse", from: "Organisms/Navbar", note: "bg-surface / border-default" },
      { name: "Toast", status: "reuse", from: "Molecules/Toast", note: "semantic-* + motion-feedback (등장)" },
      { name: "Modal", status: "reuse", from: "Molecules/Modal", note: "surface radius + motion-enter" },
      { name: "Tooltip", status: "reuse", from: "Atoms/Tooltip", note: "bg-inverse / text-inverse" },
      { name: "Spinner / Skeleton", status: "reuse", from: "Atoms/Spinner·Skeleton", note: "로딩 상태" },
      { name: "EmptyState", status: "reuse", from: "Atoms/EmptyState", note: "미팅 없음 등 빈 화면" },
    ],
  },
  {
    flow: "1 · 미팅 생성 (Organizer)",
    intent: "제목·소요시간·후보 기간·참석자를 정해 미팅 요청 생성",
    items: [
      { name: "FormField", status: "reuse", from: "Molecules/FormField", note: "라벨+입력+에러(text-error)" },
      { name: "TextField", status: "reuse", from: "Atoms/TextField", note: "제목/설명 입력" },
      { name: "Dropdown", status: "reuse", from: "Molecules/Dropdown", note: "소요시간(30/60분) 선택" },
      { name: "DatePicker", status: "reuse", from: "Molecules/DatePicker", note: "후보 기간(주) 선택" },
      { name: "Chip", status: "reuse", from: "Atoms/Chip", note: "선택된 후보일 태그" },
    ],
  },
  {
    flow: "2 · 참석자 & 중요도",
    intent: "참석자 추가 + must / optional / not-coming 구분·우선순위 (Desk 2)",
    items: [
      { name: "SearchBar", status: "reuse", from: "Molecules/SearchBar", note: "동료 검색·추가" },
      { name: "Avatar", status: "reuse", from: "Atoms/Avatar", note: "참석자 표시" },
      { name: "ParticipantRow", status: "new", from: "신규", note: "Avatar+이름+중요도 셀렉터 조합" },
      { name: "ImportanceSelector", status: "new", from: "신규", note: "must/optional/not-coming · brand-secondary 강조, Radio 기반" },
      { name: "Radio / Checkbox", status: "reuse", from: "Atoms/Radio·Checkbox", note: "중요도 단일선택" },
      { name: "StatusBadge", status: "reuse", from: "Atoms/StatusBadge", note: "응답/미응답 상태" },
    ],
  },
  {
    flow: "3 · 선호 입력 (참석자별)",
    intent: "시간대별 선호 '강도' 입력 — 가능/불가 이분법 지양, 수정 가능 (Desk 1·5, HMW)",
    items: [
      { name: "PreferenceIntensityScale", status: "new", from: "신규", note: "핵심 · 4단계 강도(안돼요→완전좋아요) · motion-select 팝 · brand teal 스케일" },
      { name: "AvailabilityGrid", status: "new", from: "신규", note: "핵심 · 시간×날짜 그리드에 강도 페인팅 (드래그)" },
      { name: "TimeSlotCell", status: "new", from: "신규", note: "그리드 셀 · 강도별 teal-100~700 배경" },
      { name: "Tab", status: "reuse", from: "Molecules/Tab", note: "주/일 뷰 전환" },
      { name: "ProgressBar", status: "reuse", from: "Atoms/ProgressBar", note: "입력 완성도" },
    ],
  },
  {
    flow: "4 · 조율 / 비교 뷰",
    intent: "집계된 선호 히트맵·후보 비교·추천 + 추천 이유 제시 (Desk 3·4)",
    items: [
      { name: "PreferenceHeatmap", status: "new", from: "신규", note: "핵심 · 집계 강도 히트맵(참석자×시간)" },
      { name: "ProposalCard", status: "new", from: "신규", note: "추천 후보 카드 · surface radius + motion-raise" },
      { name: "OptionCompare", status: "new", from: "신규", note: "후보 2~3개 나란히 비교" },
      { name: "RecommendationRationale", status: "new", from: "신규", note: "필수(UX원칙4) · 추천 '이유' 설명 · motion-explain 강조" },
      { name: "BurdenBalanceIndicator", status: "new", from: "신규", note: "핵심 · 부담 분산 게이지 (특정인 쏠림 방지 시각화)" },
      { name: "WBSCalendar", status: "reuse", from: "Organisms/WBSCalendar", note: "캘린더 맥락 표시" },
      { name: "Accordion", status: "reuse", from: "Molecules/Accordion", note: "상세 근거 접기/펼치기" },
    ],
  },
  {
    flow: "5 · 제안 → 수정 루프",
    intent: "재제안·참석자 조정/철회 — 주최자 독점 아닌 분산형 (Rhythm of Work)",
    items: [
      { name: "UpdateRow", status: "reuse", from: "Molecules/UpdateRow", note: "누가 무엇을 바꿨는지 로그" },
      { name: "ChatBubble", status: "reuse", from: "Molecules/ChatBubble", note: "코멘트/이견" },
      { name: "Toast", status: "reuse", from: "Molecules/Toast", note: "변경 반영 알림" },
      { name: "Button (secondary)", status: "done", from: "Atoms/Button", note: "재제안/철회 · orange secondary" },
    ],
  },
  {
    flow: "6 · 결정 / 확정 · 공유",
    intent: "최종 시간 확정 및 공유",
    items: [
      { name: "ProposalCard (confirmed)", status: "new", from: "신규", note: "확정 상태 · semantic-success 강조" },
      { name: "Modal", status: "reuse", from: "Molecules/Modal", note: "확정 확인" },
      { name: "StatusBadge", status: "reuse", from: "Atoms/StatusBadge", note: "확정/대기" },
    ],
  },
  {
    flow: "7 · 대시보드 / 상태",
    intent: "내 미팅 목록·진행 상태·부담 현황 개요",
    items: [
      { name: "OverviewSection", status: "reuse", from: "Organisms/OverviewSection", note: "요약 섹션" },
      { name: "Widget / QuickWidget", status: "reuse", from: "Organisms/Widget·QuickWidget", note: "지표 위젯" },
      { name: "ProgressCard", status: "reuse", from: "Molecules/ProgressCard", note: "조율 진행률" },
      { name: "TaskCard / NextAction", status: "reuse", from: "Molecules/TaskCard·NextAction", note: "해야 할 응답 유도" },
      { name: "UpdatesSection", status: "reuse", from: "Organisms/UpdatesSection", note: "최근 변경" },
    ],
  },
];
