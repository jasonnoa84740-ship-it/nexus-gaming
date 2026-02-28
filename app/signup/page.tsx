"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

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
        data: { pseudo }, // metadata profil
      },
    });

    setLoading(false);

    if (error) return setMsg("Erreur: " + error.message);

    setMsg("✅ Compte créé. Regarde tes emails et confirme ton inscription.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="nx-card p-6 max-w-md w-full">
        <h1 className="text-xl font-black">Créer un compte</h1>

        <form onSubmit={signup} className="mt-4 space-y-3">
          <input className="nx-input w-full" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          <input className="nx-input w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="nx-input w-full" placeholder="Mot de passe" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button disabled={loading} className="nx-btn nx-btn-primary w-full">
            {loading ? "Création..." : "S’inscrire"}
          </button>
        </form>

        {msg && <div className="mt-3 text-sm text-white/80">{msg}</div>}

        <div className="mt-4 text-sm text-white/70">
          Déjà un compte ? <Link className="underline" href="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}