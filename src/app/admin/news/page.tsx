import Link from "next/link";
import { db } from "@/lib/store";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminNewsPage() {
  const store = await db.getAll();
  const newsList = store.news;

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Новини</span>
        <Link href="/admin/news/new" className="btn btn-primary btn-sm">+ Додати</Link>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.title}</td>
                  <td>{item.publishedAt}</td>
                  <td><span className={`status-badge status-${item.status}`}>{item.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Link href={`/admin/news/${item.id}/edit`} className="btn btn-sm btn-outline" style={{ padding: "4px 12px", fontSize: ".8rem" }}>Ред.</Link>
                      <DeleteButton url={`/api/news/${item.id}`} redirectTo="/admin/news" />
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
