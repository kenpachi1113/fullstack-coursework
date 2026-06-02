"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "image";
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  half?: boolean;
  placeholder?: string;
}

interface Props {
  fields: Field[];
  initialValues?: Record<string, string | number>;
  action: string;
  method?: "POST" | "PUT";
  submitLabel?: string;
  redirectTo: string;
}

export default function AdminForm({ fields, initialValues = {}, action, method = "POST", submitLabel = "Зберегти", redirectTo }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string | number>>(() => {
    const init: Record<string, string | number> = {};
    fields.forEach((f) => { init[f.name] = initialValues[f.name] ?? (f.type === "number" ? 0 : ""); });
    return init;
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(action, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (res.ok) { router.push(redirectTo); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Помилка збереження"); }
    } catch { setError("Помилка з'єднання"); }
    finally { setLoading(false); }
  }

  const halfFields = fields.filter((f) => f.half);
  const pairs: Field[][] = [];
  for (let i = 0; i < halfFields.length; i += 2) pairs.push(halfFields.slice(i, i + 2));

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      {fields.map((field, idx) => {
        if (field.half) {
          const pairIdx = halfFields.indexOf(field);
          if (pairIdx % 2 !== 0) return null;
          const pair = pairs[Math.floor(pairIdx / 2)];
          return (
            <div key={idx} className="form-row">
              {pair.map((f) => renderField(f, values, setValues))}
            </div>
          );
        }
        return renderField(field, values, setValues);
      })}

      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Збереження..." : submitLabel}
        </button>
        <button type="button" onClick={() => router.push(redirectTo)} className="btn btn-outline">
          Скасувати
        </button>
      </div>
    </form>
  );
}

function renderField(
  field: Field,
  values: Record<string, string | number>,
  setValues: React.Dispatch<React.SetStateAction<Record<string, string | number>>>
) {
  if (field.type === "image") {
    return (
      <ImageUpload
        key={field.name}
        label={field.label}
        value={String(values[field.name] ?? "")}
        onChange={(url) => setValues((v) => ({ ...v, [field.name]: url }))}
      />
    );
  }

  return (
    <div key={field.name} className="form-group">
      <label>
        {field.label} {field.required && <span>*</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          rows={field.rows ?? 5}
          required={field.required}
          value={String(values[field.name] ?? "")}
          onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
          className="form-control"
        />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={String(values[field.name] ?? "")}
          onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
          className="form-control"
        >
          {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input
          type={field.type ?? "text"}
          required={field.required}
          placeholder={field.placeholder}
          value={String(values[field.name] ?? "")}
          onChange={(e) => setValues((v) => ({ ...v, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value }))}
          className="form-control"
        />
      )}
    </div>
  );
}
