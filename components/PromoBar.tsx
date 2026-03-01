export default function PromoBar() {
  return (
     <div className="sticky top-0 z-[60] shadow-md">
      <div className="mx-auto w-full">
        <div className="border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">🔥</span>
              <span className="font-semibold">-10%</span> avec <span className="font-semibold">NEXUS10</span>
            </span>
            <span className="text-white/40">•</span>
            <span>🚚 Livraison offerte dès <span className="font-semibold">79€</span></span>
            <span className="text-white/40">•</span>
            <span>⚡ Stock limité sur les RTX</span>
          </div>
        </div>
      </div>
    </div>
  );
}