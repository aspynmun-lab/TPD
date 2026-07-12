"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { PreferenceScale } from "./PreferenceScale";
import { TimeSlotCell } from "./TimeSlotCell";
import { Stack } from "@/lib/components/layout/Stack";
import type { PreferenceKey } from "@/lib/product/preference";

const DAYS = ["월", "화", "수", "목", "금"];
const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

/**
 * Timetable where a participant paints preference by dragging. The brush is a
 * PreferenceScale (4 levels). Confirmed spec input pattern.
 */
export function AvailabilityGrid() {
  const [brush, setBrush] = useState<PreferenceKey>("good");
  const [cells, setCells] = useState<Record<string, PreferenceKey>>({});
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    const stop = () => setPainting(false);
    window.addEventListener("mouseup", stop);
    return () => window.removeEventListener("mouseup", stop);
  }, []);

  const paint = useCallback((key: string) => {
    setCells((prev) => ({ ...prev, [key]: brush }));
  }, [brush]);

  return (
    <Stack gap="md">
      <div>
        <span className="type-d1" style={{ color: "var(--color-text-tertiary)", display: "block", marginBottom: 8 }}>
          브러시 — 원하는 강도를 고르고, 아래 표를 드래그해 칠하세요
        </span>
        <PreferenceScale value={brush} onChange={setBrush} showDesc={false} />
      </div>

      <div
        className="ds-grid"
        style={{ gridTemplateColumns: `56px repeat(${DAYS.length}, 1fr)` }}
        onMouseLeave={() => setPainting(false)}
      >
        <span aria-hidden />
        {DAYS.map((d) => (
          <span key={d} className="ds-grid-head type-d1">{d}</span>
        ))}
        {TIMES.map((t) => (
          <Fragment key={t}>
            <span className="ds-grid-time type-d2" style={{ alignSelf: "center" }}>{t}</span>
            {DAYS.map((d) => {
              const key = `${d}-${t}`;
              return (
                <TimeSlotCell
                  key={key}
                  level={cells[key]}
                  label={`${d} ${t}`}
                  onMouseDown={() => { setPainting(true); paint(key); }}
                  onMouseEnter={() => { if (painting) paint(key); }}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </Stack>
  );
}
