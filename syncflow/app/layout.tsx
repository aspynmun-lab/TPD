import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SyncFlow — 회의 시간 조율",
  description: "가능/불가를 넘어 선호 강도까지 담는 6인 회의 시간 조율 서비스.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
