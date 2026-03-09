import fs from "fs"
import path from "path"

const root = process.cwd()
const keywordsPath = path.join(root, "data", "keywords.json")
const productsPath = path.join(root, "data", "products.json")
const blogPostsPath = path.join(root, "data", "blog-posts.json")
const collectionPagesPath = path.join(root, "data", "collection-pages.json")
const seoPagesPath = path.join(root, "data", "seo-pages.json")

const keywords = JSON.parse(fs.readFileSync(keywordsPath, "utf8"))
const products = fs.existsSync(productsPath)
  ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
  : []
const blogPosts = fs.existsSync(blogPostsPath)
  ? JSON.parse(fs.readFileSync(blogPostsPath, "utf8"))
  : []
const collectionPages = fs.existsSync(collectionPagesPath)
  ? JSON.parse(fs.readFileSync(collectionPagesPath, "utf8"))
  : []
const existing = fs.existsSync(seoPagesPath)
  ? JSON.parse(fs.readFileSync(seoPagesPath, "utf8"))
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

function sentenceCase(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
}

function pickIntent(type) {
  if (type === "money") return "commerciale"
  if (type === "guide") return "informationnelle"
  return "editoriale"
}

function categoryLabel(category) {
  const map = {
    screen: "écran gaming",
    mouse: "souris gaming",
    keyboard: "clavier gaming",
    headset: "casque gaming",
    micro: "micro gaming",
    webcam: "webcam streaming",
    chair: "chaise gaming",
    desk: "bureau gaming"
  }
  return map[category] || "accessoire gaming"
}

function makeTitle(keyword, type) {
  const readable = sentenceCase(keyword)

  if (type === "money") return `${readable} : comparatif, conseils et sélection 2026`
  if (type === "guide") return `${readable} : guide complet pour bien choisir en 2026`
  return `${readable} : conseils et repères utiles en 2026`
}

function makeDescription(keyword, type) {
  if (type === "money") {
    return `Découvrez notre sélection pour ${keyword} : critères à comparer, conseils d'achat et recommandations utiles pour trouver le bon modèle.`
  }
  if (type === "guide") {
    return `Guide complet sur ${keyword} avec conseils pratiques, erreurs à éviter et points clés pour faire le bon choix.`
  }
  return `Tout ce qu'il faut savoir sur ${keyword} avec conseils, explications simples et liens utiles pour améliorer votre setup gaming.`
}

function detectTraits(keyword = "") {
  const text = keyword.toLowerCase()
  return {
    budget: text.includes("pas cher") || text.includes("moins de"),
    wireless: text.includes("sans fil"),
    ps5: text.includes("ps5"),
    xbox: text.includes("xbox"),
    pc: text.includes("pc"),
    fps: text.includes("fps") || text.includes("valorant") || text.includes("fortnite") || text.includes("call of duty"),
    streaming: text.includes("streaming") || text.includes("streamer") || text.includes("twitch") || text.includes("youtube"),
    pro: text.includes("pro"),
    tkl: text.includes("tkl"),
    compact: text.includes("60 pourcent") || text.includes("compact")
  }
}

function pickProductsForPage(entry, allProducts) {
  const categoryProducts = allProducts.filter((p) => p.normalizedCategory === entry.category)
  const traits = detectTraits(entry.keyword)

  let filtered = [...categoryProducts]

  if (traits.wireless) filtered = filtered.filter((p) => p.tags.includes("wireless") || p.normalizedBadge === "wireless")
  if (traits.fps) filtered = filtered.filter((p) => p.tags.includes("fps") || p.normalizedBadge === "fps" || p.normalizedBadge === "pro")
  if (traits.budget) filtered = filtered.filter((p) => p.normalizedBadge === "budget")
  if (traits.pro) filtered = filtered.filter((p) => p.normalizedBadge === "pro")
  if (traits.streaming) filtered = filtered.filter((p) => p.tags.includes("streaming") || p.normalizedBadge === "stream")
  if (traits.tkl) filtered = filtered.filter((p) => p.tags.includes("tkl"))
  if (traits.compact) filtered = filtered.filter((p) => p.tags.includes("compact") || p.tags.includes("60-percent"))

  if (filtered.length < 3) filtered = categoryProducts

  const best = filtered.filter((p) => p.normalizedBadge === "best").slice(0, 3)
  const budget = categoryProducts.filter((p) => p.normalizedBadge === "budget").slice(0, 3)
  const pro = categoryProducts.filter((p) => p.normalizedBadge === "pro").slice(0, 3)
  const wireless = categoryProducts.filter((p) => p.normalizedBadge === "wireless" || p.tags.includes("wireless")).slice(0, 3)
  const featured = filtered.slice(0, 6)

  return {
    featuredProducts: featured,
    bestProducts: best,
    budgetProducts: budget,
    proProducts: pro,
    wirelessProducts: wireless
  }
}

