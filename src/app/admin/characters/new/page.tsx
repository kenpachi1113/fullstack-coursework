import Link from "next/link";
import AdminForm from "@/components/AdminForm";
import { db } from "@/lib/store";

export default async function NewCharacterPage() {
  const store = await db.getAll();
  const factionOptions = store.factions.map((f) => ({ value: f.slug, label: f.name }));

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Додати персонажа</span>
        <Link href="/admin/characters" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action="/api/characters"
            method="POST"
            redirectTo="/admin/characters"
            submitLabel="Додати персонажа"
            initialValues={{ status: "published", factionSlug: "shinigami" }}
            fields={[
              { name: "name",         label: "Ім'я",           required: true, half: true, placeholder: "напр. Іккаку Мадараме" },
              { name: "japaneseName", label: "Японська назва",                 half: true, placeholder: "напр. 斑目 一角" },
              { name: "slug",         label: "Slug (URL)",     required: true,             placeholder: "napр. ikkaku-madarame" },
              { name: "description",  label: "Опис",           required: true, type: "textarea", rows: 5 },
              { name: "abilities",    label: "Здібності",      required: true, type: "textarea", rows: 3 },
              { name: "squad",        label: "Загін",                          half: true, placeholder: "напр. 11-й загін" },
              { name: "rank",         label: "Звання / Ранг",                  half: true, placeholder: "напр. Капітан 11-го загону" },
              { name: "zanpakuto",    label: "Занпакуто",      required: true, half: true },
              { name: "bankai",       label: "Банкай",                         half: true, placeholder: "назва Банкаю" },
              { name: "factionSlug",  label: "Фракція",        type: "select", half: true, options: factionOptions },
              { name: "status",       label: "Статус",         type: "select", half: true, options: [{ value: "published", label: "Опублікований" }, { value: "draft", label: "Чернетка" }] },
              { name: "image",        label: "Зображення",     type: "image" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
