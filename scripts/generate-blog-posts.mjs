import fs from "fs"
import path from "path"

const root = process.cwd()
const keywordsPath = path.join(root, "data", "keywords.json")
const blogPostsPath = path.join(root, "data", "blog-posts.json")

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function makeBlogTitle(keyword) {
  return `Guide complet : ${capitalize(keyword)}`
}

function makeBlog(keyword) {
  const slug = slugify(keyword)

  return {
    slug,
    title: makeBlogTitle(keyword),
    description: `Découvrez notre guide complet sur ${keyword}, avec conseils, erreurs à éviter et bonnes pratiques.`,
    intro: `Dans cet article, nous allons voir comment bien choisir ${keyword} et éviter les erreurs classiques.`,
    sections: [
      {
        title: `Pourquoi ${keyword} intéresse autant les joueurs ?`,
        content: `${capitalize(keyword)} fait partie des recherches fréquentes chez les joueurs qui veulent améliorer leur setup sans se tromper.`
      },
      {
        title: "Les critères importants",
        content: "Il faut d'abord regarder l'usage, le budget, la qualité du produit, sa compatibilité et sa durabilité."
      },
      {
        title: "Les erreurs à éviter",
        content: "Le plus gros piège consiste à acheter trop vite sans comparer les caractéristiques essentielles."
      }
    ],
    updatedAt: new Date().toISOString()
  }
}

const keywords = JSON.parse(fs.readFileSync(keywordsPath, "utf8"))
const existing = fs.existsSync(blogPostsPath)
  ? JSON.parse(fs.readFileSync(blogPostsPath, "utf8"))
  : []

const existingMap = new Map(existing.map((post) => [post.slug, post]))

const generated = keywords
  .filter((k) => k.type === "blog" || k.type === "guide")
  .map((k) => makeBlog(k.keyword))
  .filter((post) => !existingMap.has(post.slug))

const merged = [...existing, ...generated]

fs.writeFileSync(blogPostsPath, JSON.stringify(merged, null, 2), "utf8")

console.log(`✅ ${generated.length} nouveaux articles blog générés.`)