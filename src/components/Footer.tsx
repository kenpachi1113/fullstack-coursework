import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid var(--border)", padding: "32px 0", textAlign: "center", color: "var(--gray)", fontSize: ".875rem" }}>
      <div className="container">
        <p>
          &copy; 2024{" "}
          <span style={{ color: "var(--orange)" }}>Bleach Portal</span>{" "}
          — Фансайт аніме Bleach.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16 }}>
          <Link href="/characters">Персонажі</Link>
          <Link href="/arcs">Арки</Link>
          <Link href="/wiki">Вікі</Link>
          <Link href="/gallery">Галерея</Link>
          <Link href="/news">Новини</Link>
        </div>
      </div>
    </footer>
  );
}
