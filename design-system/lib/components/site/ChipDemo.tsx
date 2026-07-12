"use client";

import { useState } from "react";
import { Chip } from "@/lib/components/ui/Chip";
import { Inline } from "@/lib/components/layout/Inline";

const people = ["김서연", "이준호", "박민지", "정우성", "한지원", "오세훈"];

export function ChipDemo() {
  const [picked, setPicked] = useState<string[]>(["김서연", "박민지"]);
  const toggle = (p: string) =>
    setPicked((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  return (
    <Inline gap="sm" wrap>
      {people.map((p) => (
        <Chip key={p} selected={picked.includes(p)} onClick={() => toggle(p)}>{p}</Chip>
      ))}
    </Inline>
  );
}
