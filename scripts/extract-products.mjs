import fs from "fs"
import path from "path"

const root = process.cwd()
const inputPath = path.join(root, "lib", "amazonProducts.ts")
const outputDir = path.join(root, "data")
const outputPath = path.join(outputDir, "products.json")

function normalizeCategory(category = "") {
  const map = {
    Ecran: "screen",
    Souris: "mouse",
    Clavier: "keyboard",
    Casque: "headset",
    Micro: "micro",
    Webcam: "webcam",
    Chaise: "chair",
    Bureau: "desk"
  }
  return map[category] || "accessories"
}

function normalizeBadge(badge = "") {
  return String(badge || "").trim().toLowerCase()
}

function inferTags(title = "", badge = "", query = "") {
  const text = `${title} ${badge} ${query}`.toLowerCase()
  const tags = new Set()

  if (text.includes("wireless") || text.includes("sans fil")) tags.add("wireless")
  if (text.includes("budget") || text.includes("pas cher")) tags.add("budget")
  if (text.includes("pro")) tags.add("pro")
  if (text.includes("fps")) tags.add("fps")
  if (text.includes("stream")) tags.add("streaming")
  if (text.includes("best")) tags.add("best")
  if (text.includes("compact")) tags.add("compact")
  if (text.includes("light") || text.includes("leger")) tags.add("light")
  if (text.includes("ergo") || text.includes("ergonom")) tags.add("ergonomic")
  if (text.includes("mmo")) tags.add("mmo")
  if (text.includes("ps5")) tags.add("ps5")
  if (text.includes("xbox")) tags.add("xbox")
  if (text.includes("pc")) tags.add("pc")
  if (text.includes("tkl")) tags.add("tkl")
  if (text.includes("60%") || text.includes("60 pourcent")) tags.add("60-percent")
  if (text.includes("144hz")) tags.add("144hz")
  if (text.includes("165hz")) tags.add("165hz")
  if (text.includes("180hz")) tags.add("180hz")
  if (text.includes("240hz")) tags.add("240hz")
  if (text.includes("4k")) tags.add("4k")
  if (text.includes("incurv")) tags.add("curved")

  return Array.from(tags)
}

const raw = fs.readFileSync(inputPath, "utf8")

const objectBlocks = raw.match(/\{[^{}]*id:\s*"[^"]+"[\s\S]*?amazonUrl:\s*"[^"]*"[\s\S]*?\}/g) || []

const products = objectBlocks.map((block) => {
  const id = (block.match(/id:\s*"([^"]+)"/) || [])[1] || ""
  const title = (block.match(/title:\s*"([^"]+)"/) || [])[1] || ""
  const subtitle = (block.match(/subtitle:\s*"([^"]+)"/) || [])[1] || ""
  const category = (block.match(/category:\s*"([^"]+)"/) || [])[1] || ""
  const image = (block.match(/image:\s*"([^"]+)"/) || [])[1] || ""
  const query = (block.match(/query:\s*"([^"]+)"/) || [])[1] || ""
  const amazonUrl = (block.match(/amazonUrl:\s*"([^"]*)"/) || [])[1] || ""
  const badge = (block.match(/badge:\s*"([^"]+)"/) || [])[1] || ""

  return {
    id,
    slug: id,
    title,
    subtitle,
    category,
    normalizedCategory: normalizeCategory(category),
    image,
    query,
    amazonUrl,
    badge,
    normalizedBadge: normalizeBadge(badge),
    tags: inferTags(title, badge, query),
    hasAffiliateUrl: Boolean(amazonUrl && amazonUrl.trim()),
    updatedAt: new Date().toISOString()
  }
}).filter((p) => p.id && p.title && p.category)

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), "utf8")

console.log(`✅ ${products.length} produits extraits dans data/products.json`)