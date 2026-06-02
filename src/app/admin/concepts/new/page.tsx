import Link from "next/link";
import AdminForm from "@/components/AdminForm";

export default function NewConceptPage() {
  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Додати статтю</span>
        <Link href="/admin/concepts" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action="/api/concepts"
            method="POST"
            redirectTo="/admin/concepts"
            submitLabel="Додати статтю"
            initialValues={{ status: "published", sortOrder: 1, icon: "📖" }}
            fields={[
              { name: "title",     label: "Назва",              required: true, half: true },
              { name: "slug",      label: "Slug (URL)",         required: true, half: true, placeholder: "napр. zanpakuto" },
              { name: "category",  label: "Категорія",          required: true, half: true, placeholder: "напр. Зброя" },
              { name: "icon",      label: "Іконка (emoji)",                     half: true, placeholder: "напр. ⚔️" },
              { name: "sortOrder", label: "Порядок",            type: "number" },
              { name: "shortDesc", label: "Короткий опис",      required: true, type: "textarea", rows: 2 },
              { name: "body",      label: "Повний текст",       required: true, type: "textarea", rows: 8 },
              { name: "status",    label: "Статус",             type: "select", options: [{ value: "published", label: "Опубліковано" }, { value: "draft", label: "Чернетка" }] },
            ]}
          />
        </div>
      </div>
    </>
  );
}
