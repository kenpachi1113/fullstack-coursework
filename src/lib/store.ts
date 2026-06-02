import { neon } from "@neondatabase/serverless";
import type { Store } from "@/types";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

function mapChar(r: Record<string, unknown>): Store["characters"][0] {
  return {
    id: r.id as number,
    name: r.name as string,
    japaneseName: (r.japanese_name ?? "") as string,
    slug: r.slug as string,
    description: (r.description ?? "") as string,
    abilities: (r.abilities ?? "") as string,
    zanpakuto: r.zanpakuto as string,
    bankai: r.bankai as string | undefined,
    faction: r.faction as string,
    factionSlug: r.faction_slug as string,
    squad: r.squad as string | undefined,
    rank: r.rank as string | undefined,
    image: r.image as string | undefined,
    status: r.status as "published" | "draft",
  };
}

function mapArc(r: Record<string, unknown>): Store["arcs"][0] {
  return {
    id: r.id as number,
    title: r.title as string,
    slug: r.slug as string,
    description: (r.description ?? "") as string,
    episodes: r.episodes as string,
    sortOrder: r.sort_order as number,
    status: r.status as "published" | "draft",
  };
}

function mapNews(r: Record<string, unknown>): Store["news"][0] {
  return {
    id: r.id as number,
    title: r.title as string,
    slug: r.slug as string,
    summary: (r.summary ?? "") as string,
    body: (r.body ?? "") as string,
    image: r.image as string | undefined,
    publishedAt: r.published_at as string,
    status: r.status as "published" | "draft",
  };
}

function mapGallery(r: Record<string, unknown>): Store["gallery"][0] {
  return {
    id: r.id as number,
    title: r.title as string,
    image: r.image as string,
    characterId: r.character_id as number | undefined,
    characterName: r.character_name as string | undefined,
    status: r.status as "published" | "draft",
    createdAt: r.created_at as string,
  };
}

function mapConcept(r: Record<string, unknown>): Store["concepts"][0] {
  return {
    id: r.id as number,
    title: r.title as string,
    slug: r.slug as string,
    category: r.category as string,
    icon: (r.icon ?? "📖") as string,
    shortDesc: (r.short_desc ?? "") as string,
    body: (r.body ?? "") as string,
    sortOrder: r.sort_order as number,
    status: r.status as "published" | "draft",
  };
}

function mapFaction(r: Record<string, unknown>): Store["factions"][0] {
  return {
    id: r.id as number,
    name: r.name as string,
    slug: r.slug as string,
    description: (r.description ?? "") as string,
  };
}

async function fetchAll(): Promise<Store> {
  const sql = getDb();
  const [characters, arcs, factions, news, gallery, concepts] = await Promise.all([
    sql`SELECT * FROM characters ORDER BY id`,
    sql`SELECT * FROM arcs ORDER BY sort_order`,
    sql`SELECT * FROM factions ORDER BY id`,
    sql`SELECT * FROM news ORDER BY id`,
    sql`SELECT * FROM gallery ORDER BY id`,
    sql`SELECT * FROM concepts ORDER BY sort_order`,
  ]);
  return {
    characters: (characters as Record<string, unknown>[]).map(mapChar),
    arcs: (arcs as Record<string, unknown>[]).map(mapArc),
    factions: (factions as Record<string, unknown>[]).map(mapFaction),
    news: (news as Record<string, unknown>[]).map(mapNews),
    gallery: (gallery as Record<string, unknown>[]).map(mapGallery),
    concepts: (concepts as Record<string, unknown>[]).map(mapConcept),
  };
}

