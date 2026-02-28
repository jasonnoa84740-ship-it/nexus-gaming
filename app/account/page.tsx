"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="nx-card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold">Mon profil</h1>

        <div className="mt-4 space-y-2 text-white/70">
          <div>Email : {user.email}</div>
          <div>Pseudo : {user.user_metadata?.pseudo || "—"}</div>
          <div>ID : {user.id}</div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/" className="nx-btn nx-btn-ghost">
            Boutique
          </Link>
          <button onClick={logout} className="nx-btn nx-btn-primary">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}