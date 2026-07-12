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

const WEEKDAY_KR = ["일", "월", "화", "수", "목", "금", "토"];

/** 조율 기간(YYYY-MM-DD ~ YYYY-MM-DD)에서 평일 컬럼을 생성한다.
 *  주말은 제외, 최대 maxDays개, 지난 일자는 past=true로 표시(히트맵 disabled). */
export function buildWeek(startIso: string, endIso: string, maxDays = 7): DayCol[] {
  const out: DayCol[] = [];
  const cur = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  if (isNaN(cur.getTime()) || isNaN(end.getTime()) || end < cur) return WEEK;
  while (cur <= end && out.length < maxDays) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) {
      const iso = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
      out.push({ key: iso, weekday: WEEKDAY_KR[dow], iso, label: `${cur.getMonth() + 1}/${cur.getDate()}`, past: iso < TODAY_ISO });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return out.length > 0 ? out : WEEK;
}

export const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 09:00–18:00
export const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

export const RANGE_LABEL = "이번 주 평일 (7/13–7/17)";

export const MEETING = {
  title: "3분기 킥오프 미팅",
  organizer: "김서연",
  duration: "1시간",
  range: RANGE_LABEL,
  dday: 2,
  total: 6, // 주최자가 조율하는 동료 6명 (덱의 "6명의 동료"와 일치)
};
