"use client";

import { useState } from "react";
import { Stack } from "@/lib/components/layout/Stack";
import { Inline } from "@/lib/components/layout/Inline";
import { Select } from "@/lib/components/ui/Select";
import { DatePicker } from "@/lib/components/ui/DatePicker";

export function FormDemos() {
  const [sel, setSel] = useState("60");
  const [date, setDate] = useState("2026-07-15");
  return (
    <Stack gap="lg">
      <div className="ds-card">
        <Stack gap="sm">
          <span className="type-s3">Select</span>
          <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>커스텀 리스트박스 — 네이티브 select 대체, 토큰 스타일.</span>
          <Select
            value={sel}
            onChange={setSel}
            options={[
              { value: "30", label: "30분" },
              { value: "60", label: "1시간" },
              { value: "90", label: "1시간 30분" },
              { value: "120", label: "2시간" },
            ]}
          />
        </Stack>
      </div>
      <div className="ds-card">
        <Stack gap="sm">
          <span className="type-s3">DatePicker</span>
          <span className="type-b5" style={{ color: "var(--color-text-tertiary)" }}>커스텀 캘린더 — minDate 이전 날짜는 disabled. 자유입력 불가.</span>
          <Inline gap="md" align="center">
            <DatePicker value={date} onChange={setDate} minDate="2026-07-15" />
            <span className="type-b5" style={{ color: "var(--color-text-secondary)" }}>선택: {date}</span>
          </Inline>
        </Stack>
      </div>
    </Stack>
  );
}
