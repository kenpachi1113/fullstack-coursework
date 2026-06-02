import { notFound } from "next/navigation";
import Link from "next/link";
import AdminForm from "@/components/AdminForm";
import { db } from "@/lib/store";

interface Props { params: Promise<{ id: string }> }

export default async function EditCharacterPage({ params }: Props) {
  const { id } = await params;
  const store = await db.getAll();
  const char = store.characters.find((c) => c.id === Number(id));
  if (!char) notFound();

  const factionOptions = store.factions.map((f) => ({ value: f.slug, label: f.name }));

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Редагувати: {char.name}</span>
        <Link href="/admin/characters" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          <AdminForm
            action={`/api/characters/${char.id}`}
            method="PUT"
            redirectTo="/admin/characters"
            submitLabel="Зберегти зміни"
            initialValues={char as unknown as Record<string, string | number>}
            fields={[
              { name: "name",         label: "Ім'я",           required: true, half: true },
              { name: "japaneseName", label: "Японська назва",                 half: true },
              { name: "slug",         label: "Slug (URL)",     required: true },
              { name: "description",  label: "Опис",           required: true, type: "textarea", rows: 5 },
              { name: "abilities",    label: "Здібності",      required: true, type: "textarea", rows: 3 },
              { name: "squad",        label: "Загін",                          half: true },
              { name: "rank",         label: "Звання / Ранг",                  half: true },
              { name: "zanpakuto",    label: "Занпакуто",      required: true, half: true },
              { name: "bankai",       label: "Банкай",                         half: true },
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
