import Link from "next/link";

/** Demo-only navigator. The real product is link-based (invite / admin links);
 *  this lets reviewers jump between screens. */
export function DemoNav() {
  const links = [
    { href: "/create", label: "회의 생성" },
    { href: "/", label: "가능 입력" },
    { href: "/board", label: "현황보드" },
  ];
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
        <Link key={l.href} href={l.href} className="type-d1"
          style={{ padding: "6px 10px", borderRadius: "var(--radius-full)", color: "var(--color-text-secondary)" }}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
