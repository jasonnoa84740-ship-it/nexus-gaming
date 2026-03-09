import fs from "fs"
import path from "path"

const root = process.cwd()
const productsPath = path.join(root, "data", "products.json")
const outputPath = path.join(root, "data", "collection-pages.json")

const products = fs.existsSync(productsPath)
  ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
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

function categoryLabel(category) {
  const map = {
    screen: "écrans gaming",
    mouse: "souris gaming",
    keyboard: "claviers gaming",
    headset: "casques gaming",
    micro: "micros gaming",
    webcam: "webcams streaming",
    chair: "chaises gaming",
    desk: "bureaux gaming"
  }
  return map[category] || "accessoires gaming"
}

function categorySingular(category) {
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

function getBrand(title = "") {
  return title.split(" ")[0]?.trim() || "marque"
}

function buildTopCategoryPages(allProducts) {
  const categories = [...new Set(allProducts.map((p) => p.normalizedCategory))]
  const pages = []

  for (const category of categories) {
    const categoryProducts = allProducts.filter((p) => p.normalizedCategory === category)

    pages.push({
      slug: `top-${slugify(categoryLabel(category))}`,
      type: "collection_top_category",
      category,
      title: `Top ${categoryLabel(category)} 2026`,
      h1: `Top ${categoryLabel(category)}`,
      description: `Découvrez notre sélection des meilleurs ${categoryLabel(category)} avec comparatif, conseils et produits recommandés.`,
      intro: `Cette page regroupe les ${categoryLabel(category)} les plus intéressants du moment selon le budget, les usages et les profils de joueurs.`,
      featuredProducts: categoryProducts.slice(0, 12),
      bestProducts: categoryProducts.filter((p) => p.normalizedBadge === "best").slice(0, 6),
      budgetProducts: categoryProducts.filter((p) => p.normalizedBadge === "budget").slice(0, 6),
      proProducts: categoryProducts.filter((p) => p.normalizedBadge === "pro").slice(0, 6),
      updatedAt: new Date().toISOString()
    })
  }

  return pages
}

function buildBadgePages(allProducts) {
  const usefulBadges = ["budget", "best", "pro", "wireless", "fps", "stream"]
  const categories = [...new Set(allProducts.map((p) => p.normalizedCategory))]
  const pages = []

  for (const category of categories) {
    const categoryProducts = allProducts.filter((p) => p.normalizedCategory === category)

    for (const badge of usefulBadges) {
      const selected = categoryProducts.filter(
        (p) => p.normalizedBadge === badge || p.tags.includes(badge)
      )

      if (selected.length < 2) continue

      pages.push({
        slug: `${slugify(categorySingular(category))}-${slugify(badge)}`,
        type: "collection_badge",
        category,
        badge,
        title: `${sentenceCase(categoryLabel(category))} ${badge} : notre sélection`,
        h1: `${sentenceCase(categoryLabel(category))} ${badge}`,
        description: `Notre sélection de ${categoryLabel(category)} orientés ${badge}, avec conseils et produits à regarder.`,
        intro: `Cette page met en avant les ${categoryLabel(category)} qui correspondent le mieux à une recherche orientée ${badge}.`,
        featuredProducts: selected.slice(0, 12),
        updatedAt: new Date().toISOString()
      })
    }
  }

  return pages
}

function buildBrandPages(allProducts) {
  const brandMap = new Map()

  for (const product of allProducts) {
    const brand = getBrand(product.title)
    const key = `${product.normalizedCategory}::${brand}`

    if (!brandMap.has(key)) {
      brandMap.set(key, {
        category: product.normalizedCategory,
        brand,
        products: []
      })
    }

    brandMap.get(key).products.push(product)
  }

  const pages = []

  for (const [, entry] of brandMap) {
    if (entry.products.length < 2) continue

    pages.push({
      slug: `${slugify(categorySingular(entry.category))}-${slugify(entry.brand)}`,
      type: "collection_brand",
      category: entry.category,
      brand: entry.brand,
      title: `${sentenceCase(categoryLabel(entry.category))} ${entry.brand}`,
      h1: `${sentenceCase(categoryLabel(entry.category))} ${entry.brand}`,
      description: `Guide et sélection des meilleurs ${categoryLabel(entry.category)} de la marque ${entry.brand}.`,
      intro: `Cette page regroupe les modèles ${entry.brand} les plus intéressants dans la catégorie ${categoryLabel(entry.category)}.`,
      featuredProducts: entry.products.slice(0, 12),
      updatedAt: new Date().toISOString()
    })
  }

  return pages
}

const topPages = buildTopCategoryPages(products)
const badgePages = buildBadgePages(products)
const brandPages = buildBrandPages(products)

const allPages = [...topPages, ...badgePages, ...brandPages]

fs.writeFileSync(outputPath, JSON.stringify(allPages, null, 2), "utf8")

console.log(`✅ ${allPages.length} pages collection générées dans data/collection-pages.json`)