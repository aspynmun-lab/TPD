import Link from "next/link";

/** Demo-only navigator. The real product is link-based (invite / admin links);
 *  this lets reviewers jump between screens. */
export function DemoNav() {
  const links = [
    { href: "/", label: "랜딩" },
    { href: "/host", label: "주최자" },
    { href: "/invite", label: "참여자" },
    { href: "/board", label: "현황보드" },
  ];
  const external = [
    { href: "https://github.com/aspynmun-lab/TPD", label: "GitHub" },
    { href: "https://design-system-pied-three.vercel.app", label: "디자인시스템" },
  ];
  const itemStyle = { padding: "6px 10px", borderRadius: "var(--radius-full)", color: "var(--color-text-secondary)" } as const;
  return (
    <nav
      style={{
        position: "fixed", right: 16, bottom: 16, zIndex: 40,
        display: "flex", alignItems: "center", gap: 4,
        padding: "6px 8px", borderRadius: "var(--radius-full)",
        background: "var(--color-bg-surface)", border: "1px solid var(--color-border-default)",
        boxShadow: "var(--shadow-elevation-mid)",
      }}
    >
      <span className="type-d2" style={{ color: "var(--color-text-tertiary)", padding: "0 6px" }}>DEMO</span>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="type-d1" style={itemStyle}>
          {l.label}
        </Link>
      ))}
      <span aria-hidden style={{ width: 1, height: 16, background: "var(--color-border-default)", margin: "0 2px" }} />
      {external.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="type-d1" style={itemStyle}>
          {l.label} ↗
        </a>
      ))}
    </nav>
  );
}
