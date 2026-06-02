import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/store";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const concept = store.concepts.find((c) => c.slug === slug);
  if (!concept) return { title: "Стаття не знайдена" };
  return { title: `${concept.title} — Bleach Вікі`, description: concept.shortDesc };
}

export default async function WikiArticlePage({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const concept = store.concepts.find((c) => c.slug === slug && c.status === "published");
  if (!concept) notFound();

  const related = store.concepts.filter(
    (c) => c.category === concept.category && c.id !== concept.id && c.status === "published"
  );
  const paragraphs = concept.body.split("\n").filter(Boolean);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link href="/wiki" style={{ color: "var(--gray)", fontSize: ".85rem", display: "inline-block", marginBottom: 12 }}>← Вікі</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: "2.5rem" }}>{concept.icon}</span>
            <div>
              <span style={{ fontSize: ".75rem", color: "var(--orange)", textTransform: "uppercase", letterSpacing: 1 }}>{concept.category}</span>
              <h1>{concept.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="wiki-layout">
            <div>
              <p style={{ color: "var(--gray)", fontStyle: "italic", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border)", fontSize: "1.05rem" }}>
                {concept.shortDesc}
              </p>
              <div className="wiki-content" style={{ color: "#ccc", lineHeight: 1.85, fontSize: ".97rem" }}>
                {paragraphs.map((p, i) => <p key={i} style={{ marginBottom: 14 }}>{p}</p>)}
              </div>
            </div>

            {related.length > 0 && (
              <aside className="wiki-sidebar">
                <p className="wiki-sidebar-title">У цьому розділі</p>
                {related.map((r) => (
                  <Link key={r.slug} href={`/wiki/${r.slug}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--border)", color: "var(--gray)", fontSize: ".9rem", textDecoration: "none" }}>
                    <span>{r.icon}</span>
                    <span>{r.title}</span>
                  </Link>
                ))}
              </aside>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
