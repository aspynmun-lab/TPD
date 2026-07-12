/* Demo scheduling context. In the real product these come from the meeting record.
 * "오늘"을 고정해 SSR/CSR 하이드레이션 불일치를 피하고, 지난 일자 disabled 데모를 보장한다. */

export const TODAY_ISO = "2026-07-15"; // 데모 기준 오늘 (수)

export interface DayCol {
  key: string;      // stable id
  weekday: string;  // 월~금
  iso: string;      // YYYY-MM-DD
  label: string;    // 7/15
  past: boolean;    // 오늘 이전 → 히트맵/입력 disabled
}

// 이번 주 평일 (7/13 월 ~ 7/17 금). 오늘=7/15 → 7/13·7/14 지난 일자.
const RAW: [string, string, string][] = [
  ["월", "2026-07-13", "7/13"],
  ["화", "2026-07-14", "7/14"],
  ["수", "2026-07-15", "7/15"],
  ["목", "2026-07-16", "7/16"],
  ["금", "2026-07-17", "7/17"],
];

export const WEEK: DayCol[] = RAW.map(([weekday, iso, label]) => ({
  key: iso,
  weekday,
  iso,
  label,
  past: iso < TODAY_ISO,
}));

export const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 09:00–18:00
export const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

export const RANGE_LABEL = "이번 주 평일 (7/13–7/17)";

export const MEETING = {
  title: "3분기 킥오프 미팅",
  organizer: "김서연",
  duration: "1시간",
  range: RANGE_LABEL,
  dday: 2,
  total: 8,
};
