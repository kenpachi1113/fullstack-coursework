import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS factions (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      slug        TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS characters (
      id            SERIAL PRIMARY KEY,
      name          TEXT NOT NULL,
      japanese_name TEXT NOT NULL DEFAULT '',
      slug          TEXT NOT NULL UNIQUE,
      description   TEXT NOT NULL DEFAULT '',
      abilities     TEXT NOT NULL DEFAULT '',
      zanpakuto     TEXT NOT NULL,
      bankai        TEXT,
      faction       TEXT NOT NULL,
      faction_slug  TEXT NOT NULL,
      squad         TEXT,
      rank          TEXT,
      image         TEXT,
      status        TEXT NOT NULL DEFAULT 'published'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS arcs (
      id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      slug        TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT '',
      episodes    TEXT NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      status      TEXT NOT NULL DEFAULT 'published'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS news (
      id           SERIAL PRIMARY KEY,
      title        TEXT NOT NULL,
      slug         TEXT NOT NULL UNIQUE,
      summary      TEXT NOT NULL DEFAULT '',
      body         TEXT NOT NULL DEFAULT '',
      image        TEXT,
      published_at TEXT NOT NULL,
      status       TEXT NOT NULL DEFAULT 'published'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id             SERIAL PRIMARY KEY,
      title          TEXT NOT NULL,
      image          TEXT NOT NULL,
      character_id   INTEGER,
      character_name TEXT,
      status         TEXT NOT NULL DEFAULT 'published',
      created_at     TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS concepts (
      id         SERIAL PRIMARY KEY,
      title      TEXT NOT NULL,
      slug       TEXT NOT NULL UNIQUE,
      category   TEXT NOT NULL,
      icon       TEXT NOT NULL DEFAULT '📖',
      short_desc TEXT NOT NULL DEFAULT '',
      body       TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      status     TEXT NOT NULL DEFAULT 'published'
    )
  `;

  console.log("Tables created!");
}

main().catch((e) => { console.error(e); process.exit(1); });
