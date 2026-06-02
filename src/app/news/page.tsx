import Link from "next/link";
import { db } from "@/lib/store";

export const metadata = {
  title: "Новини — Bleach Portal",
};

export default async function NewsPage() {
  const store = await db.getAll();
  const newsList = store.news.filter((n) => n.status === "published");
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Новини</h1>
          <p>Останні оновлення всесвіту Bleach</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {newsList.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="news-card">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                ) : (
                  <div className="news-placeholder">📰</div>
                )}
                <div className="news-card-body">
                  <p className="news-card-date">
                    {new Date(item.publishedAt).toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h2 className="news-card-title">{item.title}</h2>
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
