import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const groups: { label: string; links: { href: string; label: string }[] }[] = [
  {
    label: "Overview",
    links: [{ href: "/", label: "Introduction" }],
  },
  {
    label: "Foundations",
    links: [
      { href: "/foundations/colors", label: "Colors" },
      { href: "/foundations/typography", label: "Typography" },
      { href: "/foundations/spacing", label: "Spacing" },
      { href: "/foundations/radius", label: "Radius" },
      { href: "/foundations/shadow", label: "Shadow" },
      { href: "/foundations/layout", label: "Layout" },
    ],
  },
  {
    label: "Components",
    links: [{ href: "/components/button", label: "Button" }],
  },
];

export function Nav() {
  return (
    <nav>
      <div className="site-brand">
        <span className="type-s1 mark">TPD</span>
        <span className="type-d1 sub">Design System · Dark-first</span>
      </div>
      {groups.map((g) => (
        <div className="nav-group" key={g.label}>
          <div className="label type-d2">{g.label}</div>
          {g.links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link type-b5">
              {l.label}
            </Link>
          ))}
        </div>
      ))}
      <ThemeToggle />
    </nav>
  );
}