export const db = {
  async getAll(): Promise<Store> {
    try {
      return await fetchAll();
    } catch {
      // Neon free tier may reset the connection on cold start — retry once
      return await fetchAll();
    }
  },

  // ── Characters ──────────────────────────────────────────────────
  async createCharacter(data: Omit<Store["characters"][0], "id">) {
    const sql = getDb();
    const [r] = await sql`
      INSERT INTO characters (name, japanese_name, slug, description, abilities, zanpakuto, bankai, faction, faction_slug, squad, rank, image, status)
      VALUES (${data.name}, ${data.japaneseName ?? ""}, ${data.slug}, ${data.description ?? ""}, ${data.abilities ?? ""}, ${data.zanpakuto}, ${data.bankai ?? null}, ${data.faction}, ${data.factionSlug}, ${data.squad ?? null}, ${data.rank ?? null}, ${data.image ?? null}, ${data.status})
      RETURNING *
    `;
    return mapChar(r as Record<string, unknown>);
  },

  async updateCharacter(id: number, data: Partial<Store["characters"][0]>) {
    const sql = getDb();
    await sql`
      UPDATE characters SET
        name = COALESCE(${data.name ?? null}, name),
        japanese_name = COALESCE(${data.japaneseName ?? null}, japanese_name),
        slug = COALESCE(${data.slug ?? null}, slug),
        description = COALESCE(${data.description ?? null}, description),
        abilities = COALESCE(${data.abilities ?? null}, abilities),
        zanpakuto = COALESCE(${data.zanpakuto ?? null}, zanpakuto),
        bankai = COALESCE(${data.bankai ?? null}, bankai),
        faction = COALESCE(${data.faction ?? null}, faction),
        faction_slug = COALESCE(${data.factionSlug ?? null}, faction_slug),
        squad = COALESCE(${data.squad ?? null}, squad),
        rank = COALESCE(${data.rank ?? null}, rank),
        image = COALESCE(${data.image ?? null}, image),
        status = COALESCE(${data.status ?? null}, status)
      WHERE id = ${id}
    `;
  },

  async deleteCharacter(id: number) {
    const sql = getDb();
    await sql`DELETE FROM characters WHERE id = ${id}`;
  },

  // ── Arcs ────────────────────────────────────────────────────────
  async createArc(data: Omit<Store["arcs"][0], "id">) {
    const sql = getDb();
    const [r] = await sql`
      INSERT INTO arcs (title, slug, description, episodes, sort_order, status)
      VALUES (${data.title}, ${data.slug}, ${data.description ?? ""}, ${data.episodes}, ${data.sortOrder}, ${data.status})
      RETURNING *
    `;
    return mapArc(r as Record<string, unknown>);
  },

  async updateArc(id: number, data: Partial<Store["arcs"][0]>) {
    const sql = getDb();
    await sql`
      UPDATE arcs SET
        title = COALESCE(${data.title ?? null}, title),
        slug = COALESCE(${data.slug ?? null}, slug),
        description = COALESCE(${data.description ?? null}, description),
        episodes = COALESCE(${data.episodes ?? null}, episodes),
        sort_order = COALESCE(${data.sortOrder ?? null}, sort_order),
        status = COALESCE(${data.status ?? null}, status)
      WHERE id = ${id}
    `;
  },

  async deleteArc(id: number) {
    const sql = getDb();
    await sql`DELETE FROM arcs WHERE id = ${id}`;
  },

  // ── News ────────────────────────────────────────────────────────
  async createNews(data: Omit<Store["news"][0], "id">) {
    const sql = getDb();
    const [r] = await sql`
      INSERT INTO news (title, slug, summary, body, image, published_at, status)
      VALUES (${data.title}, ${data.slug}, ${data.summary ?? ""}, ${data.body ?? ""}, ${data.image ?? null}, ${data.publishedAt}, ${data.status})
      RETURNING *
    `;
    return mapNews(r as Record<string, unknown>);
  },

  async updateNews(id: number, data: Partial<Store["news"][0]>) {
    const sql = getDb();
    await sql`
      UPDATE news SET
        title = COALESCE(${data.title ?? null}, title),
        slug = COALESCE(${data.slug ?? null}, slug),
        summary = COALESCE(${data.summary ?? null}, summary),
        body = COALESCE(${data.body ?? null}, body),
        image = COALESCE(${data.image ?? null}, image),
        published_at = COALESCE(${data.publishedAt ?? null}, published_at),
        status = COALESCE(${data.status ?? null}, status)
      WHERE id = ${id}
    `;
  },

  async deleteNews(id: number) {
    const sql = getDb();
    await sql`DELETE FROM news WHERE id = ${id}`;
  },

  // ── Gallery ─────────────────────────────────────────────────────
  async createGalleryItem(data: Omit<Store["gallery"][0], "id">) {
    const sql = getDb();
    const [r] = await sql`
      INSERT INTO gallery (title, image, character_id, character_name, status, created_at)
      VALUES (${data.title}, ${data.image}, ${data.characterId ?? null}, ${data.characterName ?? null}, ${data.status}, ${data.createdAt})
      RETURNING *
    `;
    return mapGallery(r as Record<string, unknown>);
  },

  async updateGalleryItem(id: number, data: Partial<Store["gallery"][0]>) {
    const sql = getDb();
    await sql`
      UPDATE gallery SET
        title = COALESCE(${data.title ?? null}, title),
        image = COALESCE(${data.image ?? null}, image),
        character_id = COALESCE(${data.characterId ?? null}, character_id),
        character_name = COALESCE(${data.characterName ?? null}, character_name),
        status = COALESCE(${data.status ?? null}, status)
      WHERE id = ${id}
    `;
  },

  async deleteGalleryItem(id: number) {
    const sql = getDb();
    await sql`DELETE FROM gallery WHERE id = ${id}`;
  },

  // ── Concepts ────────────────────────────────────────────────────
  async createConcept(data: Omit<Store["concepts"][0], "id">) {
    const sql = getDb();
    const [r] = await sql`
      INSERT INTO concepts (title, slug, category, icon, short_desc, body, sort_order, status)
      VALUES (${data.title}, ${data.slug}, ${data.category}, ${data.icon ?? "📖"}, ${data.shortDesc ?? ""}, ${data.body ?? ""}, ${data.sortOrder}, ${data.status})
      RETURNING *
    `;
    return mapConcept(r as Record<string, unknown>);
  },

  async updateConcept(id: number, data: Partial<Store["concepts"][0]>) {
    const sql = getDb();
    await sql`
      UPDATE concepts SET
        title = COALESCE(${data.title ?? null}, title),
        slug = COALESCE(${data.slug ?? null}, slug),
        category = COALESCE(${data.category ?? null}, category),
        icon = COALESCE(${data.icon ?? null}, icon),
        short_desc = COALESCE(${data.shortDesc ?? null}, short_desc),
        body = COALESCE(${data.body ?? null}, body),
        sort_order = COALESCE(${data.sortOrder ?? null}, sort_order),
        status = COALESCE(${data.status ?? null}, status)
      WHERE id = ${id}
    `;
  },

  async deleteConcept(id: number) {
    const sql = getDb();
    await sql`DELETE FROM concepts WHERE id = ${id}`;
  },
};
