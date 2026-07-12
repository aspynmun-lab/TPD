"use client";

import { useState } from "react";
import { PreferenceScale } from "@/lib/components/product/PreferenceScale";
import type { PreferenceKey } from "@/lib/product/preference";

export function PreferenceDemo() {
  const [value, setValue] = useState<PreferenceKey | null>("good");
  return <PreferenceScale value={value} onChange={setValue} />;
}
