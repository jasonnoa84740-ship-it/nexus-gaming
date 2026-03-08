import fs from "fs"
import path from "path"

const root = process.cwd()
const keywordsPath = path.join(root, "data", "keywords.json")

const configs = [
  {
    category: "screen",
    type: "money",
    bases: ["ecran gaming"],
    modifiers: ["144hz", "165hz", "180hz", "240hz", "pas cher", "27 pouces", "incurve", "ps5"]
  },
  {
    category: "mouse",
    type: "money",
    bases: ["souris gaming"],
    modifiers: ["fps", "pas cher", "sans fil", "légère", "fortnite", "valorant"]
  },
  {
    category: "keyboard",
    type: "money",
    bases: ["clavier gaming"],
    modifiers: ["mecanique", "tkl", "60 pourcent", "rgb", "pas cher"]
  },
  {
    category: "headset",
    type: "money",
    bases: ["casque gaming"],
    modifiers: ["ps5", "xbox", "sans fil", "pas cher", "call of duty"]
  },
  {
    category: "setup",
    type: "guide",
    bases: ["setup gaming"],
    modifiers: ["pas cher", "500 euros", "1000 euros", "blanc", "noir", "streamer"]
  }
]

const manual = [
  { keyword: "meilleur ecran gaming", type: "money", category: "screen" },
  { keyword: "meilleure souris gaming", type: "money", category: "mouse" },
  { keyword: "meilleur clavier gaming", type: "money", category: "keyboard" },
  { keyword: "meilleur casque gaming", type: "money", category: "headset" },
  { keyword: "meilleur micro streaming", type: "money", category: "streaming" },
  { keyword: "webcam streaming pas cher", type: "money", category: "streaming" },
  { keyword: "meilleur fauteuil gaming", type: "money", category: "chair" },
  { keyword: "bureau gaming pas cher", type: "money", category: "desk" },
  { keyword: "setup gaming pas cher", type: "guide", category: "setup" },
  { keyword: "accessoires gaming indispensables", type: "blog", category: "accessories" }
]

const generated = []

for (const config of configs) {
  for (const base of config.bases) {
    for (const modifier of config.modifiers) {
      generated.push({
        keyword: `${base} ${modifier}`,
        type: config.type,
        category: config.category
      })
    }
  }
}

const merged = [...manual, ...generated]

const unique = Array.from(
  new Map(merged.map((item) => [item.keyword.toLowerCase(), item])).values()
)

fs.writeFileSync(keywordsPath, JSON.stringify(unique, null, 2), "utf8")
console.log(`✅ ${unique.length} keywords générés dans data/keywords.json`)