import NexusShell from "@/components/NexusShell";

const deals = [
  {
    title: "Souris Gaming RGB 7200 DPI",
    price: "19,99€",
    desc: "Souris gamer précise, RGB, idéale setup pas cher.",
    link: "https://amzn.to/4u0u0hk",
    image: "https://m.media-amazon.com/images/I/71Kr3WAj1FL._AC_SL1500_.jpg",
  },
  {
    title: "Casque Gaming PS5 / PC",
    price: "39,99€",
    desc: "Son surround, micro antibruit, très bon rapport qualité/prix.",
    link: "https://amzn.to/4u0u0hk",
    image: "https://m.media-amazon.com/images/I/71BKQhFzDmL._AC_SL1500_.jpg",
  },
  {
    title: "Clavier Mécanique RGB",
    price: "49,99€",
    desc: "Switches mécaniques, rétroéclairage RGB, parfait gaming.",
    link: "https://amzn.to/4u0u0hk",
    image: "https://m.media-amazon.com/images/I/71uXnU7L5rL._AC_SL1500_.jpg",
  },
];

export default function BonsPlansPage() {
  return (
    <NexusShell
      title="🔥 Bons Plans Gaming Amazon"
      subtitle="Sélection d’accessoires gaming au meilleur prix."
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {deals.map((item, i) => (
            <div key={i} className="nx-card p-4">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-xl w-full h-48 object-cover"
              />

              <h3 className="mt-4 font-bold text-lg">{item.title}</h3>
              <p className="text-white/70 text-sm mt-1">{item.desc}</p>

              <div className="mt-3 font-black text-xl">
                {item.price}
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn nx-btn-primary w-full mt-4 text-center"
              >
                Voir sur Amazon
              </a>
            </div>
          ))}
        </div>
      </section>
    </NexusShell>
  );
}