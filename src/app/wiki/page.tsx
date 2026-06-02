import Link from "next/link";
import { db } from "@/lib/store";

export const metadata = {
  title: "Вікі — Bleach Portal",
};

export default async function WikiPage() {
  const store = await db.getAll();
  const concepts = store.concepts
    .filter((c) => c.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const grouped: Record<string, typeof concepts> = {};
  for (const c of concepts) {
    if (!grouped[c.category]) grouped[c.category] = [];
    grouped[c.category].push(c);
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Вікі Bleach</h1>
          <p>Енциклопедія термінів, організацій та концепцій всесвіту</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} style={{ marginBottom: 56 }}>
              <div style={{ marginBottom: 24 }}>
                <h2 className="section-title">{category}</h2>
              </div>
              <div className="grid grid-3">
                {items.map((concept) => (
                  <Link key={concept.slug} href={`/wiki/${concept.slug}`} style={{ textDecoration: "none" }}>
                    <div className="concept-card">
                      <div className="concept-icon">{concept.icon}</div>
                      <div>
                        <p className="concept-title">{concept.title}</p>
                        <p className="concept-desc">{concept.shortDesc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
