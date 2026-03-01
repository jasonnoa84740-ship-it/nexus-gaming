"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { signInWith } from "@/lib/authProviders";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`,
        data: { pseudo },
      },
    });

    setLoading(false);

    if (error) return setMsg("Erreur: " + error.message);

    setMsg("✅ Compte créé. Regarde tes emails et confirme ton inscription.");
  }

  async function oauth(provider: "google" | "discord") {
    try {
      setMsg(null);
      await signInWith(provider);
    } catch (e: any) {
      setMsg("Erreur OAuth: " + (e?.message || "inscription"));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="nx-card p-6 max-w-md w-full">
        <h1 className="text-xl font-black">Créer un compte</h1>

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

        <form onSubmit={signup} className="space-y-3">
          <input
            className="nx-input w-full"
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
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
            {loading ? "Création..." : "S’inscrire"}
          </button>
        </form>

        {msg && <div className="mt-3 text-sm text-white/80">{msg}</div>}

        <div className="mt-4 text-sm text-white/70">
          Déjà un compte ?{" "}
          <Link className="underline" href="/login">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}