import Link from "next/link";
import { db } from "@/lib/store";

export default async function HomePage() {
  const store = await db.getAll();
  const characters = store.characters.filter((c) => c.status === "published").slice(0, 4);
  const arcs = store.arcs.filter((a) => a.status === "published").slice(0, 3);
  const latestNews = store.news.filter((n) => n.status === "published").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a0a00 50%, #0d0d0d 100%)", borderBottom: "1px solid var(--border)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <p style={{ color: "var(--orange)", fontSize: ".85rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            Фан-портал всесвіту
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
            BLEACH<span style={{ color: "var(--orange)" }}>.</span>
          </h1>
          <p style={{ color: "var(--gray)", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto 32px" }}>
            Повна енциклопедія персонажів, арок та подій всесвіту Bleach. Занурся у світ Душетовариса.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/characters" className="btn btn-primary">Персонажі</Link>
            <Link href="/arcs" className="btn btn-outline">Арки сюжету</Link>
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Персонажі Bleach</h2>
            <Link href="/characters" style={{ color: "var(--gray)", fontSize: ".9rem" }}>Всі персонажі →</Link>
          </div>
          <div className="grid grid-4">
            {characters.map((char) => (
              <Link key={char.slug} href={`/characters/${char.slug}`} className="char-card">
                {char.image
                  ? <img src={char.image} alt={char.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                  : <div className="char-placeholder" style={{ fontSize: "4rem" }}>⚔️</div>
                }
                <div className="char-card-body">
                  <p className="char-card-name">{char.name}</p>
                  <p className="char-card-jp">{char.japaneseName}</p>
                  <span className="badge">{char.faction}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Arcs */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Арки сюжету</h2>
            <Link href="/arcs" style={{ color: "var(--gray)", fontSize: ".9rem" }}>Всі арки →</Link>
          </div>
          <div className="grid grid-3">
            {arcs.map((arc) => (
              <Link key={arc.slug} href={`/arcs/${arc.slug}`} className="arc-card">
                <div className="arc-num">{arc.sortOrder.toString().padStart(2, "0")}</div>
                <div className="arc-eps">Епізоди {arc.episodes}</div>
                <h3 className="arc-title">{arc.title}</h3>
                <p className="arc-desc">{arc.description.split("\n")[0].slice(0, 150)}...</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Останні новини</h2>
            <Link href="/news" style={{ color: "var(--gray)", fontSize: ".9rem" }}>Всі новини →</Link>
          </div>
          <div className="grid grid-3">
            {latestNews.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="news-card">
                {item.image
                  ? <img src={item.image} alt={item.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                  : <div className="news-placeholder">📰</div>
                }
                <div className="news-card-body">
                  <p className="news-card-date">
                    {new Date(item.publishedAt).toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h3 className="news-card-title">{item.title}</h3>
                  <p className="news-card-summary">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
