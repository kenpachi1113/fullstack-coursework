"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  url: string;
  redirectTo: string;
  label?: string;
}

export default function DeleteButton({ url, redirectTo, label = "Видалити" }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    await fetch(url, { method: "DELETE" });
    router.push(redirectTo);
    router.refresh();
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Підтвердити?</span>
        <button onClick={handleDelete} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}>
          Так
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>
          Ні
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs px-3 py-1 rounded transition-colors hover:bg-red-500/20"
      style={{ color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}
    >
      {label}
    </button>
  );
}
