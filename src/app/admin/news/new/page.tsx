import Link from "next/link";
import AdminForm from "@/components/AdminForm";

export default function NewNewsPage() {
  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Додати новину</span>
        <Link href="/admin/news" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action="/api/news"
            method="POST"
            redirectTo="/admin/news"
            submitLabel="Опублікувати"
            initialValues={{ status: "published", publishedAt: new Date().toISOString().split("T")[0] }}
            fields={[
              { name: "title",       label: "Заголовок",         required: true },
              { name: "slug",        label: "Slug (URL)",        required: true, half: true, placeholder: "napр. new-bleach-arc" },
              { name: "publishedAt", label: "Дата публікації",   required: true, half: true },
              { name: "summary",     label: "Короткий опис",     required: true, type: "textarea", rows: 3 },
              { name: "body",        label: "Повний текст",      required: true, type: "textarea", rows: 8 },
              { name: "image",       label: "Зображення",        type: "image" },
              { name: "status",      label: "Статус",            type: "select", options: [{ value: "published", label: "Опубліковано" }, { value: "draft", label: "Чернетка" }] },
            ]}
          />
        </div>
      </div>
    </>
  );
}
