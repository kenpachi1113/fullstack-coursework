import Link from "next/link";
import AdminForm from "@/components/AdminForm";

export default function NewArcPage() {
  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Додати арку</span>
        <Link href="/admin/arcs" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action="/api/arcs"
            method="POST"
            redirectTo="/admin/arcs"
            submitLabel="Додати арку"
            initialValues={{ status: "published", sortOrder: 1 }}
            fields={[
              { name: "title",       label: "Назва",              required: true, half: true },
              { name: "slug",        label: "Slug (URL)",         required: true, half: true, placeholder: "napр. soul-society-arc" },
              { name: "episodes",    label: "Епізоди",            required: true, half: true, placeholder: "напр. 1–63" },
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
