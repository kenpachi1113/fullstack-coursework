import Link from "next/link";
import { db } from "@/lib/store";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminConceptsPage() {
  const store = await db.getAll();
  const concepts = store.concepts.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Вікі</span>
        <Link href="/admin/concepts/new" className="btn btn-primary btn-sm">+ Додати</Link>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Назва</th>
                <th>Категорія</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {concepts.map((c) => (
                <tr key={c.id}>
                  <td><div className="table-placeholder">{c.icon}</div></td>
                  <td style={{ fontWeight: 600 }}>{c.title}</td>
                  <td>{c.category}</td>
                  <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Link href={`/admin/concepts/${c.id}/edit`} className="btn btn-sm btn-outline" style={{ padding: "4px 12px", fontSize: ".8rem" }}>Ред.</Link>
                      <DeleteButton url={`/api/concepts/${c.id}`} redirectTo="/admin/concepts" />
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
