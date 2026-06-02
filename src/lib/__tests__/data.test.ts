import { describe, it, expect } from "vitest";
import {
  factions,
  arcs,
  characters,
  news,
  getCharacterBySlug,
  getArcBySlug,
  getNewsBySlug,
  getPublishedCharacters,
  getPublishedArcs,
  getPublishedNews,
} from "../data";

// ── factions ─────────────────────────────────────────────────────────────────

describe("factions", () => {
  it("contains 5 factions", () => {
    expect(factions).toHaveLength(5);
  });

  it("each faction has id, name, slug, description", () => {
    factions.forEach((f) => {
      expect(f).toHaveProperty("id");
      expect(f).toHaveProperty("name");
      expect(f).toHaveProperty("slug");
      expect(f).toHaveProperty("description");
    });
  });

  it("slugs are unique", () => {
    const slugs = factions.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("includes shinigami faction", () => {
    expect(factions.find((f) => f.slug === "shinigami")).toBeDefined();
  });
});

// ── arcs ─────────────────────────────────────────────────────────────────────

describe("arcs", () => {
  it("contains 7 arcs", () => {
    expect(arcs).toHaveLength(7);
  });

  it("all arcs have sortOrder", () => {
    arcs.forEach((a) => {
      expect(typeof a.sortOrder).toBe("number");
    });
  });

  it("sortOrders are unique", () => {
    const orders = arcs.map((a) => a.sortOrder);
    expect(new Set(orders).size).toBe(orders.length);
  });
});

// ── characters ───────────────────────────────────────────────────────────────

describe("characters", () => {
  it("contains 10 characters", () => {
    expect(characters).toHaveLength(10);
  });

  it("all characters have required fields", () => {
    characters.forEach((c) => {
      expect(c.id).toBeDefined();
      expect(c.name).toBeTruthy();
      expect(c.slug).toBeTruthy();
      expect(c.zanpakuto).toBeTruthy();
      expect(["published", "draft"]).toContain(c.status);
    });
  });

  it("slugs are unique", () => {
    const slugs = characters.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

// ── getCharacterBySlug ────────────────────────────────────────────────────────

describe("getCharacterBySlug", () => {
  it("returns the correct character", () => {
    const char = getCharacterBySlug("ichigo-kurosaki");
    expect(char).toBeDefined();
    expect(char?.name).toBe("Іціго Куросакі");
  });

  it("returns undefined for unknown slug", () => {
    expect(getCharacterBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns undefined for empty string", () => {
    expect(getCharacterBySlug("")).toBeUndefined();
  });

  it("finds rukia by slug", () => {
    const char = getCharacterBySlug("rukia-kuchiki");
    expect(char?.factionSlug).toBe("shinigami");
  });
});

// ── getArcBySlug ─────────────────────────────────────────────────────────────

describe("getArcBySlug", () => {
  it("returns the correct arc", () => {
    const arc = getArcBySlug("soul-society");
    expect(arc).toBeDefined();
    expect(arc?.sortOrder).toBe(2);
  });

  it("returns undefined for unknown slug", () => {
    expect(getArcBySlug("unknown-arc")).toBeUndefined();
  });

  it("finds first arc by slug", () => {
    const arc = getArcBySlug("agent-of-shinigami");
    expect(arc?.sortOrder).toBe(1);
  });
});

// ── getNewsBySlug ─────────────────────────────────────────────────────────────

describe("getNewsBySlug", () => {
  it("returns the correct news item", () => {
    const item = getNewsBySlug("tybw-part4-release-date");
    expect(item).toBeDefined();
    expect(item?.id).toBe(1);
  });

  it("returns undefined for unknown slug", () => {
    expect(getNewsBySlug("no-such-news")).toBeUndefined();
  });
});

// ── getPublishedCharacters ────────────────────────────────────────────────────

describe("getPublishedCharacters", () => {
  it("returns only published characters", () => {
    const result = getPublishedCharacters();
    result.forEach((c) => expect(c.status).toBe("published"));
  });

  it("returns all 10 (all are published in seed data)", () => {
    expect(getPublishedCharacters()).toHaveLength(10);
  });
});

// ── getPublishedArcs ─────────────────────────────────────────────────────────

describe("getPublishedArcs", () => {
  it("returns only published arcs", () => {
    const result = getPublishedArcs();
    result.forEach((a) => expect(a.status).toBe("published"));
  });

  it("is sorted by sortOrder ascending", () => {
    const result = getPublishedArcs();
    for (let i = 1; i < result.length; i++) {
      expect(result[i].sortOrder).toBeGreaterThan(result[i - 1].sortOrder);
    }
  });

  it("first arc is agent-of-shinigami", () => {
    expect(getPublishedArcs()[0].slug).toBe("agent-of-shinigami");
  });
});

// ── getPublishedNews ──────────────────────────────────────────────────────────

describe("getPublishedNews", () => {
  it("returns only published news", () => {
    const result = getPublishedNews();
    result.forEach((n) => expect(n.status).toBe("published"));
  });

  it("returns 3 news items", () => {
    expect(getPublishedNews()).toHaveLength(3);
  });

  it("all news have publishedAt date", () => {
    getPublishedNews().forEach((n) => {
      expect(n.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
