import fs from "fs"
import path from "path"

const root = process.cwd()
const filePath = path.join(root, "lib", "amazonProducts.ts")

if (!fs.existsSync(filePath)) {
  console.error("❌ Fichier introuvable : lib/amazonProducts.ts")
  process.exit(1)
}

const content = fs.readFileSync(filePath, "utf8")

const categoryToFolder = {
  Ecran: "ecran",
  Souris: "souris",
  Clavier: "clavier",
  Casque: "casque",
  Micro: "micro",
  Webcam: "webcam",
  Chaise: "chaise",
  Bureau: "bureau",
}

const productRegex =
  /\{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?\}/g

const found = []
let match

while ((match = productRegex.exec(content)) !== null) {
  const [, id, title, category, image] = match
  found.push({ id, title, category, image })
}

if (found.length === 0) {
  console.log("⚠️ Aucun produit détecté. Vérifie le format de amazonProducts.ts")
  process.exit(0)
}

const ids = new Map()
const errors = []
const warnings = []

for (const product of found) {
  const { id, title, category, image } = product

  if (ids.has(id)) {
    errors.push(`ID dupliqué: ${id}`)
  } else {
    ids.set(id, true)
  }

  if (!image || image.trim() === "") {
    errors.push(`Image vide pour ${id} (${title})`)
    continue
  }

  if (!image.startsWith("/")) {
    warnings.push(`Image sans / au début pour ${id}: ${image}`)
  }

  const imageFilePath = path.join(root, "public", image.replace(/^\//, ""))
  if (!fs.existsSync(imageFilePath)) {
    errors.push(`Image introuvable pour ${id}: ${image}`)
  }

  const expectedFolder = categoryToFolder[category]
  if (expectedFolder && !image.startsWith(`/${expectedFolder}/`) && !image.startsWith("/products/")) {
    warnings.push(
      `Image potentiellement incohérente pour ${id} (${category}) => ${image} ; attendu plutôt /${expectedFolder}/...`
    )
  }
}

console.log(`📦 Produits analysés: ${found.length}`)
console.log(`❌ Erreurs: ${errors.length}`)
console.log(`⚠️ Avertissements: ${warnings.length}`)
console.log("")

if (errors.length > 0) {
  console.log("=== ERREURS ===")
  for (const err of errors) {
    console.log(`- ${err}`)
  }
  console.log("")
}

if (warnings.length > 0) {
  console.log("=== AVERTISSEMENTS ===")
  for (const warn of warnings) {
    console.log(`- ${warn}`)
  }
  console.log("")
}

if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ Tout a l'air propre.")
}