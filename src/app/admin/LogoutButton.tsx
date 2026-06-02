"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-500/10"
      style={{ border: "1px solid rgba(239,68,68,0.4)", color: "#f87171" }}
    >
      Вийти
    </button>
  );
}
