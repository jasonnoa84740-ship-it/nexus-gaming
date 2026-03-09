import fs from "fs"
import path from "path"

const root = process.cwd()
const keywordsPath = path.join(root, "data", "keywords.json")
const seoPagesPath = path.join(root, "data", "seo-pages.json")
const productsPath = path.join(root, "data", "products.json")
const collectionPagesPath = path.join(root, "data", "collection-pages.json")
const blogPostsPath = path.join(root, "data", "blog-posts.json")

const keywords = JSON.parse(fs.readFileSync(keywordsPath, "utf8"))
const seoPages = fs.existsSync(seoPagesPath)
  ? JSON.parse(fs.readFileSync(seoPagesPath, "utf8"))
  : []
const products = fs.existsSync(productsPath)
  ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
  : []
const collectionPages = fs.existsSync(collectionPagesPath)
  ? JSON.parse(fs.readFileSync(collectionPagesPath, "utf8"))
  : []
const existing = fs.existsSync(blogPostsPath)
  ? JSON.parse(fs.readFileSync(blogPostsPath, "utf8"))
  : []

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
}

function makeBlogTitle(keyword, category) {
  const readable = capitalize(keyword)

  const map = {
    screen: `Comment bien choisir ${keyword} en 2026`,
    mouse: `Guide pratique : ${keyword}`,
    keyboard: `Tout savoir sur ${keyword}`,
    headset: `Guide complet : ${keyword}`,
    micro: `Quel ${keyword} choisir ?`,
    webcam: `Comment bien choisir ${keyword}`,
    chair: `Guide d'achat : ${keyword}`,
    desk: `Guide complet : ${keyword}`
  }

  return map[category] || `Guide complet : ${readable}`
}

function makeDescription(keyword) {
  return `Découvrez notre guide complet sur ${keyword}, avec conseils pratiques, erreurs à éviter et repères utiles pour faire le bon choix.`
}

function pickProducts(entry, allProducts) {
  const categoryProducts = allProducts.filter((p) => p.normalizedCategory === entry.category)
  return {
    featured: categoryProducts.slice(0, 5),
    budget: categoryProducts.filter((p) => p.normalizedBadge === "budget").slice(0, 3),
    pro: categoryProducts.filter((p) => p.normalizedBadge === "pro").slice(0, 3)
  }
}

function buildArticleSections(keyword, category) {
  const readable = capitalize(keyword)

  const base = [
    {
      title: `Pourquoi ${keyword} intéresse autant les joueurs ?`,
      content: `${readable} revient souvent dans les recherches des joueurs qui veulent améliorer leur setup sans se tromper. Ce type de choix paraît simple au départ, mais il y a souvent de grosses différences entre les modèles.`
    },
    {
      title: "Les critères les plus importants",
      content: `Pour faire le bon choix, il faut comparer l'usage réel, le budget, la qualité générale, la durabilité, la compatibilité et les points qui auront un vrai impact au quotidien.`
    },
    {
      title: "Les erreurs à éviter",
      content: `Le plus gros piège consiste à acheter trop vite un produit mis en avant partout sans vérifier s'il correspond vraiment à votre besoin. Les meilleurs choix sont souvent les plus cohérents, pas forcément les plus spectaculaires.`
    },
    {
      title: "Notre méthode",
      content: `Nous conseillons de partir d'un budget clair, de trier les critères essentiels, puis de comparer uniquement les modèles qui répondent vraiment à votre usage.`
    }
  ]

  const specific = {
    screen: {
      title: "Fréquence, dalle et taille : comment arbitrer ?",
      content: `Sur un écran gaming, la fréquence de rafraîchissement attire beaucoup l'attention, mais la qualité de dalle, la taille et la cohérence avec la machine comptent tout autant.`
    },
    mouse: {
      title: "Forme, poids et précision : les vrais critères",
      content: `Pour une souris gaming, la forme et la prise en main comptent énormément. Un bon capteur ne compense pas une souris inconfortable ou mal adaptée à votre style de jeu.`
    },
    keyboard: {
      title: "Format, switches et confort de frappe",
      content: `Un clavier gaming doit être agréable à utiliser sur la durée. Le format, la sensation de frappe et le niveau sonore peuvent complètement changer l'expérience.`
    },
    headset: {
      title: "Confort, micro et immersion",
      content: `Sur un casque gaming, le confort sur plusieurs heures reste aussi important que la qualité audio. Le micro devient lui aussi crucial si vous jouez souvent en vocal.`
    },
    micro: {
      title: "Faut-il viser simple ou plus avancé ?",
      content: `Dans beaucoup de cas, un bon micro simple suffit largement. L'important est d'avoir un rendu clair, propre et facile à mettre en place.`
    },
    webcam: {
      title: "Quelle qualité d'image viser ?",
      content: `Une webcam correcte bien utilisée peut suffire à produire une image propre. Il vaut souvent mieux un modèle équilibré que des promesses 4K peu utiles dans un setup moyen.`
    },
    chair: {
      title: "Posture et confort avant le style",
      content: `Une chaise gaming doit d'abord améliorer le maintien et le confort. Le design seul ne garantit rien sur la durée.`
    },
    desk: {
      title: "Le bureau comme base du setup",
      content: `Un bon bureau gaming doit surtout être stable, pratique et adapté à l'espace disponible. Une base saine améliore toute l'organisation du setup.`
    }
  }

  if (specific[category]) {
    base.splice(2, 0, specific[category])
  }

  return base
}

