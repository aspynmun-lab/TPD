/* Confirmed spec: preference is 4 levels (never binary).
 * 불가 / 부담 / 괜찮음 / 좋음 — unavailable / burdensome / okay / good. */

export type PreferenceKey = "unavailable" | "burden" | "okay" | "good";

export interface PreferenceLevel {
  key: PreferenceKey;
  label: string;   // Korean label shown to users
  desc: string;
}

export const PREFERENCE_LEVELS: PreferenceLevel[] = [
  { key: "unavailable", label: "불가", desc: "그 시간은 안 됩니다" },
  { key: "burden", label: "부담", desc: "가능하지만 무리입니다" },
  { key: "okay", label: "괜찮음", desc: "괜찮은 시간입니다" },
  { key: "good", label: "좋음", desc: "가장 좋은 시간입니다" },
];
