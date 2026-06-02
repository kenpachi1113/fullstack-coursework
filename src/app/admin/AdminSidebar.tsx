"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Загальне", type: "label" },
  { href: "/admin", icon: "📊", label: "Дашборд" },
  { label: "Контент", type: "label" },
  { href: "/admin/characters", icon: "⚔️", label: "Персонажі" },
  { href: "/admin/arcs", icon: "📖", label: "Арки" },
  { href: "/admin/news", icon: "📰", label: "Новини" },
  { href: "/admin/gallery", icon: "🖼️", label: "Галерея" },
  { href: "/admin/concepts", icon: "📚", label: "Вікі" },
  { label: "Сайт", type: "label" },
  { href: "/", icon: "🌐", label: "Переглянути сайт", external: true },
];

const sidebarStyle: React.CSSProperties = {
  width: 240,
  background: "#000",
  borderRight: "1px solid #1e1e1e",
  flexShrink: 0,
  position: "sticky",
  top: 0,
  height: "100vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside style={sidebarStyle}>
      <div style={{ padding: "24px 20px", borderBottom: "1px solid #1e1e1e", fontSize: "1.2rem", fontWeight: 900, letterSpacing: 1 }}>
        BLEACH<span style={{ color: "var(--orange)" }}>.</span>ADMIN
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {navItems.map((item, i) => {
          if (item.type === "label") {
            return (
              <div key={i} style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#555", padding: "8px 8px 4px", marginTop: i > 0 ? 12 : 0 }}>
                {item.label}
              </div>
            );
          }
          const active = isActive(item.href!);
          return (
            <Link
              key={item.href}
              href={item.href!}
              target={item.external ? "_blank" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 6,
                color: active ? "var(--orange)" : "#888",
                background: active ? "#1e1e1e" : "transparent",
                fontSize: ".9rem",
                marginBottom: 2,
                transition: "background .15s, color .15s",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "1.1rem", width: 20, textAlign: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 6,
            color: "#888",
            background: "transparent",
            fontSize: ".9rem",
            marginTop: 2,
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "background .15s, color .15s",
          }}
        >
          <span style={{ fontSize: "1.1rem", width: 20, textAlign: "center" }}>🚪</span>
          <span>Вийти</span>
        </button>
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid #1e1e1e", fontSize: ".85rem", color: "#555" }}>
        <strong style={{ color: "#888", display: "block" }}>admin</strong>
        Адміністратор
      </div>
    </aside>
  );
}