function buildFaq(keyword) {
  return [
    {
      question: `Comment bien choisir ${keyword} ?`,
      answer: `Il faut comparer l'usage, le budget, la qualité générale et la cohérence avec votre setup. Une option équilibrée reste souvent le meilleur choix.`
    },
    {
      question: `Quel budget prévoir pour ${keyword} ?`,
      answer: `Le bon budget dépend du niveau de gamme visé, mais le rapport qualité/prix reste le critère le plus important.`
    },
    {
      question: `${capitalize(keyword)} vaut-il le coup ?`,
      answer: `Oui, à condition de viser un modèle cohérent avec vos besoins réels plutôt qu'un produit simplement populaire.`
    }
  ]
}

function findRelatedSeoSlugs(entry, pages) {
  return pages
    .filter((page) => page.category === entry.category || page.keyword.includes(entry.keyword.split(" ")[0]))
    .slice(0, 6)
    .map((page) => page.slug)
}

function findRelatedCollectionSlugs(entry, collections) {
  return collections
    .filter((page) => page.category === entry.category)
    .slice(0, 4)
    .map((page) => page.slug)
}

function makeBlog(entry) {
  const keyword = entry.keyword.trim()
  const slug = slugify(keyword)
  const productGroups = pickProducts(entry, products)

  return {
    slug,
    keyword,
    category: entry.category,
    type: entry.type,
    title: makeBlogTitle(keyword, entry.category),
    description: makeDescription(keyword),
    intro: `Dans cet article, nous allons voir comment bien comprendre ${keyword}, éviter les erreurs classiques et repérer les critères qui comptent vraiment avant d'acheter.`,
    sections: buildArticleSections(keyword, entry.category),
    faq: buildFaq(keyword),
    featuredProducts: productGroups.featured,
    budgetProducts: productGroups.budget,
    proProducts: productGroups.pro,
    relatedSeoSlugs: findRelatedSeoSlugs(entry, seoPages),
    relatedCollectionSlugs: findRelatedCollectionSlugs(entry, collectionPages),
    status: "generated",
    updatedAt: new Date().toISOString()
  }
}

const existingMap = new Map(existing.map((post) => [post.slug, post]))

const generated = keywords
  .filter((k) => k.type === "blog" || k.type === "guide")
  .map((k) => makeBlog(k))
  .filter((post) => !existingMap.has(post.slug))

const merged = [...existing, ...generated]

fs.writeFileSync(blogPostsPath, JSON.stringify(merged, null, 2), "utf8")

console.log(`✅ ${generated.length} nouveaux articles blog générés.`)
console.log(`📝 Total actuel: ${merged.length} articles.`)