import Link from "next/link";
import { db } from "@/lib/store";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminCharactersPage() {
  const store = await db.getAll();
  const characters = store.characters;

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Персонажі</span>
        <Link href="/admin/characters/new" className="btn btn-primary btn-sm">+ Додати</Link>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Ім&apos;я</th>
                <th>Фракція</th>
                <th>Занпакуто</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((char) => (
                <tr key={char.id}>
                  <td><div className="table-placeholder">⚔️</div></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{char.name}</div>
                    <div style={{ fontSize: ".8rem", color: "#555" }}>{char.japaneseName}</div>
                  </td>
                  <td>{char.faction}</td>
                  <td>{char.zanpakuto}</td>
                  <td><span className={`status-badge status-${char.status}`}>{char.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Link href={`/admin/characters/${char.id}/edit`} className="btn btn-sm btn-outline" style={{ padding: "4px 12px", fontSize: ".8rem" }}>Ред.</Link>
                      <DeleteButton url={`/api/characters/${char.id}`} redirectTo="/admin/characters" />
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