function categoryIntro(entry) {
  const readable = sentenceCase(entry.keyword)

  const intros = {
    screen: `${readable} peut transformer l'expérience de jeu grâce à une meilleure fluidité, une meilleure lisibilité et un meilleur confort visuel. Le bon choix dépend surtout de la fréquence, de la taille et du type d'usage visé.`,
    mouse: `${readable} influence directement la précision, la rapidité et le confort en jeu. Pour bien choisir, il faut regarder la forme, le capteur, le poids et la cohérence avec votre style de jeu.`,
    keyboard: `${readable} reste un élément central d'un setup. Entre les formats, les switches et la qualité de frappe, les différences entre modèles sont loin d'être anecdotiques.`,
    headset: `${readable} joue autant sur l'immersion que sur la communication. Le bon casque dépend du confort, de la qualité audio, du micro et de la compatibilité avec votre plateforme.`,
    micro: `${readable} peut faire une vraie différence si vous jouez souvent en vocal, créez du contenu ou streamez. L'essentiel est de viser un rendu propre, simple à exploiter et cohérent avec votre budget.`,
    webcam: `${readable} devient vite important si vous streamez ou si vous voulez une image plus propre en visio et sur vos contenus. Il faut surtout regarder la qualité d'image, la gestion de la lumière et la simplicité d'installation.`,
    chair: `${readable} doit améliorer le confort et la posture avant tout. Le meilleur choix repose sur l'assise, les réglages, le maintien et la qualité des matériaux.`,
    desk: `${readable} sert de base à tout le setup. Taille, profondeur, stabilité et gestion des câbles comptent bien plus qu'un simple look gaming.`
  }

  return intros[entry.category] || `Ce guide sur ${entry.keyword} vous aide à comparer les critères importants, éviter les erreurs courantes et choisir une option adaptée à votre usage.`
}

function buildSections(entry) {
  const keyword = entry.keyword
  const label = categoryLabel(entry.category)
  const traits = detectTraits(keyword)

  const generic = [
    {
      title: `Comment bien choisir ${keyword} ?`,
      content: `Pour bien choisir ${keyword}, il faut comparer les éléments qui ont un impact réel à l'usage : confort, qualité générale, cohérence avec votre setup et rapport qualité/prix.`
    },
    {
      title: `Quels critères regarder pour ${keyword} ?`,
      content: `Le choix d'un bon ${label} dépend moins du marketing que de l'usage réel. Il faut prioriser les critères vraiment utiles au quotidien plutôt que les fiches techniques trop flatteuses.`
    },
    {
      title: "Les erreurs à éviter",
      content: `Le piège classique consiste à choisir trop vite un produit populaire sans vérifier s'il correspond à votre budget, votre plateforme ou vos habitudes de jeu.`
    },
    {
      title: "Notre conseil",
      content: `Le meilleur choix reste celui qui équilibre performances, confort, durabilité et prix. Une solution cohérente vaut souvent mieux qu'un modèle extrême mais mal adapté.`
    }
  ]

  const categorySpecific = {
    screen: [
      {
        title: `Faut-il privilégier la fluidité ou la qualité d'image ?`,
        content: `Pour les FPS compétitifs, la fluidité et la réactivité restent prioritaires. Pour un usage plus polyvalent, une bonne dalle et un bon équilibre global sont souvent plus intéressants qu'un simple nombre de hertz élevé.`
      }
    ],
    mouse: [
      {
        title: `Poids, forme et capteur : que faut-il vraiment prioriser ?`,
        content: `Sur une souris gaming, la forme et la prise en main comptent énormément. Un bon capteur est important, mais le confort et la régularité sur la durée restent souvent encore plus décisifs.`
      }
    ],
    keyboard: [
      {
        title: `Quel format choisir ?`,
        content: `Un clavier compact ou TKL libère de la place pour la souris, tandis qu'un format complet reste plus polyvalent. Le bon choix dépend surtout de votre bureau et de vos habitudes.`
      }
    ],
    headset: [
      {
        title: `Confort, audio ou micro : quelle priorité ?`,
        content: `Un casque gaming doit rester équilibré. Pour les longues sessions, le confort est essentiel. Pour le multi, la clarté du micro compte beaucoup. Pour l'immersion, la précision audio reste clé.`
      }
    ],
    micro: [
      {
        title: `USB ou solution plus avancée ?`,
        content: `Pour beaucoup de joueurs et créateurs débutants, un bon micro USB suffit largement. Le plus important est d'avoir un son propre, stable et simple à exploiter.`
      }
    ],
    webcam: [
      {
        title: `1080p ou 4K : faut-il vraiment viser plus haut ?`,
        content: `Une bonne webcam 1080p bien utilisée peut suffire dans de nombreux cas. La 4K devient surtout intéressante si vous avez déjà un setup cohérent et de vraies attentes en qualité d'image.`
      }
    ],
    chair: [
      {
        title: `Chaise gaming ou fauteuil de bureau ?`,
        content: `Le design gaming ne garantit pas le confort. Selon vos priorités, un bon fauteuil de bureau peut parfois être plus cohérent qu'une chaise très marquée visuellement mais moyenne sur l'ergonomie.`
      }
    ],
    desk: [
      {
        title: `Quelle taille choisir pour un bon setup ?`,
        content: `Le bon bureau doit laisser assez d'espace pour l'écran, la souris, le clavier et le reste du setup. Un bureau trop petit devient vite limitant, même s'il semble joli sur le papier.`
      }
    ]
  }

  const out = [...generic]
  if (categorySpecific[entry.category]) {
    out.splice(2, 0, ...categorySpecific[entry.category])
  }

  if (traits.budget) {
    out.push({
      title: `Comment trouver un bon ${label} sans trop dépenser ?`,
      content: `Sur une recherche orientée budget, le but est surtout d'éviter les modèles tape-à-l'œil mal équilibrés. Il vaut mieux viser des produits simples, fiables et cohérents.`
    })
  }

  return out
}

