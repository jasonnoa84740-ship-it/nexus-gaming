"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWith } from "@/lib/authProviders";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    setLoading(false);

    if (error) return setMsg("Erreur: " + error.message);

    router.replace("/");
  }

  async function oauth(provider: "google" | "discord") {
    try {
      setMsg(null);
      await signInWith(provider);
      // la redirection est gérée par supabase (tu reviens sur /auth/callback)
    } catch (e: any) {
      setMsg("Erreur OAuth: " + (e?.message || "connexion"));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="nx-card p-6 max-w-md w-full">
        <h1 className="text-xl font-black">Se connecter</h1>

        {/* OAuth */}
        <div className="mt-4 grid gap-2">
          <button
            type="button"
            className="nx-btn nx-btn-ghost w-full"
            onClick={() => oauth("google")}
          >
            Continuer avec Google
          </button>

          <button
            type="button"
            className="nx-btn nx-btn-ghost w-full"
            onClick={() => oauth("discord")}
          >
            Continuer avec Discord
          </button>
        </div>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <div className="text-xs text-white/50">ou</div>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Email/Password */}
        <form onSubmit={login} className="space-y-3">
          <input
            className="nx-input w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="nx-input w-full"
            placeholder="Mot de passe"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button disabled={loading} className="nx-btn nx-btn-primary w-full">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {msg && <div className="mt-3 text-sm text-white/80">{msg}</div>}

        <div className="mt-4 text-sm text-white/70">
          Pas de compte ?{" "}
          <Link className="underline" href="/signup">
            S’inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}