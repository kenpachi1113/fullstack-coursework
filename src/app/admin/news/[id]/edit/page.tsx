import { notFound } from "next/navigation";
import Link from "next/link";
import AdminForm from "@/components/AdminForm";
import { db } from "@/lib/store";

interface Props { params: Promise<{ id: string }> }

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const store = await db.getAll();
  const item = store.news.find((n) => n.id === Number(id));
  if (!item) notFound();

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Редагувати новину</span>
        <Link href="/admin/news" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action={`/api/news/${item.id}`}
            method="PUT"
            redirectTo="/admin/news"
            submitLabel="Зберегти зміни"
            initialValues={item as unknown as Record<string, string | number>}
            fields={[
              { name: "title",       label: "Заголовок",       required: true },
              { name: "slug",        label: "Slug (URL)",      required: true, half: true },
              { name: "publishedAt", label: "Дата публікації", required: true, half: true },
              { name: "summary",     label: "Короткий опис",   required: true, type: "textarea", rows: 3 },
              { name: "body",        label: "Повний текст",    required: true, type: "textarea", rows: 8 },
              { name: "image",       label: "Зображення",      type: "image" },
              { name: "status",      label: "Статус",          type: "select", options: [{ value: "published", label: "Опубліковано" }, { value: "draft", label: "Чернетка" }] },
            ]}
          />
        </div>
      </div>
    </>
  );
}
