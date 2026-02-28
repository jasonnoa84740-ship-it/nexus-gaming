"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthGate from "@/components/AuthGate";

type Tab = "settings" | "orders" | "tracking" | "promos";

type ProfileRow = {
  id: string;
  pseudo: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  marketing_emails: boolean | null;
  notify_shipping: boolean | null;
};

type AddressRow = {
  id: string;
  user_id: string;
  label: string | null;
  full_name: string | null;
  phone: string | null;
  line1: string;
  line2: string | null;
  city: string;
  postal_code: string;
  country: string | null;
  is_default: boolean | null;
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
    >
      {label}
    </button>
  );
}

function Step({
  title,
  done,
  current,
  desc,
}: {
  title: string;
  done?: boolean;
  current?: boolean;
  desc?: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="pt-1">
        <div
          className={[
            "h-3 w-3 rounded-full border",
            done
              ? "bg-white border-white/60"
              : current
              ? "bg-white/30 border-white/50"
              : "bg-transparent border-white/20",
          ].join(" ")}
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        {desc ? <div className="text-xs text-white/60 mt-0.5">{desc}</div> : null}
      </div>
    </div>
  );
}

function AccountInner() {
  const router = useRouter();
  const params = useSearchParams();
  const tab = ((params.get("tab") as Tab) || "settings") satisfies Tab;

  const [user, setUser] = useState<any>(null);

  // profile fields
  const [pseudo, setPseudo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [notifyShipping, setNotifyShipping] = useState(true);

  const [msg, setMsg] = useState<string | null>(null);

  const [orders, setOrders] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<AddressRow[]>([]);

  // address form
  const [aLabel, setALabel] = useState("Maison");
  const [aFullName, setAFullName] = useState("");
  const [aPhone, setAPhone] = useState("");
  const [aLine1, setALine1] = useState("");
  const [aLine2, setALine2] = useState("");
  const [aCity, setACity] = useState("");
  const [aPostal, setAPostal] = useState("");
  const [aCountry, setACountry] = useState("FR");
  const [aDefault, setADefault] = useState(true);

  function setTab(next: Tab) {
    router.replace(`/account?tab=${next}`);
  }

  async function loadAll() {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    setUser(u.user ?? null);

    if (!uid) return;

    // profile (table profiles)
    const { data: prof } = await supabase
      .from("profiles")
      .select("id,pseudo,first_name,last_name,phone,marketing_emails,notify_shipping")
      .eq("id", uid)
      .maybeSingle();

    if (prof) {
      const p = prof as ProfileRow;
      setPseudo(p.pseudo || u.user?.user_metadata?.pseudo || "");
      setFirstName(p.first_name || "");
      setLastName(p.last_name || "");
      setPhone(p.phone || "");
      setMarketingEmails(Boolean(p.marketing_emails));
      setNotifyShipping(p.notify_shipping == null ? true : Boolean(p.notify_shipping));
    } else {
      setPseudo(u.user?.user_metadata?.pseudo || "");
    }

    // orders
    const { data: o } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(o || []);

    // promos
    const { data: p } = await supabase
      .from("promo_codes")
      .select("*")
      .order("percent", { ascending: false });
    setPromos(p || []);

    // addresses
    const { data: a } = await supabase
      .from("addresses")
      .select("*")
      .order("created_at", { ascending: false });
    setAddresses((a as any) || []);
  }

  useEffect(() => {
    void loadAll();
  }, []);

  async function saveProfile() {
    setMsg(null);

    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) return setMsg("Erreur: utilisateur introuvable");

    // Update auth metadata too (for header)
    const up1 = await supabase.auth.updateUser({ data: { pseudo } });
    if (up1.error) return setMsg("Erreur: " + up1.error.message);

    // Upsert profiles row
    const { error } = await supabase.from("profiles").upsert({
      id: uid,
      pseudo,
      first_name: firstName || null,
      last_name: lastName || null,
      phone: phone || null,
      marketing_emails: marketingEmails,
      notify_shipping: notifyShipping,
    });

    if (error) setMsg("Erreur: " + error.message);
    else setMsg("✅ Réglages enregistrés");
  }

  async function addAddress() {
    setMsg(null);

    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) return setMsg("Erreur: utilisateur introuvable");

    if (!aLine1.trim() || !aCity.trim() || !aPostal.trim()) {
      return setMsg("⚠️ Adresse incomplète (ligne 1, ville, code postal).");
    }

    // if default: unset others
    if (aDefault) {
      await supabase.from("addresses").update({ is_default: false }).eq("user_id", uid);
    }

    const { error } = await supabase.from("addresses").insert({
      user_id: uid,
      label: aLabel || "Maison",
      full_name: aFullName || null,
      phone: aPhone || null,
      line1: aLine1,
      line2: aLine2 || null,
      city: aCity,
      postal_code: aPostal,
      country: aCountry || "FR",
      is_default: aDefault,
    });

    if (error) return setMsg("Erreur: " + error.message);

    // reset form
    setALabel("Maison");
    setAFullName("");
    setAPhone("");
    setALine1("");
    setALine2("");
    setACity("");
    setAPostal("");
    setACountry("FR");
    setADefault(true);

    setMsg("✅ Adresse ajoutée");
    await loadAll();
  }

  async function deleteAddress(id: string) {
    setMsg(null);
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) setMsg("Erreur: " + error.message);
    else {
      setMsg("✅ Adresse supprimée");
      await loadAll();
    }
  }

  async function setDefaultAddress(id: string) {
    setMsg(null);

    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) return;

    await supabase.from("addresses").update({ is_default: false }).eq("user_id", uid);
    const { error } = await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    if (error) setMsg("Erreur: " + error.message);
    else {
      setMsg("✅ Adresse par défaut mise à jour");
      await loadAll();
    }
  }

  async function sendResetPassword() {
    setMsg(null);
    const email = user?.email;
    if (!email) return setMsg("Erreur: email introuvable");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback`,
    });

    if (error) setMsg("Erreur: " + error.message);
    else setMsg("✅ Email de réinitialisation envoyé (vérifie tes mails).");
  }

  const trackingSteps = useMemo(() => {
    // Démo: on prend la 1ère commande
    const o = orders?.[0];
    const status = String(o?.tracking_status || "Préparation");

    const steps = ["Préparation", "Expédié", "En transit", "Livré"] as const;

    const idx = steps.findIndex((s) => s.toLowerCase() === status.toLowerCase());
    const current = idx === -1 ? 0 : idx;

    return { steps, current, order: o };
  }, [orders]);

  return (
    <AuthGate>
      <div className="nx-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">Mon compte</h1>
            <p className="text-white/70 mt-1">{user?.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <TabBtn active={tab === "settings"} label="⚙️ Réglages" onClick={() => setTab("settings")} />
            <TabBtn active={tab === "orders"} label="📦 Commandes" onClick={() => setTab("orders")} />
            <TabBtn active={tab === "tracking"} label="🚚 Suivi" onClick={() => setTab("tracking")} />
            <TabBtn active={tab === "promos"} label="🎟️ Codes promo" onClick={() => setTab("promos")} />
          </div>
        </div>

        {msg ? <div className="mt-4 text-sm text-white/80">{msg}</div> : null}

        <div className="mt-6">
          {tab === "settings" && (
            <div className="grid lg:grid-cols-2 gap-4">
              {/* PROFIL */}
              <div className="nx-card p-4 bg-white/5 border-white/10">
                <div className="text-lg font-black">Mes infos</div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/60">Pseudo</label>
                    <input className="nx-input w-full" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Téléphone</label>
                    <input className="nx-input w-full" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06..." />
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Prénom</label>
                    <input className="nx-input w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Nom</label>
                    <input className="nx-input w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input type="checkbox" checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />
                    Recevoir les promos / newsletters
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input type="checkbox" checked={notifyShipping} onChange={(e) => setNotifyShipping(e.target.checked)} />
                    Notifications de suivi livraison
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={saveProfile} className="nx-btn nx-btn-primary">
                    Enregistrer
                  </button>
                  <button onClick={sendResetPassword} className="nx-btn nx-btn-ghost">
                    🔐 Réinitialiser mon mot de passe
                  </button>
                </div>

                <div className="mt-3 text-xs text-white/50">
                  (À venir: moyens de paiement, préférences avancées, sécurité 2FA…)
                </div>
              </div>

              {/* ADRESSES */}
              <div className="nx-card p-4 bg-white/5 border-white/10">
                <div className="text-lg font-black">Mes adresses</div>

                {addresses.length ? (
                  <div className="mt-3 space-y-2">
                    {addresses.map((a) => (
                      <div key={a.id} className="nx-card p-3 bg-white/5 border-white/10">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold">
                              {a.label || "Adresse"}{" "}
                              {a.is_default ? <span className="text-xs text-white/60">• Défaut</span> : null}
                            </div>
                            <div className="text-sm text-white/70">
                              {a.full_name ? `${a.full_name} • ` : ""}
                              {a.line1}
                              {a.line2 ? `, ${a.line2}` : ""},{" "}
                              {a.postal_code} {a.city} ({a.country || "FR"})
                            </div>
                            {a.phone ? <div className="text-xs text-white/60 mt-1">📞 {a.phone}</div> : null}
                          </div>

                          <div className="flex gap-2">
                            {!a.is_default ? (
                              <button
                                className="nx-btn nx-btn-ghost"
                                onClick={() => setDefaultAddress(a.id)}
                              >
                                Mettre défaut
                              </button>
                            ) : null}
                            <button className="nx-btn nx-btn-ghost" onClick={() => deleteAddress(a.id)}>
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-white/70">Aucune adresse enregistrée.</div>
                )}

                <div className="mt-4">
                  <div className="font-semibold">Ajouter une adresse</div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input className="nx-input" value={aLabel} onChange={(e) => setALabel(e.target.value)} placeholder="Label (Maison, Travail)" />
                    <input className="nx-input" value={aFullName} onChange={(e) => setAFullName(e.target.value)} placeholder="Nom complet" />
                    <input className="nx-input sm:col-span-2" value={aLine1} onChange={(e) => setALine1(e.target.value)} placeholder="Adresse (ligne 1) *" />
                    <input className="nx-input sm:col-span-2" value={aLine2} onChange={(e) => setALine2(e.target.value)} placeholder="Adresse (ligne 2)" />
                    <input className="nx-input" value={aPostal} onChange={(e) => setAPostal(e.target.value)} placeholder="Code postal *" />
                    <input className="nx-input" value={aCity} onChange={(e) => setACity(e.target.value)} placeholder="Ville *" />
                    <input className="nx-input" value={aCountry} onChange={(e) => setACountry(e.target.value)} placeholder="Pays (FR)" />
                    <input className="nx-input" value={aPhone} onChange={(e) => setAPhone(e.target.value)} placeholder="Téléphone (optionnel)" />
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm text-white/70">
                    <input type="checkbox" checked={aDefault} onChange={(e) => setADefault(e.target.checked)} />
                    Définir comme adresse par défaut
                  </label>

                  <button onClick={addAddress} className="nx-btn nx-btn-primary mt-3">
                    Ajouter l’adresse
                  </button>
                </div>
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
            <div className="nx-card p-5 bg-white/5 border-white/10">
              <div className="text-lg font-black">Suivi de livraison</div>
              {trackingSteps.order ? (
                <>
                  <div className="text-sm text-white/70 mt-1">
                    Dernière commande : #{String(trackingSteps.order.id).slice(0, 8)}
                    {trackingSteps.order.tracking_number ? ` • ${trackingSteps.order.tracking_number}` : ""}
                  </div>

                  <div className="mt-4 space-y-3">
                    <Step
                      title="Préparation"
                      done={trackingSteps.current > 0}
                      current={trackingSteps.current === 0}
                      desc="On prépare ton colis dans notre entrepôt."
                    />
                    <Step
                      title="Expédié"
                      done={trackingSteps.current > 1}
                      current={trackingSteps.current === 1}
                      desc="Le colis est remis au transporteur."
                    />
                    <Step
                      title="En transit"
                      done={trackingSteps.current > 2}
                      current={trackingSteps.current === 2}
                      desc="Ton colis se rapproche (centres de tri)."
                    />
                    <Step
                      title="Livré"
                      done={trackingSteps.current >= 3}
                      current={trackingSteps.current === 3}
                      desc="Colis livré. Bon game !"
                    />
                  </div>

                  <div className="mt-4 text-xs text-white/60">
                    (Prochain upgrade: tracking réel transporteur + historique des scans)
                  </div>
                </>
              ) : (
                <div className="mt-3 text-white/70">Aucune commande à suivre.</div>
              )}
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