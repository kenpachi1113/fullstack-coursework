import Link from "next/link";
import { db } from "@/lib/store";

export const metadata = { title: "Дашборд — Bleach Admin" };

export default async function AdminPage() {
  const { characters, arcs, news, gallery, concepts } = await db.getAll();

  const stats = [
    { icon: "⚔️", label: "Персонажі", value: characters.length, href: "/admin/characters" },
    { icon: "📖", label: "Арки", value: arcs.length, href: "/admin/arcs" },
    { icon: "📰", label: "Новини", value: news.length, href: "/admin/news" },
    { icon: "🖼️", label: "Галерея", value: gallery.length, href: "/admin/gallery" },
    { icon: "📚", label: "Вікі", value: concepts.length, href: "/admin/concepts" },
  ];

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Дашборд</span>
      </div>
      <div className="admin-content">
        <div className="stats-grid">
          {stats.map((s) => (
            <Link key={s.href} href={s.href} className="stat-card">
              <div className="stat-card-icon">{s.icon}</div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-label">{s.label}</div>
            </Link>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Recent characters */}
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <h2>Останні персонажі</h2>
              <Link href="/admin/characters" style={{ fontSize: ".85rem", color: "var(--orange)" }}>Всі →</Link>
            </div>
            <table>
              <tbody>
                {characters.slice(0, 5).map((c) => (
                  <tr key={c.id}>
                    <td><div className="table-placeholder">⚔️</div></td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: ".9rem" }}>{c.name}</div>
                      <div style={{ fontSize: ".8rem", color: "#555" }}>{c.faction}</div>
                    </td>
                    <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent news */}
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <h2>Останні новини</h2>
              <Link href="/admin/news" style={{ fontSize: ".85rem", color: "var(--orange)" }}>Всі →</Link>
            </div>
            <table>
              <tbody>
                {news.slice(0, 5).map((n) => (
                  <tr key={n.id}>
                    <td><div className="table-placeholder">📰</div></td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: ".9rem" }}>{n.title}</div>
                      <div style={{ fontSize: ".8rem", color: "#555" }}>{n.publishedAt}</div>
                    </td>
                    <td><span className={`status-badge status-${n.status}`}>{n.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
