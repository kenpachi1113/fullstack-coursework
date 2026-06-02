import Link from "next/link";
import { db } from "@/lib/store";

export const metadata = {
  title: "Арки сюжету — Bleach Portal",
};

export default async function ArcsPage() {
  const store = await db.getAll();
  const arcs = store.arcs.filter((a) => a.status === "published");
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Арки сюжету</h1>
          <p>{arcs.length} арок у хронологічному порядку</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {arcs.map((arc) => (
              <Link key={arc.slug} href={`/arcs/${arc.slug}`} className="arc-card">
                <div className="arc-num">{arc.sortOrder.toString().padStart(2, "0")}</div>
                <div className="arc-eps">Епізоди {arc.episodes}</div>
                <h2 className="arc-title">{arc.title}</h2>
                <p className="arc-desc">{arc.description.split("\n")[0].slice(0, 160)}...</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
