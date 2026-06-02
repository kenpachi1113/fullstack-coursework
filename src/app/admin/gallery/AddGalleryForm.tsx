"use client";

import { useState, FormEvent } from "react";
import ImageUpload from "@/components/ImageUpload";

interface Props {
  characters: { id: number; name: string }[];
}

export default function AddGalleryForm({ characters }: Props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !image) { setError("Назва та зображення обов'язкові"); return; }
    setLoading(true);
    setError("");
    const char = characters.find((c) => c.id === Number(characterId));
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        image,
        characterId: characterId ? Number(characterId) : undefined,
        characterName: char?.name,
        status: "published",
        createdAt: new Date().toISOString().split("T")[0],
      }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/admin/gallery";
    } else {
      setError("Помилка збереження");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label>Назва <span style={{ color: "var(--orange)" }}>*</span></label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="form-control" />
      </div>

      <ImageUpload value={image} onChange={setImage} label="Зображення *" />

      <div className="form-row" style={{ marginTop: 16 }}>
        <div className="form-group">
          <label>Персонаж (необов&apos;язково)</label>
          <select value={characterId} onChange={(e) => setCharacterId(e.target.value)} className="form-control">
            <option value="">— Без персонажа —</option>
            {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%" }}>
            {loading ? "Збереження..." : "Додати"}
          </button>
        </div>
      </div>
    </form>
  );
}
