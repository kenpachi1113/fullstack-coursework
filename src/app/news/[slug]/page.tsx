import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/store";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const store = await db.getAll();
  return store.news.filter((n) => n.status === "published").map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const item = store.news.find((n) => n.slug === slug);
  if (!item) return { title: "Новина не знайдена" };
  return { title: `${item.title} — Bleach Portal`, description: item.summary };
}

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const item = store.news.find((n) => n.slug === slug);
  if (!item) notFound();

  const allNews = store.news.filter((n) => n.status === "published" && n.slug !== slug).slice(0, 3);
  const paragraphs = item.body.split("\n").filter(Boolean);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link href="/news" style={{ color: "var(--gray)", fontSize: ".85rem", display: "inline-block", marginBottom: 12 }}>← Новини</Link>
          <h1 style={{ maxWidth: 800 }}>{item.title}</h1>
          <p>{new Date(item.publishedAt).toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "start" }} className="news-detail-layout">
            <article>
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.title} style={{ display: "block", margin: "0 auto 32px", maxWidth: "100%", maxHeight: 400, borderRadius: "var(--radius)" }} />
              ) : (
                <div style={{ width: "100%", aspectRatio: "16/9", background: "var(--bg2)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", marginBottom: 32 }}>
                  📰
                </div>
              )}
              <p style={{ color: "var(--gray)", fontStyle: "italic", fontSize: "1.05rem", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
                {item.summary}
              </p>
              <div style={{ color: "#ccc", lineHeight: 1.85, fontSize: ".97rem" }}>
                {paragraphs.map((p, i) => <p key={i} style={{ marginBottom: 16 }}>{p}</p>)}
              </div>
            </article>

            <aside>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20 }}>
                <h3 style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--orange)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
                  Інші новини
                </h3>
                {allNews.map((n) => (
                  <Link key={n.slug} href={`/news/${n.slug}`} style={{ display: "block", paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid var(--border)", color: "var(--white)" }}>
                    <p style={{ fontSize: ".85rem", fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>{n.title}</p>
                    <p style={{ fontSize: ".75rem", color: "var(--gray)" }}>{n.publishedAt}</p>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 768px) { .news-detail-layout { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
