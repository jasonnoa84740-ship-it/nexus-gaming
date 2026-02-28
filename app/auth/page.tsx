"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";

export default function AuthHome() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/"); // déjà connecté => site
      else setLoading(false);
    });
  }, [router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="nx-card p-6 max-w-md w-full">
        <h1 className="text-2xl font-black">NEXUS GAMING</h1>
        <p className="text-white/70 mt-2">
          Connecte-toi ou crée un compte pour accéder au shop.
        </p>

        <div className="mt-5 flex gap-2">
          <Link
            className="nx-btn nx-btn-primary flex-1 text-center"
            href="/login"
          >
            Se connecter
          </Link>
          <Link
            className="nx-btn nx-btn-ghost flex-1 text-center"
            href="/signup"
          >
            S’inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}