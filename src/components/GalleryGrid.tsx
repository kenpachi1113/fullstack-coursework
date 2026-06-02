"use client";

import { useState } from "react";
import GalleryImage from "./GalleryImage";

interface GalleryItem {
  id: number;
  title: string;
  image?: string;
  characterName?: string;
}

interface Props {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: Props) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="gallery-item"
            onClick={() => item.image && setSelected(item)}
            style={{ cursor: item.image ? "zoom-in" : "default" }}
          >
            {item.image
              ? <GalleryImage src={item.image} alt={item.title} />
              : <span style={{ fontSize: "2rem", opacity: 0.3 }}>🎨</span>
            }
            <div className="gallery-overlay">
              <span>{item.title}{item.characterName ? ` — ${item.characterName}` : ""}</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: 24, cursor: "zoom-out",
          }}
        >
          <img
            src={selected.image}
            alt={selected.title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw", maxHeight: "80vh",
              objectFit: "contain", borderRadius: 8,
              cursor: "default",
            }}
          />
          <p style={{ color: "#fff", marginTop: 16, fontSize: "1rem", fontWeight: 600 }}>
            {selected.title}{selected.characterName ? ` — ${selected.characterName}` : ""}
          </p>
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", top: 20, right: 24,
              background: "none", border: "none",
              color: "#fff", fontSize: "2rem", cursor: "pointer", lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
