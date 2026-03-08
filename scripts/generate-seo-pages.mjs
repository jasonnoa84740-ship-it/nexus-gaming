import fs from "fs"
import path from "path"

const root = process.cwd()
const keywordsPath = path.join(root, "data", "keywords.json")
const seoPagesPath = path.join(root, "data", "seo-pages.json")

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
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function pickIntent(type) {
  if (type === "money") return "commerciale"
  if (type === "guide") return "informationnelle"
  return "editoriale"
}

function buildSections(keyword, type) {
  const readable = sentenceCase(keyword)

  if (type === "money") {
    return [
      {
        title: `Pourquoi choisir ${keyword} ?`,
        content: `${readable} peut vraiment améliorer l'expérience de jeu selon le budget, le niveau d'exigence et le type de jeux pratiqués. L'objectif est de trouver le bon équilibre entre performances, confort, fiabilité et prix.`
      },
      {
        title: `Quels critères regarder avant d'acheter ${keyword} ?`,
        content: `Avant d'acheter ${keyword}, il faut comparer les caractéristiques techniques, le confort d'utilisation, la qualité de fabrication, les avis utilisateurs et le rapport qualité/prix.`
      },
      {
        title: `Notre conseil pour bien choisir ${keyword}`,
        content: `Le meilleur choix dépend de votre usage. Pour un joueur compétitif, les performances pures comptent beaucoup. Pour un usage polyvalent, mieux vaut viser un produit équilibré, fiable et durable.`
      }
    ]
  }

  if (type === "guide") {
    return [
      {
        title: `Comment réussir ${keyword} ?`,
        content: `Pour réussir ${keyword}, il faut définir un budget clair, prioriser les éléments les plus importants, puis chercher le meilleur compromis entre prix et qualité.`
      },
      {
        title: "Les erreurs à éviter",
        content: "Le piège classique consiste à tout investir dans un seul élément et à négliger le reste du setup. Il vaut mieux garder une cohérence globale."
      },
      {
        title: "Notre méthode",
        content: "Nous recommandons de partir d'une base solide, puis d'améliorer progressivement le setup selon les besoins réels et les promotions disponibles."
      }
    ]
  }

  return [
    {
      title: `${readable} : ce qu'il faut savoir`,
      content: `${readable} attire de plus en plus de joueurs qui veulent améliorer leur setup. Il est donc utile de comparer les options et de comprendre les critères importants avant d'acheter.`
    },
    {
      title: "Comment bien comparer ?",
      content: `Comparer ${keyword} demande de regarder l'usage, le budget, la compatibilité avec le setup et les points qui comptent vraiment au quotidien.`
    },
    {
      title: "Notre avis",
      content: "Nous conseillons de choisir des produits utiles, bien notés et cohérents avec un vrai besoin plutôt que de suivre uniquement les tendances."
    }
  ]
}

function buildFaq(keyword) {
  return [
    {
      question: `Comment choisir ${keyword} ?`,
      answer: `Pour choisir ${keyword}, il faut comparer les performances, le confort, la qualité globale, le budget et l'usage prévu.`
    },
    {
      question: `${sentenceCase(keyword)} vaut-il le coup ?`,
      answer: "Oui, à condition de choisir un modèle adapté à son usage et d'éviter les produits mal équilibrés ou trop chers pour ce qu'ils apportent."
    },
    {
      question: `Quel budget prévoir pour ${keyword} ?`,
      answer: "Le budget dépend de la gamme visée. Le plus important reste le rapport qualité/prix et la cohérence avec votre setup."
    }
  ]
}

function buildPage(entry) {
  const keyword = entry.keyword.trim()
  const slug = slugify(keyword)
  const intent = pickIntent(entry.type)

  return {
    slug,
    keyword,
    type: entry.type,
    category: entry.category,
    intent,
    title: `${sentenceCase(keyword)} 2026 | NexusGamingFR`,
    description: `Guide complet pour choisir ${keyword} : conseils, comparatif, critères importants et recommandations utiles pour bien acheter.`,
    h1: sentenceCase(keyword),
    intro: `Vous cherchez ${keyword} ? Ce guide a été conçu pour vous aider à faire le bon choix selon votre budget, votre style de jeu et vos priorités.`,
    sections: buildSections(keyword, entry.type),
    faq: buildFaq(keyword),
    relatedSlugs: [],
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

const keywords = JSON.parse(fs.readFileSync(keywordsPath, "utf8"))
const existing = fs.existsSync(seoPagesPath)
  ? JSON.parse(fs.readFileSync(seoPagesPath, "utf8"))
  : []

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