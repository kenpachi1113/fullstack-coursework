"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.ok) { router.push(from); router.refresh(); }
      else { setError(data.error ?? "Помилка входу"); }
    } catch {
      setError("Помилка з'єднання");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: 2, color: "var(--white)", textDecoration: "none" }}>
            BLEACH<span style={{ color: "var(--orange)" }}>.</span>PORTAL
          </Link>
          <p style={{ color: "var(--gray)", fontSize: ".9rem", marginTop: 6 }}>Адміністрування</p>
        </div>

        <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, padding: 32 }}>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--white)", textAlign: "center", marginBottom: 24 }}>
            Вхід в систему
          </h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Логін</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="form-control"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 8, opacity: loading ? .6 : 1 }}
            >
              {loading ? "Вхід..." : "Увійти"}
            </button>
          </form>

        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/" style={{ fontSize: ".85rem", color: "var(--gray)" }}>← Повернутись на сайт</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
