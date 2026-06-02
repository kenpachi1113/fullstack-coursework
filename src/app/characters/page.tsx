import { db } from "@/lib/store";
import CharactersFilter from "@/components/CharactersFilter";

export const metadata = {
  title: "Персонажі — Bleach Portal",
  description: "Всі персонажі всесвіту Bleach",
};

export default async function CharactersPage() {
  const store = await db.getAll();
  const characters = store.characters.filter((c) => c.status === "published");
  const factions = store.factions;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Персонажі Bleach</h1>
          <p>{characters.length} персонажів у базі</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <CharactersFilter characters={characters} factions={factions} />
        </div>
      </div>
    </>
  );
}
