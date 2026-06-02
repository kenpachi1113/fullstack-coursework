import { describe, it, expect, vi, beforeEach } from "vitest";

// ── mock fs so tests don't touch the real db.json ────────────────────────────
vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(() => false),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
  existsSync: vi.fn(() => false),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

// Mock @neondatabase/serverless so tests don't hit real DB
vi.mock("@neondatabase/serverless", () => {
  const row = { id: 99, name: "mock", japanese_name: "", slug: "mock", description: "", abilities: "", zanpakuto: "sword", bankai: null, faction: "test", faction_slug: "shinigami", squad: null, rank: null, status: "published", title: "mock", episodes: "1-10", sort_order: 1, summary: "", body: "", published_at: "2026-01-01", image: "/img.jpg", character_id: null, character_name: null, created_at: "2026-01-01", category: "test", icon: "📖", short_desc: "", };
  const mockSql = vi.fn().mockResolvedValue([row]);
  return { neon: () => mockSql };
});

import { db } from "../store";

// ── getAll ────────────────────────────────────────────────────────────────────

describe("db.getAll (mocked neon)", () => {
  it("returns a promise", () => {
    expect(db.getAll()).toBeInstanceOf(Promise);
  });
});

// ── createCharacter ───────────────────────────────────────────────────────────

describe("db.createCharacter", () => {
  it("returns a promise", () => {
    const result = db.createCharacter({
      name: "Test",
      japaneseName: "",
      slug: "test",
      description: "",
      abilities: "",
      zanpakuto: "sword",
      faction: "Test",
      factionSlug: "shinigami",
      status: "published",
    });
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("db.updateCharacter", () => {
  it("returns a promise", () => {
    expect(db.updateCharacter(1, { name: "x" })).toBeInstanceOf(Promise);
  });
});

describe("db.deleteCharacter", () => {
  it("returns a promise", () => {
    expect(db.deleteCharacter(1)).toBeInstanceOf(Promise);
  });
});

// ── Arcs ──────────────────────────────────────────────────────────────────────

describe("db.createArc", () => {
  it("returns a promise", () => {
    const result = db.createArc({
      title: "Arc",
      slug: "arc",
      description: "",
      episodes: "1-10",
      sortOrder: 1,
      status: "published",
    });
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("db.updateArc", () => {
  it("returns a promise", () => {
    expect(db.updateArc(1, { title: "x" })).toBeInstanceOf(Promise);
  });
});

describe("db.deleteArc", () => {
  it("returns a promise", () => {
    expect(db.deleteArc(1)).toBeInstanceOf(Promise);
  });
});

// ── News ──────────────────────────────────────────────────────────────────────

describe("db.createNews", () => {
  it("returns a promise", () => {
    const result = db.createNews({
      title: "News",
      slug: "news",
      summary: "",
      body: "",
      publishedAt: "2026-01-01",
      status: "published",
    });
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("db.updateNews", () => {
  it("returns a promise", () => {
    expect(db.updateNews(1, { title: "x" })).toBeInstanceOf(Promise);
  });
});

describe("db.deleteNews", () => {
  it("returns a promise", () => {
    expect(db.deleteNews(1)).toBeInstanceOf(Promise);
  });
});

// ── Gallery ───────────────────────────────────────────────────────────────────

describe("db.createGalleryItem", () => {
  it("returns a promise", () => {
    const result = db.createGalleryItem({
      title: "Art",
      image: "/img.jpg",
      status: "published",
      createdAt: "2026-01-01",
    });
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("db.deleteGalleryItem", () => {
  it("returns a promise", () => {
    expect(db.deleteGalleryItem(1)).toBeInstanceOf(Promise);
  });
});

// ── Concepts ──────────────────────────────────────────────────────────────────

describe("db.createConcept", () => {
  it("returns a promise", () => {
    const result = db.createConcept({
      title: "Concept",
      slug: "concept",
      category: "Test",
      icon: "📖",
      shortDesc: "desc",
      body: "body",
      sortOrder: 1,
      status: "published",
    });
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("db.updateConcept", () => {
  it("returns a promise", () => {
    expect(db.updateConcept(1, { title: "x" })).toBeInstanceOf(Promise);
  });
});

describe("db.deleteConcept", () => {
  it("returns a promise", () => {
    expect(db.deleteConcept(1)).toBeInstanceOf(Promise);
  });
});
