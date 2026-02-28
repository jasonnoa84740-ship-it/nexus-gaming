"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { pseudo },
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data.session) {
      setMessage("Compte créé ! Vérifie ton email.");
      return;
    }

    router.push("/account");
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="nx-card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold">Créer un compte</h1>

        <form onSubmit={handleSignup} className="space-y-3 mt-5">
          <input
            className="nx-input w-full"
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <input
            className="nx-input w-full"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="nx-input w-full"
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="nx-btn nx-btn-primary w-full">
            S'inscrire
          </button>
        </form>

        {message && (
          <div className="mt-4 text-sm text-white/70">{message}</div>
        )}

        <div className="mt-4 text-sm">
          Déjà un compte ?{" "}
          <Link href="/login" className="underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}