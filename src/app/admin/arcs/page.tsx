import Link from "next/link";
import { db } from "@/lib/store";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminArcsPage() {
  const store = await db.getAll();
  const arcs = store.arcs.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Арки</span>
        <Link href="/admin/arcs/new" className="btn btn-primary btn-sm">+ Додати</Link>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Назва</th>
                <th>Епізоди</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {arcs.map((arc) => (
                <tr key={arc.id}>
                  <td style={{ fontWeight: 700, color: "var(--orange)", width: 48 }}>{arc.sortOrder}</td>
                  <td style={{ fontWeight: 600 }}>{arc.title}</td>
                  <td>{arc.episodes}</td>
                  <td><span className={`status-badge status-${arc.status}`}>{arc.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Link href={`/admin/arcs/${arc.id}/edit`} className="btn btn-sm btn-outline" style={{ padding: "4px 12px", fontSize: ".8rem" }}>Ред.</Link>
                      <DeleteButton url={`/api/arcs/${arc.id}`} redirectTo="/admin/arcs" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
