import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/lib/components/site/Nav";

export const metadata: Metadata = {
  title: "SyncFlow Design System",
  description:
    "SyncFlow Design System — dark-first, 3-tier token architecture (Primitive → Role → Component). Teal/Orange/Grey palette, SUITE + Pretendard typography, Kairo-based layout system.",
};

// Runs before paint: dark is the default; only switch to light when explicitly stored.
const themeInit = `(function(){try{var t=localStorage.getItem('tpd-theme');document.documentElement.setAttribute('data-theme', t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <div className="site">
          <aside className="site-sidebar">
            <Nav />
          </aside>
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
