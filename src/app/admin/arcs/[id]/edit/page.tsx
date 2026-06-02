import { notFound } from "next/navigation";
import Link from "next/link";
import AdminForm from "@/components/AdminForm";
import { db } from "@/lib/store";

interface Props { params: Promise<{ id: string }> }

export default async function EditArcPage({ params }: Props) {
  const { id } = await params;
  const store = await db.getAll();
  const arc = store.arcs.find((a) => a.id === Number(id));
  if (!arc) notFound();

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Редагувати: {arc.title}</span>
        <Link href="/admin/arcs" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action={`/api/arcs/${arc.id}`}
            method="PUT"
            redirectTo="/admin/arcs"
            submitLabel="Зберегти зміни"
            initialValues={arc as unknown as Record<string, string | number>}
            fields={[
              { name: "title",       label: "Назва",              required: true, half: true },
              { name: "slug",        label: "Slug (URL)",         required: true, half: true },
              { name: "episodes",    label: "Епізоди",            required: true, half: true },
              { name: "sortOrder",   label: "Порядок сортування", type: "number", half: true },
              { name: "description", label: "Опис",               required: true, type: "textarea", rows: 6 },
              { name: "status",      label: "Статус",             type: "select", options: [{ value: "published", label: "Опублікована" }, { value: "draft", label: "Чернетка" }] },
            ]}
          />
        </div>
      </div>
    </>
  );
}
