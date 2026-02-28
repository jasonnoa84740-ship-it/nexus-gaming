"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";
import AuthGate from "@/components/AuthGate";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [pseudo, setPseudo] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setPseudo(data.user?.user_metadata?.pseudo || "");
    });
  }, []);

  async function saveProfile() {
    setMsg(null);

    const { error } = await supabase.auth.updateUser({
      data: { pseudo },
    });

    if (error) setMsg("Erreur: " + error.message);
    else setMsg("✅ Profil mis à jour");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/auth");
  }

  return (
    <AuthGate>
      <div className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
        <div className="nx-card p-6">
          <h1 className="text-2xl font-black">Mon compte</h1>
          <p className="text-white/70 mt-1">{user?.email}</p>

          <div id="settings" className="mt-6">
            <h2 className="font-black text-lg">⚙️ Réglages</h2>
            <div className="mt-3 space-y-2">
              <label className="text-sm text-white/70">Pseudo</label>
              <input
                className="nx-input w-full"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <button
                onClick={saveProfile}
                className="nx-btn nx-btn-primary"
              >
                Enregistrer
              </button>
              {msg && (
                <div className="text-sm text-white/80">{msg}</div>
              )}
            </div>
          </div>

          <div id="orders" className="mt-8">
            <h2 className="font-black text-lg">📦 Mes commandes</h2>
            <p className="text-white/70 mt-2">
              (On va les brancher après : on enregistrera les commandes Stripe
              dans Supabase.)
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={logout}
              className="nx-btn nx-btn-ghost"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}