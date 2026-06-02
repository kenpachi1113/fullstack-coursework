"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  characterId?: number;
  characterName?: string;
  status: string;
}

interface Character {
  id: number;
  name: string;
}

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [item, setItem] = useState<GalleryItem | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const [galleryRes, storeRes] = await Promise.all([
        fetch("/api/gallery"),
        fetch("/api/characters"),
      ]);
      const gallery: GalleryItem[] = await galleryRes.json();
      const chars: Character[] = await storeRes.json();
      const found = gallery.find((g) => g.id === Number(id));
      if (found) {
        setItem(found);
        setTitle(found.title);
        setImage(found.image);
        setCharacterId(found.characterId?.toString() ?? "");
        setStatus(found.status);
      }
      setCharacters(chars);
    }
    load();
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !image) { setError("Назва та зображення обов'язкові"); return; }
    setLoading(true);
    setError("");
    const char = characters.find((c) => c.id === Number(characterId));
    const res = await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        image,
        characterId: characterId ? Number(characterId) : null,
        characterName: char?.name ?? null,
        status,
      }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/admin/gallery";
    } else {
      setError("Помилка збереження");
    }
  }

  if (!item) return <div className="admin-content" style={{ color: "var(--gray)" }}>Завантаження...</div>;

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Редагувати: {item.title}</span>
        <Link href="/admin/gallery" className="btn btn-outline btn-sm">← Назад</Link>
      </div>
      <div className="admin-content">
        <div className="admin-form-wrap">
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Назва <span style={{ color: "var(--orange)" }}>*</span></label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className="form-control" />
            </div>

            <ImageUpload value={image} onChange={setImage} label="Зображення *" />

            <div className="form-row" style={{ marginTop: 16 }}>
              <div className="form-group">
                <label>Персонаж</label>
                <select value={characterId} onChange={(e) => setCharacterId(e.target.value)} className="form-control">
                  <option value="">— Без персонажа —</option>
                  {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Статус</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control">
                  <option value="published">Опублікований</option>
                  <option value="draft">Чернетка</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 8 }}>
              {loading ? "Збереження..." : "Зберегти зміни"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
