"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NexusShell from "@/components/NexusShell";
import AuthGate from "@/components/AuthGate";
import { supabase } from "@/lib/supabaseClient";

type Tab = "settings" | "orders" | "tracking" | "promos";

type AddressForm = {
  full_name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  postal_code: string;
  country: string;
};

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
      type="button"
    >
      {label}
    </button>
  );
}

const EMPTY_ADDRESS: AddressForm = {
  full_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  postal_code: "",
  country: "FR",
};

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.slice(0, 220) };
  }
}

function normalizeAddress(a: any): AddressForm {
  return {
    full_name: a?.full_name ?? "",
    phone: a?.phone ?? "",
    line1: a?.line1 ?? "",
    line2: a?.line2 ?? "",
    city: a?.city ?? "",
    postal_code: a?.postal_code ?? "",
    country: a?.country ?? "FR",
  };
}

function validateAddress(a: AddressForm, prefix = ""): string | null {
  const p = prefix ? prefix + " " : "";
  if (!a.full_name.trim()) return `❌ ${p}Nom / Prénom requis.`;
  if (!a.line1.trim()) return `❌ ${p}Adresse requise.`;
  if (!a.city.trim()) return `❌ ${p}Ville requise.`;
  if (!a.postal_code.trim()) return `❌ ${p}Code postal requis.`;
  if (!a.country.trim()) return `❌ ${p}Pays requis.`;
  return null;
}

