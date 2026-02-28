"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthGate from "@/components/AuthGate";

type Tab = "settings" | "orders" | "tracking" | "promos";

function TabBtn({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-xl text-sm font-semibold border transition",
        active
          ? "bg-white/15 border-white/20"
          : "bg-white/5 border-white/10 hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function AccountInner() {
  const router = useRouter();
  const params = useSearchParams(); // ✅ maintenant OK car dans Suspense

  const tab = ((params.get("tab") as Tab) || "settings") satisfies Tab;

  const [user, setUser] = useState<any>(null);
  const [pseudo, setPseudo] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const [orders, setOrders] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setPseudo(data.user?.user_metadata?.pseudo || "");
    });
  }, []);

  useEffect(() => {
    async function load() {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;

      if (uid) {
        const { data: o } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        setOrders(o || []);
      }

      const { data: p } = await supabase
        .from("promo_codes")
        .select("*")
        .order("percent", { ascending: false });

      setPromos(p || []);
    }
    load();
  }, []);

  function setTab(next: Tab) {
    router.replace(`/account?tab=${next}`);
  }

  async function saveProfile() {
    setMsg(null);

    const { error } = await supabase.auth.updateUser({
      data: { pseudo },
    });

    if (error) setMsg("Erreur: " + error.message);
    else setMsg("✅ Profil mis à jour");
  }

  return (
    <AuthGate>
      <div className="nx-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Mon compte</h1>
            <p className="text-white/70 mt-1">{user?.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <TabBtn
              active={tab === "settings"}
              label="⚙️ Réglages"
              onClick={() => setTab("settings")}
            />
            <TabBtn
              active={tab === "orders"}
              label="📦 Commandes"
              onClick={() => setTab("orders")}
            />
            <TabBtn
              active={tab === "tracking"}
              label="🚚 Suivi"
              onClick={() => setTab("tracking")}
            />
            <TabBtn
              active={tab === "promos"}
              label="🎟️ Codes promo"
              onClick={() => setTab("promos")}
            />
          </div>
        </div>

        <div className="mt-6">
          {tab === "settings" && (
            <div className="space-y-3">
              <div className="text-lg font-black">Mes réglages</div>
              <label className="text-sm text-white/70">Pseudo</label>
              <input
                className="nx-input w-full"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <button onClick={saveProfile} className="nx-btn nx-btn-primary">
                Enregistrer
              </button>
              {msg && <div className="text-sm text-white/80">{msg}</div>}
              <div className="text-xs text-white/50">
                (À venir: adresses, moyens de paiement, préférences, newsletter…)
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <div className="text-lg font-black">Mes commandes</div>
              <div className="mt-3 grid gap-3">
                {orders.length === 0 ? (
                  <div className="text-white/70">Aucune commande pour le moment.</div>
                ) : (
                  orders.map((o) => (
                    <div key={o.id} className="nx-card p-4 bg-white/5 border-white/10">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold">
                          Commande #{String(o.id).slice(0, 8)}
                        </div>
                        <div className="text-xs text-white/60">
                          {new Date(o.created_at).toLocaleString("fr-FR")}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-white/70">
                        Statut: <b>{o.status}</b> • Total:{" "}
                        <b>{(o.amount_total ?? 0) / 100}€</b>
                      </div>
                      <div className="mt-2 text-sm text-white/70">
                        Suivi: <b>{o.tracking_status}</b>{" "}
                        {o.tracking_number ? `• ${o.tracking_number}` : ""}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "tracking" && (
            <div>
              <div className="text-lg font-black">Mes suivis</div>
              <div className="mt-3 text-white/70">
                Tu retrouveras ici le suivi détaillé (transporteur, étapes, notifications).
              </div>
              <div className="mt-3 nx-card p-4 bg-white/5 border-white/10 text-sm text-white/70">
                (Démo) Statuts possibles: Préparation → Expédié → En transit → Livré
              </div>
            </div>
          )}

          {tab === "promos" && (
            <div>
              <div className="text-lg font-black">Mes codes promo</div>
              <div className="mt-3 grid gap-3">
                {promos.length === 0 ? (
                  <div className="text-white/70">Aucun code promo disponible.</div>
                ) : (
                  promos.map((p) => (
                    <div key={p.code} className="nx-card p-4 bg-white/5 border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="font-black">{p.code}</div>
                        <div className="text-sm text-white/70">-{p.percent}%</div>
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        {p.expires_at
                          ? `Expire le ${new Date(p.expires_at).toLocaleDateString("fr-FR")}`
                          : "Sans expiration"}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-3 text-xs text-white/50">
                (Plus tard: codes personnalisés, historique d’utilisation, conditions.)
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGate>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="nx-card p-6 max-w-md w-full text-white/80">
            Chargement du compte…
          </div>
        </div>
      }
    >
      <AccountInner />
    </Suspense>
  );
}