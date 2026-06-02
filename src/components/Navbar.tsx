"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Головна" },
  { href: "/characters", label: "Персонажі" },
  { href: "/arcs", label: "Арки" },
  { href: "/wiki", label: "Вікі" },
  { href: "/gallery", label: "Галерея" },
  { href: "/news", label: "Новини" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: "#000", borderBottom: "2px solid var(--orange)", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: 2, color: "var(--white)", textDecoration: "none" }}>
          BLEACH<span style={{ color: "var(--orange)" }}>.</span>Portal
        </Link>

        <nav style={{ display: "flex", gap: 4 }} className="hidden-mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? "var(--orange)" : "var(--gray)",
                padding: "8px 14px",
                borderRadius: "var(--radius)",
                fontSize: ".95rem",
                background: pathname === link.href ? "var(--bg3)" : "transparent",
                transition: "background .2s, color .2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
            Адмін
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
          className="hamburger-btn"
          aria-label="Меню"
        >
          <svg width="24" height="24" fill="none" stroke="var(--white)" strokeWidth="2" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <nav style={{ background: "#000", borderBottom: "1px solid var(--border)", padding: "12px 20px" }}>
          {[...links, { href: "/admin", label: "Адмін" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 14px", color: pathname === link.href ? "var(--orange)" : "var(--gray)", borderRadius: "var(--radius)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
