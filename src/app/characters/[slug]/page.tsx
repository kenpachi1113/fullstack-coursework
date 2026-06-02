import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/store";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const store = await db.getAll();
  return store.characters.filter((c) => c.status === "published").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const char = store.characters.find((c) => c.slug === slug);
  if (!char) return { title: "Персонаж не знайдений" };
  return { title: `${char.name} — Bleach Portal`, description: char.description.slice(0, 160) };
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const store = await db.getAll();
  const char = store.characters.find((c) => c.slug === slug);
  if (!char) notFound();

  const lines = char.description.split("\n").filter(Boolean);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link href="/characters" style={{ color: "var(--gray)", fontSize: ".85rem", display: "inline-block", marginBottom: 12 }}>← Персонажі</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <h1>{char.name}</h1>
            <span className="badge">{char.faction}</span>
          </div>
          <p>{char.japaneseName}</p>
        </div>
      </div>

      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="char-detail-grid">
            {/* Left: image */}
            <div>
              {char.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={char.image} alt={char.name} style={{ width: "100%", borderRadius: "var(--radius)", border: "2px solid var(--border)" }} />
              ) : (
                <div className="char-detail-placeholder">⚔️</div>
              )}
            </div>

            {/* Right: info */}
            <div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <span className="badge">{char.faction}</span>
                {char.rank && <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--gray)", border: "1px solid var(--border)" }}>{char.rank}</span>}
                {char.squad && <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--gray)", border: "1px solid var(--border)" }}>{char.squad}</span>}
              </div>

              <div className="char-info-grid">
                <div className="char-info-item">
                  <div className="char-info-label">Занпакуто</div>
                  <div className="char-info-value">{char.zanpakuto}</div>
                </div>
                {char.bankai && (
                  <div className="char-info-item">
                    <div className="char-info-label">Банкай</div>
                    <div className="char-info-value">{char.bankai}</div>
                  </div>
                )}
                {char.squad && (
                  <div className="char-info-item">
                    <div className="char-info-label">Загін</div>
                    <div className="char-info-value">{char.squad}</div>
                  </div>
                )}
                {char.rank && (
                  <div className="char-info-item">
                    <div className="char-info-label">Звання</div>
                    <div className="char-info-value">{char.rank}</div>
                  </div>
                )}
              </div>

              <div className="char-section">
                <h3>Опис</h3>
                {lines.map((line, i) => (
                  <p key={i} style={{ marginBottom: 10 }}>{line}</p>
                ))}
              </div>

              <div className="char-section">
                <h3>Здібності</h3>
                <p>{char.abilities}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
