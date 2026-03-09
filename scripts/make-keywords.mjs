import fs from "fs"
import path from "path"

const root = process.cwd()
const productsPath = path.join(root, "data", "products.json")
const keywordsPath = path.join(root, "data", "keywords.json")

const products = fs.existsSync(productsPath)
  ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
  : []

const categoryLabels = {
  screen: "ecran gaming",
  mouse: "souris gaming",
  keyboard: "clavier gaming",
  headset: "casque gaming",
  micro: "micro gaming",
  webcam: "webcam streaming",
  chair: "chaise gaming",
  desk: "bureau gaming"
}

const categoryIntents = {
  screen: ["144hz", "240hz", "ps5", "pas cher", "27 pouces", "incurve"],
  mouse: ["fps", "sans fil", "pas cher", "legere", "ergonomique", "mmo"],
  keyboard: ["mecanique", "tkl", "60 pourcent", "rgb", "sans fil", "pas cher"],
  headset: ["ps5", "xbox", "sans fil", "pas cher", "micro", "fps"],
  micro: ["streaming", "usb", "pas cher", "debutant", "pro"],
  webcam: ["1080p", "streaming", "pas cher", "pro", "4k"],
  chair: ["ergonomique", "pas cher", "confortable", "grand gabarit"],
  desk: ["pas cher", "grand", "petit espace", "streaming", "angle"]
}

const guideKeywords = {
  screen: [
    "comment choisir un ecran gaming",
    "ecran gaming 144hz ou 240hz",
    "quelle taille d ecran gaming choisir"
  ],
  mouse: [
    "comment choisir une souris gaming",
    "quelle souris gaming pour fps",
    "souris gaming legere ou ergonomique"
  ],
  keyboard: [
    "comment choisir un clavier gaming",
    "clavier gaming tkl ou full size",
    "quel switch choisir pour un clavier gaming"
  ],
  headset: [
    "comment choisir un casque gaming",
    "casque gaming filaire ou sans fil",
    "meilleur casque gaming pour ps5"
  ],
  micro: [
    "comment choisir un micro gaming",
    "quel micro pour streamer",
    "micro usb ou xlr pour streaming"
  ],
  webcam: [
    "comment choisir une webcam streaming",
    "webcam 1080p ou 4k pour streamer",
    "quelle webcam pour twitch"
  ],
  chair: [
    "comment choisir une chaise gaming",
    "chaise gaming ou fauteuil de bureau",
    "quelle chaise gaming choisir"
  ],
  desk: [
    "comment choisir un bureau gaming",
    "quel bureau gaming pour petit espace",
    "bureau gaming ou bureau classique"
  ]
}

const budgets = ["moins de 50 euros", "moins de 100 euros", "moins de 200 euros"]
const platforms = ["pc", "ps5", "xbox"]

function normalizeKeyword(keyword) {
  return keyword
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
}

function addKeyword(target, keyword, type, category, source = "generated") {
  const clean = normalizeKeyword(keyword)
  if (!clean) return
  target.push({
    keyword: clean,
    type,
    category,
    source
  })
}

const output = []

for (const [category, base] of Object.entries(categoryLabels)) {
  addKeyword(output, `meilleur ${base}`, "money", category)
  addKeyword(output, `guide ${base}`, "guide", category)
  addKeyword(output, base, "money", category)

  for (const modifier of categoryIntents[category] || []) {
    addKeyword(output, `${base} ${modifier}`, "money", category)
    addKeyword(output, `meilleur ${base} ${modifier}`, "money", category)
  }

  for (const budget of budgets) {
    addKeyword(output, `${base} ${budget}`, "guide", category)
    addKeyword(output, `meilleur ${base} ${budget}`, "money", category)
  }

  for (const platform of platforms) {
    addKeyword(output, `${base} ${platform}`, "money", category)
    addKeyword(output, `meilleur ${base} ${platform}`, "money", category)
  }

  for (const guide of guideKeywords[category] || []) {
    addKeyword(output, guide, "guide", category)
  }
}

for (const product of products) {
  const category = product.normalizedCategory
  const title = product.title.toLowerCase()
  const brand = title.split(" ")[0]

  addKeyword(output, `test ${title}`, "blog", category, "product")
  addKeyword(output, `avis ${title}`, "blog", category, "product")
  addKeyword(output, `${title} test`, "blog", category, "product")
  addKeyword(output, `meilleur ${categoryLabels[category]} ${brand}`, "money", category, "brand")

  if (product.normalizedBadge === "budget") {
    addKeyword(output, `${categoryLabels[category]} pas cher`, "money", category, "badge")
  }

  if (product.normalizedBadge === "wireless") {
    addKeyword(output, `${categoryLabels[category]} sans fil`, "money", category, "badge")
  }

  if (product.normalizedBadge === "pro") {
    addKeyword(output, `${categoryLabels[category]} pro`, "money", category, "badge")
  }

  if (product.normalizedBadge === "fps") {
    addKeyword(output, `${categoryLabels[category]} fps`, "money", category, "badge")
  }
}

const unique = Array.from(
  new Map(output.map((item) => [normalizeKeyword(item.keyword), item])).values()
)

unique.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category)
  if (a.type !== b.type) return a.type.localeCompare(b.type)
  return a.keyword.localeCompare(b.keyword)
})

fs.writeFileSync(keywordsPath, JSON.stringify(unique, null, 2), "utf8")

console.log(`✅ ${unique.length} keywords générés dans data/keywords.json`)