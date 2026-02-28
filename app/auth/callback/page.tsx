"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const [msg, setMsg] = useState("Validation en cours...");

  useEffect(() => {
    const code = params.get("code");

    async function run() {
      try {
        // Si Supabase envoie "code", on échange contre session
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setMsg("Erreur confirmation: " + error.message);
            return;
          }
        }

        // Si session ok → tu peux envoyer direct sur le site
        const { data } = await supabase.auth.getSession();
        if (data.session) router.replace("/");
        else router.replace("/login");
      } catch (e: any) {
        setMsg("Erreur: " + (e?.message || "callback"));
      }
    }

    run();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="nx-card p-6 max-w-md w-full">
        <div className="text-white/80">{msg}</div>
      </div>
    </div>
  );
}