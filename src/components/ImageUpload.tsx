"use client";

import { useState, useRef } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Зображення" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Помилка завантаження"); return; }
      onChange(data.url);
    } catch {
      setError("Помилка з'єднання");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="form-group">
      <label>{label}</label>

      <div
        style={{
          border: "2px dashed var(--border)",
          borderRadius: "var(--radius)",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          background: "var(--bg)",
          transition: "border-color .2s",
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        {value ? (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="preview"
              style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 6, margin: "0 auto 12px" }}
            />
            <p style={{ color: "var(--gray)", fontSize: ".8rem" }}>Натисни або перетягни щоб замінити</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "2rem", marginBottom: 8 }}>🖼️</p>
            <p style={{ color: "var(--gray)", fontSize: ".9rem" }}>
              {uploading ? "Завантаження..." : "Натисни або перетягни зображення сюди"}
            </p>
            <p style={{ color: "var(--gray)", fontSize: ".75rem", marginTop: 4 }}>JPG, PNG, WebP, GIF — до 5MB</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p style={{ color: "#ff6b6b", fontSize: ".8rem", marginTop: 6 }}>{error}</p>}
    </div>
  );
}
