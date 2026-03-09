import fs from "fs"
import path from "path"

const root = process.cwd()
const productsPath = path.join(root, "data", "products.json")
const outputPath = path.join(root, "data", "product-pages.json")

const products = fs.existsSync(productsPath)
  ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
  : []

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

function getBrand(title = "") {
  return title.split(" ")[0]?.trim() || ""
}

function findRelatedProducts(product, allProducts) {
  return allProducts
    .filter((p) => p.id !== product.id)
    .filter((p) => p.normalizedCategory === product.normalizedCategory)
    .slice(0, 6)
}

function buildProductPage(product, allProducts) {
  const label = categoryLabel(product.normalizedCategory)
  const brand = getBrand(product.title)

  return {
    slug: `produit/${product.slug}`,
    productId: product.id,
    category: product.normalizedCategory,
    brand,
    title: `${product.title} : avis, alternatives et guide d'achat`,
    h1: product.title,
    description: `Découvrez notre avis sur ${product.title}, ses points forts, le profil de joueur visé et les alternatives à regarder.`,
    intro: `${product.title} fait partie des produits intéressants dans la catégorie ${label}. Cette page vous aide à comprendre à qui il s'adresse et quelles alternatives peuvent aussi valoir le coup.`,
    sections: [
      {
        title: `Pourquoi regarder ${product.title} ?`,
        content: `${product.title} attire l'attention des joueurs qui cherchent une option cohérente dans la catégorie ${label}. Son positionnement dépend de son niveau de gamme, de son badge et du type d'usage visé.`
      },
      {
        title: "À quel profil ce produit correspond-il ?",
        content: `Ce produit peut être pertinent si vous cherchez une solution adaptée à votre setup actuel, sans vous fier uniquement à la popularité de la référence.`
      },
      {
        title: "Quelles alternatives comparer ?",
        content: `Avant de choisir, il reste utile de comparer plusieurs produits proches en gamme, en usage ou en philosophie. Cela permet d'éviter les achats impulsifs et de viser une meilleure cohérence.`
      }
    ],
    faq: [
      {
        question: `${product.title} vaut-il le coup ?`,
        answer: `Cela dépend surtout de votre budget, de votre usage et des alternatives disponibles dans la même catégorie.`
      },
      {
        question: `À qui s'adresse ${product.title} ?`,
        answer: `Ce produit s'adresse surtout aux joueurs qui cherchent une option cohérente avec leur setup et leurs priorités.`
      }
    ],
    featuredProduct: product,
    relatedProducts: findRelatedProducts(product, allProducts),
    updatedAt: new Date().toISOString()
  }
}

const pages = products.map((product) => buildProductPage(product, products))

fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2), "utf8")

console.log(`✅ ${pages.length} pages produit générées dans data/product-pages.json`)