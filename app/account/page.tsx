import { Suspense } from "react";
import AccountClient from "./AccountClient";

export const dynamic = "force-dynamic"; // évite le pre-render statique (recommandé pour pages user)

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center text-white/70">
          Chargement du compte…
        </div>
      }
    >
      <AccountClient />
    </Suspense>
  );
}