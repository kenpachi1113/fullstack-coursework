import { db } from "@/lib/store";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Галерея — Bleach Portal",
};

export default async function GalleryPage() {
  const store = await db.getAll();
  const gallery = store.gallery.filter((g) => g.status === "published");

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Галерея</h1>
          <p>{gallery.length} зображень</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <GalleryGrid items={gallery} />
        </div>
      </section>
    </>
  );
}