export default function AccountClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [pseudo, setPseudo] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  // Livraison
  const [addr, setAddr] = useState<AddressForm>(EMPTY_ADDRESS);

  // Facturation
  const [billingSame, setBillingSame] = useState(true);
  const [billAddr, setBillAddr] = useState<AddressForm>(EMPTY_ADDRESS);

  const [addrLoading, setAddrLoading] = useState(false);
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrMsg, setAddrMsg] = useState<string | null>(null);

  const tab = useMemo<Tab>(() => {
    const t = (params.get("tab") || "settings") as Tab;
    if (t === "orders" || t === "tracking" || t === "promos" || t === "settings") return t;
    return "settings";
  }, [params]);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  async function loadAddresses() {
    setAddrMsg(null);
    setAddrLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Session expirée. Reconnecte-toi.");

      const res = await fetch("/api/address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json: any = await safeJson(res);
      if (!res.ok) throw new Error(json?.error || `Erreur chargement (HTTP ${res.status})`);

      // API attendue: { shipping, billing }
      if (json?.shipping) setAddr(normalizeAddress(json.shipping));
      else setAddr((prev) => ({ ...EMPTY_ADDRESS, country: prev.country || "FR" }));

      if (json?.billing) {
        setBillAddr(normalizeAddress(json.billing));
        setBillingSame(false);
      } else {
        setBillAddr(EMPTY_ADDRESS);
        setBillingSame(true);
      }
    } catch (e: any) {
      setAddrMsg("❌ " + (e?.message || "Erreur"));
    } finally {
      setAddrLoading(false);
    }
  }

  async function postAddress(label: "Maison" | "Facturation", data: AddressForm) {
    const token = await getAccessToken();
    if (!token) throw new Error("Session expirée. Reconnecte-toi.");

    const res = await fetch("/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ label, ...data }),
    });

    const json: any = await safeJson(res);
    if (!res.ok) throw new Error(json?.error || `Erreur (HTTP ${res.status})`);
    return json.address;
  }

  async function saveAddresses() {
    setAddrMsg(null);

    const errShip = validateAddress(addr);
    if (errShip) return setAddrMsg(errShip);

    if (!billingSame) {
      const errBill = validateAddress(billAddr, "Facturation:");
      if (errBill) return setAddrMsg(errBill);
    }

    setAddrSaving(true);
    try {
      await postAddress("Maison", addr);
      if (!billingSame) await postAddress("Facturation", billAddr);

      setAddrMsg("✅ Adresse(s) enregistrée(s)");
      await loadAddresses();
    } catch (e: any) {
      setAddrMsg("❌ " + (e?.message || "Erreur"));
    } finally {
      setAddrSaving(false);
    }
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setPseudo(data.user?.user_metadata?.pseudo || "");
    });
  }, []);

  useEffect(() => {
    if (tab !== "settings") return;
    if (!user) return;
    loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, user]);

  function setTab(next: Tab) {
    router.replace(`/account?tab=${next}`);
  }

  async function saveProfile() {
    setMsg(null);
    const { error } = await supabase.auth.updateUser({ data: { pseudo } });
    setMsg(error ? "Erreur: " + error.message : "✅ Profil mis à jour");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/auth");
  }

  return (
    <AuthGate>
      <NexusShell title="Mon compte" subtitle="Réglages, commandes, suivis, codes promo… comme un vrai shop.">
        <div className="nx-card p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-sm text-white/60">Connecté en tant que</div>
              <div className="text-lg font-black">{pseudo || user?.email || "Utilisateur"}</div>
              <div className="text-sm text-white/60">{user?.email}</div>
            </div>

            <button onClick={logout} className="nx-btn nx-btn-ghost" type="button">
              🚪 Déconnexion
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <TabBtn active={tab === "settings"} label="⚙️ Mes réglages" onClick={() => setTab("settings")} />
            <TabBtn active={tab === "orders"} label="📦 Mes commandes" onClick={() => setTab("orders")} />
            <TabBtn active={tab === "tracking"} label="🚚 Mes suivis" onClick={() => setTab("tracking")} />
            <TabBtn active={tab === "promos"} label="🎟️ Mes codes promo" onClick={() => setTab("promos")} />
          </div>

          <div className="mt-6">
            {tab === "settings" ? (
              <div className="space-y-4">
                <div className="nx-card p-4 bg-white/5 border-white/10">
                  <div className="font-black">Profil</div>
                  <div className="mt-2">
                    <label className="text-sm text-white/70">Pseudo</label>
                    <input
                      className="nx-input w-full mt-1"
                      value={pseudo}
                      onChange={(e) => setPseudo(e.target.value)}
                      placeholder="Ton pseudo"
                    />
                    <button onClick={saveProfile} className="nx-btn nx-btn-primary mt-3" type="button">
                      Enregistrer
                    </button>
                    {msg ? <div className="mt-2 text-sm text-white/80">{msg}</div> : null}
                  </div>
                </div>

                {/* ADRESSES */}
                <div className="nx-card p-4 bg-white/5 border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-black">Adresses</div>
                      <div className="text-sm text-white/70 mt-1">
                        Livraison + facturation (si différente).
                      </div>
                    </div>

                    <button
                      className="nx-btn nx-btn-ghost"
                      type="button"
                      onClick={loadAddresses}
                      disabled={addrLoading}
                      title="Recharger"
                    >
                      {addrLoading ? "…" : "↻ Recharger"}
                    </button>
                  </div>

                  {/* Livraison */}
                  <div className="mt-4">
                    <div className="font-semibold text-white/85">Adresse de livraison</div>

                    <div className="mt-3 grid md:grid-cols-2 gap-3">
                      <input
                        className="nx-input"
                        placeholder="Nom / Prénom"
                        value={addr.full_name}
                        onChange={(e) => setAddr((p) => ({ ...p, full_name: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />
                      <input
                        className="nx-input"
                        placeholder="Téléphone"
                        value={addr.phone}
                        onChange={(e) => setAddr((p) => ({ ...p, phone: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />

                      <input
                        className="nx-input md:col-span-2"
                        placeholder="Adresse"
                        value={addr.line1}
                        onChange={(e) => setAddr((p) => ({ ...p, line1: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />

                      <input
                        className="nx-input md:col-span-2"
                        placeholder="Complément (optionnel)"
                        value={addr.line2}
                        onChange={(e) => setAddr((p) => ({ ...p, line2: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />

                      <input
                        className="nx-input"
                        placeholder="Ville"
                        value={addr.city}
                        onChange={(e) => setAddr((p) => ({ ...p, city: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />
                      <input
                        className="nx-input"
                        placeholder="Code postal"
                        value={addr.postal_code}
                        onChange={(e) => setAddr((p) => ({ ...p, postal_code: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />

                      <input
                        className="nx-input md:col-span-2"
                        placeholder="Pays"
                        value={addr.country}
                        onChange={(e) => setAddr((p) => ({ ...p, country: e.target.value }))}
                        disabled={addrLoading || addrSaving}
                      />
                    </div>
                  </div>

                  {/* Facturation identique */}
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      id="billingSame"
                      type="checkbox"
                      checked={billingSame}
                      onChange={(e) => setBillingSame(e.target.checked)}
                      disabled={addrLoading || addrSaving}
                    />
                    <label htmlFor="billingSame" className="text-sm text-white/75">
                      Facturation identique à la livraison
                    </label>
                  </div>

                  {/* Facturation */}
                  {!billingSame ? (
                    <div className="mt-4 nx-card p-4 bg-white/5 border-white/10">
                      <div className="font-semibold text-white/85">Adresse de facturation</div>

                      <div className="mt-3 grid md:grid-cols-2 gap-3">
                        <input
                          className="nx-input"
                          placeholder="Nom / Prénom"
                          value={billAddr.full_name}
                          onChange={(e) => setBillAddr((p) => ({ ...p, full_name: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />
                        <input
                          className="nx-input"
                          placeholder="Téléphone"
                          value={billAddr.phone}
                          onChange={(e) => setBillAddr((p) => ({ ...p, phone: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />

                        <input
                          className="nx-input md:col-span-2"
                          placeholder="Adresse"
                          value={billAddr.line1}
                          onChange={(e) => setBillAddr((p) => ({ ...p, line1: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />

                        <input
                          className="nx-input md:col-span-2"
                          placeholder="Complément (optionnel)"
                          value={billAddr.line2}
                          onChange={(e) => setBillAddr((p) => ({ ...p, line2: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />

                        <input
                          className="nx-input"
                          placeholder="Ville"
                          value={billAddr.city}
                          onChange={(e) => setBillAddr((p) => ({ ...p, city: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />
                        <input
                          className="nx-input"
                          placeholder="Code postal"
                          value={billAddr.postal_code}
                          onChange={(e) => setBillAddr((p) => ({ ...p, postal_code: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />

                        <input
                          className="nx-input md:col-span-2"
                          placeholder="Pays"
                          value={billAddr.country}
                          onChange={(e) => setBillAddr((p) => ({ ...p, country: e.target.value }))}
                          disabled={addrLoading || addrSaving}
                        />
                      </div>
                    </div>
                  ) : null}

                  <button
                    className="nx-btn nx-btn-primary w-full mt-4"
                    type="button"
                    onClick={saveAddresses}
                    disabled={addrLoading || addrSaving}
                  >
                    {addrSaving ? "Enregistrement…" : "Enregistrer les adresses"}
                  </button>

                  {addrMsg ? <div className="mt-3 text-sm text-white/80">{addrMsg}</div> : null}
                  <div className="mt-2 text-xs text-white/55">
                    Données privées, liées à ton compte, protégées par RLS.
                  </div>
                </div>
              </div>
            ) : null}

            {tab === "orders" ? (
              <div className="nx-card p-4 bg-white/5 border-white/10">
                <div className="font-black">Mes commandes</div>
                <div className="text-sm text-white/70 mt-1">
                  Ici on affichera les vraies commandes (Stripe → webhook → Supabase).
                </div>
                <div className="mt-4 text-sm text-white/60">(Démo) Aucune commande pour l’instant.</div>
              </div>
            ) : null}

            {tab === "tracking" ? (
              <div className="nx-card p-4 bg-white/5 border-white/10">
                <div className="font-black">Mes suivis</div>
                <div className="text-sm text-white/70 mt-1">
                  Statuts type “Préparation → Expédition → Transit → Livré”.
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { id: "NX-120045", status: "Préparation", pct: 25 },
                    { id: "NX-120046", status: "Transit", pct: 70 },
                  ].map((t) => (
                    <div key={t.id} className="nx-card p-3 bg-white/5 border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Commande {t.id}</div>
                        <div className="text-sm text-white/70">{t.status}</div>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-white/50" style={{ width: `${t.pct}%` }} />
                      </div>
                      <div className="mt-2 text-xs text-white/60">
                        Préparation → Expédition → Transit → Livré
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {tab === "promos" ? (
              <div className="nx-card p-4 bg-white/5 border-white/10">
                <div className="font-black">Mes codes promo</div>
                <div className="text-sm text-white/70 mt-1">(Démo) Tes codes perso / fidélité apparaîtront ici.</div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="nx-card p-3 bg-white/5 border-white/10">
                    <div className="font-black">NEXUS10</div>
                    <div className="text-sm text-white/70">-10% sur le panier</div>
                    <div className="text-xs text-white/60 mt-1">Valable 30 jours</div>
                  </div>
                  <div className="nx-card p-3 bg-white/5 border-white/10">
                    <div className="font-black">SHIPFREE</div>
                    <div className="text-sm text-white/70">Livraison offerte</div>
                    <div className="text-xs text-white/60 mt-1">Valable dès 49€</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </NexusShell>
    </AuthGate>
  );
}