import { notFound } from "next/navigation";
import Link from "next/link";
import AdminForm from "@/components/AdminForm";
import { db } from "@/lib/store";

interface Props { params: Promise<{ id: string }> }

export default async function EditConceptPage({ params }: Props) {
  const { id } = await params;
  const store = await db.getAll();
  const concept = store.concepts.find((c) => c.id === Number(id));
  if (!concept) notFound();

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Редагувати: {concept.title}</span>
        <Link href="/admin/concepts" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action={`/api/concepts/${concept.id}`}
            method="PUT"
            redirectTo="/admin/concepts"
            submitLabel="Зберегти зміни"
            initialValues={concept as unknown as Record<string, string | number>}
            fields={[
              { name: "title",     label: "Назва",         required: true, half: true },
              { name: "slug",      label: "Slug (URL)",    required: true, half: true },
              { name: "category",  label: "Категорія",     required: true, half: true },
              { name: "icon",      label: "Іконка (emoji)",                half: true },
              { name: "sortOrder", label: "Порядок",       type: "number" },
              { name: "shortDesc", label: "Короткий опис", required: true, type: "textarea", rows: 2 },
              { name: "body",      label: "Повний текст",  required: true, type: "textarea", rows: 8 },
              { name: "status",    label: "Статус",        type: "select", options: [{ value: "published", label: "Опубліковано" }, { value: "draft", label: "Чернетка" }] },
            ]}
          />
        </div>
      </div>
    </>
  );
}