function buildFaq(entry) {
  const keyword = entry.keyword
  return [
    {
      question: `Comment choisir ${keyword} ?`,
      answer: `Il faut comparer l'usage, le budget, la qualité globale et la cohérence avec votre setup. Les meilleurs choix sont rarement les plus marketing.`
    },
    {
      question: `Quel budget prévoir pour ${keyword} ?`,
      answer: `Le bon budget dépend du niveau de gamme visé, mais le plus important reste le rapport qualité/prix et l'équilibre général du produit.`
    },
    {
      question: `${sentenceCase(keyword)} vaut-il le coup ?`,
      answer: `Oui, à condition de choisir un modèle ou une solution vraiment adaptée à vos besoins réels et non simplement populaire.`
    }
  ]
}

function makeRelatedBlogSlugs(keyword, relatedCategory, posts) {
  const words = keyword.toLowerCase().split(" ").filter(Boolean)
  return posts
    .filter((post) => post.category === relatedCategory || words.some((w) => `${post.title} ${post.description}`.toLowerCase().includes(w)))
    .slice(0, 4)
    .map((post) => post.slug)
}

function makeRelatedCollectionSlugs(category, collections) {
  return collections
    .filter((page) => page.category === category)
    .slice(0, 4)
    .map((page) => page.slug)
}

function buildPage(entry) {
  const slug = slugify(entry.keyword)
  const productGroups = pickProductsForPage(entry, products)

  return {
    slug,
    keyword: entry.keyword,
    type: entry.type,
    category: entry.category,
    intent: pickIntent(entry.type),
    title: makeTitle(entry.keyword, entry.type),
    description: makeDescription(entry.keyword, entry.type),
    h1: sentenceCase(entry.keyword),
    intro: categoryIntro(entry),
    sections: buildSections(entry),
    faq: buildFaq(entry),
    featuredProducts: productGroups.featuredProducts,
    bestProducts: productGroups.bestProducts,
    budgetProducts: productGroups.budgetProducts,
    proProducts: productGroups.proProducts,
    wirelessProducts: productGroups.wirelessProducts,
    relatedSlugs: [],
    relatedBlogSlugs: makeRelatedBlogSlugs(entry.keyword, entry.category, blogPosts),
    relatedCollectionSlugs: makeRelatedCollectionSlugs(entry.category, collectionPages),
    seoScore: 90,
    status: "generated",
    updatedAt: new Date().toISOString()
  }
}

function buildInternalLinks(pages) {
  return pages.map((page) => {
    const related = pages
      .filter((p) => p.slug !== page.slug)
      .filter((p) => p.category === page.category || p.type === page.type)
      .slice(0, 6)
      .map((p) => p.slug)

    return {
      ...page,
      relatedSlugs: related
    }
  })
}

const existingMap = new Map(existing.map((p) => [p.slug, p]))
const generated = []

for (const entry of keywords) {
  const page = buildPage(entry)
  if (!existingMap.has(page.slug)) {
    generated.push(page)
  }
}

const merged = [...existing, ...generated]
const withLinks = buildInternalLinks(merged)

fs.writeFileSync(seoPagesPath, JSON.stringify(withLinks, null, 2), "utf8")

console.log(`✅ ${generated.length} nouvelles pages SEO générées.`)
console.log(`📦 Total actuel: ${withLinks.length} pages.`)