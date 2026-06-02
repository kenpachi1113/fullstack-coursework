import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/store";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const store = await db.getAll();
  return store.arcs.filter((a) => a.status === "published").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const arc = store.arcs.find((a) => a.slug === slug);
  if (!arc) return { title: "Арка не знайдена" };
  return { title: `${arc.title} — Bleach Portal`, description: arc.description.slice(0, 160) };
}

export default async function ArcPage({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const arc = store.arcs.find((a) => a.slug === slug);
  if (!arc) notFound();

  const paragraphs = arc.description.split("\n").filter(Boolean);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link href="/arcs" style={{ color: "var(--gray)", fontSize: ".85rem", display: "inline-block", marginBottom: 12 }}>← Арки</Link>
          <h1>{arc.title}</h1>
          <p>Епізоди {arc.episodes}</p>
        </div>
      </div>
      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(224,123,0,.2)", lineHeight: 1 }}>
              {arc.sortOrder.toString().padStart(2, "0")}
            </span>
            <span className="badge">Епізоди {arc.episodes}</span>
          </div>
          <div style={{ color: "var(--gray)", lineHeight: 1.85, fontSize: ".97rem" }}>
            {paragraphs.map((p, i) => <p key={i} style={{ marginBottom: 16 }}>{p}</p>)}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href="/arcs" className="btn btn-outline btn-sm">← Всі арки</Link>
          </div>
        </div>
      </section>
    </>
  );
}
