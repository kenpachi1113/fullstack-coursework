"use client";

import { useState } from "react";
import Link from "next/link";

interface Character {
  slug: string;
  name: string;
  japaneseName: string;
  rank?: string;
  zanpakuto: string;
  image?: string;
  factionSlug: string;
}

interface Faction {
  slug: string;
  name: string;
  description: string;
}

interface Props {
  characters: Character[];
  factions: Faction[];
}

export default function CharactersFilter({ characters, factions }: Props) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? characters.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : characters;

  const visibleFactions = active === "all"
    ? factions
    : factions.filter((f) => f.slug === active);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук персонажа..."
        className="form-control"
        style={{ maxWidth: 360, marginBottom: 24 }}
      />

      <div className="filters">
        <span
          className={`filter-btn${active === "all" ? " active" : ""}`}
          onClick={() => setActive("all")}
        >
          Всі
        </span>
        {factions.map((f) => (
          <span
            key={f.slug}
            className={`filter-btn${active === f.slug ? " active" : ""}`}
            onClick={() => setActive(f.slug)}
          >
            {f.name}
          </span>
        ))}
      </div>

      {visibleFactions.map((faction) => {
        const factionChars = filtered.filter((c) => c.factionSlug === faction.slug);
        if (factionChars.length === 0) return null;
        return (
          <div key={faction.slug} style={{ marginBottom: 56 }}>
            <div className="section-header">
              <h2 className="section-title">{faction.name}</h2>
            </div>
            <p style={{ color: "var(--gray)", fontSize: ".9rem", marginBottom: 24, marginTop: -24, maxWidth: 600 }}>
              {faction.description}
            </p>
            <div className="grid grid-4">
              {factionChars.map((char) => (
                <Link key={char.slug} href={`/characters/${char.slug}`} className="char-card">
                  {char.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={char.image} alt={char.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                  ) : (
                    <div className="char-placeholder">⚔️</div>
                  )}
                  <div className="char-card-body">
                    <p className="char-card-name">{char.name}</p>
                    <p className="char-card-jp">{char.japaneseName}</p>
                    {char.rank && <p style={{ color: "var(--gray)", fontSize: ".8rem", marginBottom: 8 }}>{char.rank}</p>}
                    {char.zanpakuto && (
                      <p style={{ fontSize: ".8rem" }}>
                        <span style={{ color: "var(--gray)" }}>Занпакуто: </span>
                        <span style={{ color: "var(--orange)" }}>{char.zanpakuto}</span>
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
