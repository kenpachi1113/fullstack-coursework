import Link from "next/link";
import { db } from "@/lib/store";
import DeleteButton from "@/components/DeleteButton";
import AddGalleryForm from "./AddGalleryForm";

export default async function AdminGalleryPage() {
  const store = await db.getAll();
  const gallery = store.gallery;
  const characters = store.characters;

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Галерея</span>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap" style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--white)", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #2a2a2a" }}>
            Додати зображення
          </div>
          <AddGalleryForm characters={characters.map((c) => ({ id: c.id, name: c.name }))} />
        </div>

        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Персонаж</th>
                <th>Дата</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.title}</td>
                  <td>{item.characterName ?? "—"}</td>
                  <td>{item.createdAt}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <Link href={`/admin/gallery/${item.id}/edit`} className="btn btn-outline btn-sm">Редагувати</Link>
                    <DeleteButton url={`/api/gallery/${item.id}`} redirectTo="/admin/gallery" />
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
