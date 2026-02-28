import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6">
      <div className="nx-card p-8 max-w-xl w-full">
        <div className="text-2xl font-black">Paiement réussi ✅</div>
        <p className="text-white/70 mt-2">
          Merci ! (Pour un vrai site : on valide la commande via webhook Stripe.)
        </p>
        <Link href="/" className="nx-btn nx-btn-primary mt-6 inline-flex">
          Retour à la boutique →
        </Link>
      </div>
    </div>
  );
}