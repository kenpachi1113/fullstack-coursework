import { neon } from "@neondatabase/serverless";
import { characters, arcs, factions, news } from "../src/lib/data";
import { seedGallery, seedConcepts } from "../src/lib/seeds";

const sql = neon(process.env.DATABASE_URL!);

async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) { if (i === attempts - 1) throw e; await new Promise(r => setTimeout(r, 1000 * (i + 1))); }
  }
  throw new Error("unreachable");
}

async function main() {
  console.log("Seeding...");

  // Factions
  for (const f of factions) {
    await retry(() => sql`
      INSERT INTO factions (id, name, slug, description)
      VALUES (${f.id}, ${f.name}, ${f.slug}, ${f.description})
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    `);
  }
  console.log("Factions done");

  // Characters
  for (const c of characters) {
    await retry(() => sql`
      INSERT INTO characters (id, name, japanese_name, slug, description, abilities, zanpakuto, bankai, faction, faction_slug, squad, rank, status)
      VALUES (${c.id}, ${c.name}, ${c.japaneseName ?? ''}, ${c.slug}, ${c.description ?? ''}, ${c.abilities ?? ''}, ${c.zanpakuto}, ${c.bankai ?? null}, ${c.faction}, ${c.factionSlug}, ${c.squad ?? null}, ${c.rank ?? null}, ${c.status})
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    `);
  }
  console.log("Characters done");

  // Arcs
  for (const a of arcs) {
    await retry(() => sql`
      INSERT INTO arcs (id, title, slug, description, episodes, sort_order, status)
      VALUES (${a.id}, ${a.title}, ${a.slug}, ${a.description ?? ''}, ${a.episodes}, ${a.sortOrder}, ${a.status})
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    `);
  }
  console.log("Arcs done");

  // News
  for (const n of news) {
    await retry(() => sql`
      INSERT INTO news (id, title, slug, summary, body, published_at, status)
      VALUES (${n.id}, ${n.title}, ${n.slug}, ${n.summary}, ${n.body}, ${n.publishedAt}, ${n.status})
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    `);
  }
  console.log("News done");

  // Gallery
  for (const g of seedGallery) {
    await retry(() => sql`
      INSERT INTO gallery (id, title, image, character_id, character_name, status, created_at)
      VALUES (${g.id}, ${g.title}, ${g.image}, ${g.characterId ?? null}, ${g.characterName ?? null}, ${g.status}, ${g.createdAt})
      ON CONFLICT (id) DO NOTHING
    `);
  }
  console.log("Gallery done");

  // Concepts
  for (const c of seedConcepts) {
    await retry(() => sql`
      INSERT INTO concepts (id, title, slug, category, icon, short_desc, body, sort_order, status)
      VALUES (${c.id}, ${c.title}, ${c.slug}, ${c.category}, ${c.icon ?? '📖'}, ${c.shortDesc}, ${c.body}, ${c.sortOrder}, ${c.status})
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    `);
  }
  console.log("Concepts done");

  console.log("Done!");
}

main().catch((e) => { console.error(e); process.exit(1); });
