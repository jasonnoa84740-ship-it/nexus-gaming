import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { chromium } from "playwright";

const AFFILIATE_TAG = "nexusgamingfr-21";

const SETTINGS = {
  headless: false,
  slowMo: 150,
  concurrency: 1,
  maxCardsToInspect: 10,
  minScoreToOpen: 7,
  minScoreToAccept: 10,
  requestTimeout: 60000,
  retryCount: 1,
  searchDelayMs: 2500,
  productDelayMs: 3500,
  saveEvery: 2,
  batchSize: 12, // traite seulement 12 produits par run pour éviter les blocages Amazon
};

const EXCLUDED_CATEGORIES = new Set(["Souris", "Ecran"]);

const categoryFolderMap = {
  Ecran: "ecran",
  Souris: "souris",
  Clavier: "clavier",
  Casque: "casque",
  Micro: "micro",
  Webcam: "webcam",
  Chaise: "chaise",
  Bureau: "bureau",
};

const genericCategoryImages = new Set([
  "/products/ecran.jpg",
  "/products/souris.jpg",
  "/products/clavier.jpg",
  "/products/casque.jpg",
  "/products/micro.jpg",
  "/products/webcam.jpg",
  "/products/chaise.jpg",
  "/products/bureau.jpg",
]);

const outputDir = path.join(process.cwd(), "scripts", "output");
const outputJson = path.join(outputDir, "all-product-data.json");
const matchedJson = path.join(outputDir, "matched-products.json");
const rejectedJson = path.join(outputDir, "rejected-products.json");
const reportJson = path.join(outputDir, "report.json");
const cacheJson = path.join(outputDir, "fetch-cache.json");
const overridesJson = path.join(process.cwd(), "data", "product-overrides.json");

const seenImageHashes = new Set();

const BRAND_LIST = [
  "logitech", "razer", "steelseries", "corsair", "hyperx", "asus", "msi", "aoc",
  "samsung", "lg", "benq", "gigabyte", "alienware", "acer", "viewsonic", "koorui",
  "iiyama", "philips", "hp", "elgato", "blue", "fifine", "rode", "shure", "samson",
  "maono", "tonor", "trust", "akg", "nzxt", "turtle", "jbl", "sony", "keychron",
  "roccat", "glorious", "cooler", "dell", "creative", "obsbot", "anker", "insta360",
  "microsoft", "avermedia", "nexigo", "aukey", "ugreen", "gtplayer", "dowinx",
  "autofull", "dxracer", "noblechairs", "secretlab", "andaseat", "cougar",
  "vertagear", "gtracing", "homall", "hbada", "respawn", "brazen", "nitro",
  "sihoo", "songmics", "arozzi", "eureka", "cubicubi", "vitesse", "rolanstar",
  "greenforest", "flexispot", "sanodesk", "fezibo", "desino", "atlantic", "mars", "odk",
];

const weakWords = new Set([
  "gaming", "monitor", "moniteur", "ecran", "mouse", "souris", "keyboard", "clavier",
  "headset", "casque", "micro", "microphone", "webcam", "chair", "chaise", "desk",
  "bureau", "wireless", "rgb", "usb", "pro", "best", "edition", "new", "sans", "fil",
  "avec", "pour", "the", "and", "de", "du", "des", "a", "la", "le"
]);

const hardForbiddenPhrases = [
  "for logitech",
  "for razer",
  "for steelseries",
  "for corsair",
  "for hyperx",
  "for asus",
  "for samsung",
  "for lg",
  "pour logitech",
  "pour razer",
  "pour steelseries",
  "pour corsair",
  "pour hyperx",
  "pour asus",
  "compatible with",
  "compatible avec",
  "replacement ear pads",
  "coussinets de rechange",
  "support ecran",
  "support écran",
  "bras ecran",
  "bras écran",
  "monitor arm",
  "desk mount",
  "mouse pad",
  "tapis de souris",
  "keyboard and mouse",
  "clavier et souris",
  "souris et clavier",
  "headset and microphone",
  "casque et micro",
  "micro et casque",
  "desk and chair",
  "bureau et chaise",
  "chair and desk",
  "pack clavier souris",
  "pack souris clavier",
  "gaming combo",
  "gaming set",
  "starter bundle",
  "bundle pack",
  "retail box",
  "in box",
  "boxed",
  "new in box",
  "produit en boite",
  "produit en boîte",
  "avec boite",
  "avec boîte",
];

function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/["'’`()]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str) {
  return normalize(str).split(" ").filter(Boolean);
}

function uniq(arr) {
  return [...new Set(arr)];
}

function sha1(buffer) {
  return crypto.createHash("sha1").update(buffer).digest("hex");
}

function fileExists(filePath) {
  try {
    fsSync.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function randomDelay(min = 1500, max = 4000) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractAsin(url) {
  if (!url) return null;
  const match = url.match(
    /\/dp\/([A-Z0-9]{10})|\/gp\/product\/([A-Z0-9]{10})|\/product\/([A-Z0-9]{10})/i
  );
  return match ? (match[1] || match[2] || match[3] || "").toUpperCase() : null;
}

function buildAffiliateUrl(asin) {
  return asin ? `https://www.amazon.fr/dp/${asin}?tag=${AFFILIATE_TAG}` : "";
}

function getCategoryFolder(category) {
  return categoryFolderMap[category] || "products";
}

function hasComboSignals(title) {
  const got = normalize(title);

  const comboPairs = [
    ["keyboard", "mouse"],
    ["clavier", "souris"],
    ["headset", "microphone"],
    ["casque", "micro"],
    ["desk", "chair"],
    ["bureau", "chaise"],
  ];

  for (const [a, b] of comboPairs) {
    if (got.includes(a) && got.includes(b)) return true;
  }

  return (
    got.includes("combo") ||
    got.includes("bundle") ||
    got.includes("pack") ||
    got.includes("set") ||
    got.includes("ensemble")
  );
}

function hasPackagingSignals(title) {
  const got = normalize(title);
  const packagingWords = [
    "box", "boite", "boîte", "packaging", "retail box", "coffret", "carton",
    "boxed", "new in box", "in box", "avec boite", "avec boîte",
  ];
  return packagingWords.some((word) => got.includes(normalize(word)));
}

function hasAccessorySignals(title) {
  const got = normalize(title);
  const accessoryWords = [
    "support", "mount", "stand", "arm", "bracket", "case", "housse", "etui", "étui",
    "replacement", "spare", "coque", "sticker", "skin", "cable", "adaptateur",
    "adapter", "dock", "base", "holder", "clip", "protector", "film",
    "coussinet", "oreillettes", "mouse pad", "tapis de souris", "wrist rest",
    "repose poignet", "accessory", "accessoire", "compatible",
  ];
  return accessoryWords.some((word) => got.includes(normalize(word)));
}

function extractBrand(title) {
  const n = normalize(title);
  return BRAND_LIST.find((brand) => n.includes(brand)) || null;
}

function extractCriticalTokens(title) {
  const tokens = tokenize(title);

  return uniq(
    tokens.filter((token) => {
      if (!token || weakWords.has(token)) return false;
      if (/[a-z]*\d+[a-z\d-]*/i.test(token)) return true;
      if (token.length >= 6) return true;
      return false;
    })
  );
}

function analyzeProductIdentity(product) {
  const title = normalize(product.title);
  const brand = extractBrand(title);
  const criticalTokens = extractCriticalTokens(title);

  const tokens = tokenize(title).filter((t) => !weakWords.has(t));
  const familyTokens = tokens.filter((t) => t.length >= 4 && !/[a-z]*\d+[a-z\d-]*/i.test(t));

  return {
    brand,
    criticalTokens,
    familyTokens: uniq(familyTokens),
  };
}

function analyzeCandidate(product, amazonTitle) {
  const productId = analyzeProductIdentity(product);
  const got = normalize(amazonTitle);

  const candidateBrand = extractBrand(amazonTitle);
  const brandOk = !productId.brand || candidateBrand === productId.brand;

  const criticalMatched = productId.criticalTokens.filter((t) => got.includes(t));
  const criticalMissing = productId.criticalTokens.filter((t) => !got.includes(t));

  const familyMatched = productId.familyTokens.filter((t) => got.includes(t));
  const familyMissing = productId.familyTokens.filter((t) => !got.includes(t));

  return {
    brand: productId.brand,
    candidateBrand,
    brandOk,
    criticalTokens: productId.criticalTokens,
    criticalMatched,
    criticalMissing,
    familyTokens: productId.familyTokens,
    familyMatched,
    familyMissing,
  };
}

function scoreTitle(product, amazonTitle) {
  const got = normalize(amazonTitle);
  const identity = analyzeCandidate(product, amazonTitle);

  let score = 0;

  if (identity.brandOk) score += 5;
  else score -= 20;

  score += identity.criticalMatched.length * 6;
  score -= identity.criticalMissing.length * 4;

  score += identity.familyMatched.length * 2;

  if (hasComboSignals(amazonTitle)) score -= 25;
  if (hasPackagingSignals(amazonTitle)) score -= 14;
  if (hasAccessorySignals(amazonTitle)) score -= 18;

  for (const bad of hardForbiddenPhrases) {
    if (got.includes(normalize(bad))) score -= 15;
  }

  return score;
}

function classifyMatch(product, amazonTitle, score) {
  const identity = analyzeCandidate(product, amazonTitle);
  const reasons = [];

  if (!identity.brandOk) {
    reasons.push(`marque différente (${identity.candidateBrand || "inconnue"})`);
  }

  if (hasComboSignals(amazonTitle)) {
    reasons.push("pack/combo détecté");
  }

  if (hasPackagingSignals(amazonTitle)) {
    reasons.push("packaging/boite détecté");
  }

  if (hasAccessorySignals(amazonTitle)) {
    reasons.push("accessoire détecté");
  }

  const criticalCount = identity.criticalTokens.length;
  const criticalMatched = identity.criticalMatched.length;

  const enoughModelMatch =
    criticalCount === 0 ||
    criticalMatched >= Math.max(1, Math.ceil(criticalCount * 0.5));

  if (!enoughModelMatch) {
    reasons.push("modèle/référence insuffisamment présent");
  }

  if (score < SETTINGS.minScoreToAccept) {
    reasons.push(`score trop faible (${score})`);
  }

  if (reasons.length > 0) {
    return {
      status: "rejected",
      reason: reasons.join(" | "),
      identity,
    };
  }

  return {
    status: "matched",
    reason: "marque et nom cohérents",
    identity,
  };
}

function simplifyTitle(title) {
  return String(title || "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(sans fil|wireless|gaming|pro|best|edition|compact|budget|stream)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSearchQueries(product) {
  const base = product.title;
  const simple = simplifyTitle(product.title);
  const brand = extractBrand(product.title) || "";
  const categoryHints = {
    Clavier: "clavier",
    Casque: "casque",
    Micro: "micro",
    Webcam: "webcam",
    Chaise: "chaise",
    Bureau: "bureau",
  };

  const cat = categoryHints[product.category] || "";

  return uniq(
    [
      `${base} ${cat}`,
      `${simple} ${cat}`,
      base,
      simple,
      brand && simple ? `${brand} ${simple}` : "",
    ]
      .map((q) => q.trim())
      .filter(Boolean)
  );
}

function loadProductsFromTs() {
  const filePath = path.join(process.cwd(), "lib", "amazonProducts.ts");
  const raw = fsSync.readFileSync(filePath, "utf8");

  const objectRegex =
    /id:\s*(['"])(.*?)\1[\s\S]*?title:\s*(['"])(.*?)\3[\s\S]*?category:\s*(['"])(.*?)\5[\s\S]*?image:\s*(['"])(.*?)\7[\s\S]*?amazonUrl:\s*(['"])(.*?)\9/g;

  const products = [];
  let match;

  while ((match = objectRegex.exec(raw)) !== null) {
    const id = match[2];
    const title = match[4];
    const category = match[6];
    const image = match[8];
    const amazonUrl = match[10];

    if (!id || !title || !category || !image) continue;
    if (EXCLUDED_CATEGORIES.has(category)) continue;

    const isMissingImage = genericCategoryImages.has(image);
    const isMissingUrl = !amazonUrl || !amazonUrl.trim();

    if (isMissingImage || isMissingUrl) {
      products.push({
        id,
        title,
        category,
        image,
        amazonUrl,
      });
    }
  }

  return products;
}

async function ensureDirs() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });

  for (const folder of Object.values(categoryFolderMap)) {
    await fs.mkdir(path.join(process.cwd(), "public", folder), { recursive: true });
  }
}

async function loadJsonSafe(file, fallback) {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function saveOutputs(state) {
  const all = [...state.matched, ...state.rejected];

  const overrides = {};
  for (const item of state.matched) {
    overrides[item.id] = {
      image: item.image,
      amazonUrl: item.amazonUrl,
      asin: item.asin,
      amazonTitle: item.amazonTitle,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      score: item.score,
      status: item.status,
    };
  }

  const report = {
    total: state.total,
    processed: state.processedIds.length,
    matched: state.matched.length,
    rejected: state.rejected.length,
    excludedCategories: [...EXCLUDED_CATEGORIES],
    timestamp: new Date().toISOString(),
    settings: SETTINGS,
  };

  const cache = {
    processedIds: state.processedIds,
    matchedIds: state.matched.map((x) => x.id),
    rejectedIds: state.rejected.map((x) => x.id),
    excludedCategories: [...EXCLUDED_CATEGORIES],
    timestamp: new Date().toISOString(),
  };

  await fs.writeFile(outputJson, JSON.stringify(all, null, 2), "utf8");
  await fs.writeFile(matchedJson, JSON.stringify(state.matched, null, 2), "utf8");
  await fs.writeFile(rejectedJson, JSON.stringify(state.rejected, null, 2), "utf8");
  await fs.writeFile(reportJson, JSON.stringify(report, null, 2), "utf8");
  await fs.writeFile(overridesJson, JSON.stringify(overrides, null, 2), "utf8");
  await fs.writeFile(cacheJson, JSON.stringify(cache, null, 2), "utf8");
}

async function acceptCookies(page) {
  const selectors = [
    "#sp-cc-accept",
    'input[name="accept"]',
    'button:has-text("Accepter")',
    'button:has-text("Accept")',
    'input[data-action-type="DISMISS"]',
  ];

  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 1200 })) {
        await el.click();
        await page.waitForTimeout(400);
        return true;
      }
    } catch {}
  }

  return false;
}

async function handleCaptcha(page) {
  const url = page.url().toLowerCase();
  const bodyText = (await page.locator("body").textContent().catch(() => "")) || "";
  const text = bodyText.toLowerCase();

  const detected =
    url.includes("captcha") ||
    url.includes("validatecaptcha") ||
    url.includes("errors/validatecaptcha") ||
    text.includes("entrez les caracteres") ||
    text.includes("saisissez les caracteres") ||
    text.includes("enter the characters") ||
    text.includes("type the characters");

  if (detected) {
    console.log("⚠️ CAPTCHA détecté. Résous-le puis attends...");
    await page.waitForTimeout(30000);
    return true;
  }

  return false;
}

async function handleAmazonErrorPage(page) {
  const bodyText = (await page.locator("body").textContent().catch(() => "")) || "";
  const text = bodyText.toLowerCase();
  const url = page.url().toLowerCase();

  const detected =
    text.includes("une erreur de système interne a été décelée") ||
    text.includes("toutes nos excuses") ||
    text.includes("internal system error") ||
    url.includes("/errors/");

  if (detected) {
    console.log("⚠️ Page d’erreur Amazon détectée. Pause longue...");
    await page.waitForTimeout(30000);
    return true;
  }

  return false;
}

async function findCards(page) {
  const selectors = [
    '[data-component-type="s-search-result"]',
    '.s-main-slot > div[data-asin]',
    '[data-asin]:has(h2)',
  ];

  for (const sel of selectors) {
    try {
      const locator = page.locator(sel);
      await locator.first().waitFor({ state: "visible", timeout: 7000 });
      return locator;
    } catch {}
  }

  return null;
}

async function getCardTitle(card) {
  const selectors = ["h2", "h2 span", "a h2"];
  for (const sel of selectors) {
    try {
      const txt = (await card.locator(sel).first().textContent())?.trim();
      if (txt) return txt;
    } catch {}
  }
  return ((await card.textContent()) || "").trim();
}

async function findBestResult(page, product) {
  const cards = await findCards(page);
  if (!cards) return null;

  const count = Math.min(await cards.count(), SETTINGS.maxCardsToInspect);
  let best = null;

  for (let i = 0; i < count; i++) {
    try {
      const card = cards.nth(i);
      const title = await getCardTitle(card);
      const score = scoreTitle(product, title);
      const verdict = classifyMatch(product, title, score);

      if (!best || score > best.score) {
        best = {
          index: i,
          title,
          score,
          status: verdict.status,
          reason: verdict.reason,
          identity: verdict.identity,
        };
      }
    } catch {}
  }

  return best;
}

async function openBestResult(page, bestIndex) {
  const cards = await findCards(page);
  if (!cards) return false;

  const card = cards.nth(bestIndex);
  const linkSelectors = ["h2 a", 'a[href*="/dp/"]', 'a[href*="/gp/"]'];

  for (const sel of linkSelectors) {
    try {
      const link = card.locator(sel).first();
      await link.waitFor({ state: "visible", timeout: 4000 });

      await Promise.all([
        page.waitForLoadState("domcontentloaded"),
        link.click(),
      ]);

      return true;
    } catch {}
  }

  return false;
}

async function getText(page, selectors) {
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      await el.waitFor({ state: "visible", timeout: 2200 });
      const text = (await el.textContent())?.trim();
      if (text) return text;
    } catch {}
  }
  return "";
}

async function getMainImageUrl(page) {
  const selectors = [
    "#landingImage",
    "#imgTagWrapperId img",
    "#main-image-container img",
    'img[data-old-hires]',
    'img#imgBlkFront',
  ];

  for (const sel of selectors) {
    try {
      const img = page.locator(sel).first();
      await img.waitFor({ state: "visible", timeout: 4500 });
      const src =
        (await img.getAttribute("data-old-hires")) ||
        (await img.getAttribute("src"));
      if (src && src.startsWith("http")) return src;
    } catch {}
  }

  return null;
}

async function getProductData(page) {
  const rawUrl = page.url();
  const asin = extractAsin(rawUrl);
  const amazonUrl = buildAffiliateUrl(asin);

  const amazonTitle = await getText(page, ["#productTitle", "h1 span", "title"]);
  const price = await getText(page, [
    ".a-price .a-offscreen",
    ".apexPriceToPay .a-offscreen",
    ".a-price-whole",
  ]);
  const rating = await getText(page, [
    "#acrPopover",
    'span[data-hook="rating-out-of-text"]',
    ".a-icon-alt",
  ]);
  const reviews = await getText(page, [
    "#acrCustomerReviewText",
    '[data-hook="total-review-count"]',
  ]);

  return {
    asin,
    amazonUrl,
    rawAmazonUrl: rawUrl,
    amazonTitle,
    price,
    rating,
    reviews,
  };
}

async function downloadImageBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) {
    throw new Error(`Téléchargement image HTTP ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function createFastPage(context) {
  const page = await context.newPage();
  await page.setViewportSize({ width: 1400, height: 1000 });

  await page.route("**/*", async (route) => {
    const type = route.request().resourceType();
    const url = route.request().url();

    if (type === "font" || type === "media") {
      return route.abort();
    }

    if (
      url.includes("doubleclick") ||
      url.includes("google-analytics") ||
      url.includes("amazon-adsystem")
    ) {
      return route.abort();
    }

    return route.continue();
  });

  return page;
}

async function trySearchQuery(context, product, query) {
  const page = await createFastPage(context);

  try {
    const searchUrl = `https://www.amazon.fr/s?k=${encodeURIComponent(query)}`;
    console.log(`🔎 [${product.category}] ${product.title} -> ${query}`);

    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: SETTINGS.requestTimeout,
    });

    await randomDelay(2000, 4500);
    await acceptCookies(page);
    await handleCaptcha(page);
    await handleAmazonErrorPage(page);

    const best = await findBestResult(page, product);
    if (!best) return null;
    if (best.score < SETTINGS.minScoreToOpen) return null;

    await randomDelay(1200, 2500);

    const opened = await openBestResult(page, best.index);
    if (!opened) return null;

    await randomDelay(3000, 5500);
    await handleCaptcha(page);
    await handleAmazonErrorPage(page);

    const productData = await getProductData(page);
    const finalAmazonTitle = productData.amazonTitle || best.title || "";
    const finalScore = scoreTitle(product, finalAmazonTitle);
    const finalVerdict = classifyMatch(product, finalAmazonTitle, finalScore);

    if (finalVerdict.status !== "matched") {
      return {
        id: product.id,
        category: product.category,
        title: product.title,
        status: "rejected",
        reason: finalVerdict.reason,
        amazonTitle: finalAmazonTitle,
        score: finalScore,
        query,
      };
    }

    const imageUrl = await getMainImageUrl(page);
    if (!imageUrl) {
      return {
        id: product.id,
        category: product.category,
        title: product.title,
        status: "rejected",
        reason: "image introuvable",
        amazonTitle: finalAmazonTitle,
        score: finalScore,
        query,
      };
    }

    const folder = getCategoryFolder(product.category);
    const imagePath = `/${folder}/${product.id}.jpg`;
    const filePath = path.join(process.cwd(), "public", folder, `${product.id}.jpg`);

    if (!fileExists(filePath)) {
      const imageBuffer = await downloadImageBuffer(imageUrl);
      const imageHash = sha1(imageBuffer);

      if (seenImageHashes.has(imageHash)) {
        return {
          id: product.id,
          category: product.category,
          title: product.title,
          status: "rejected",
          reason: "image dupliquée détectée",
          amazonTitle: finalAmazonTitle,
          score: finalScore,
          query,
        };
      }

      seenImageHashes.add(imageHash);
      await fs.writeFile(filePath, imageBuffer);
    }

    return {
      id: product.id,
      category: product.category,
      title: product.title,
      status: "matched",
      reason: "match trouvé",
      image: imagePath,
      asin: productData.asin || null,
      amazonTitle: finalAmazonTitle,
      amazonUrl: productData.amazonUrl || "",
      rawAmazonUrl: productData.rawAmazonUrl || "",
      price: productData.price || "",
      rating: productData.rating || "",
      reviews: productData.reviews || "",
      score: finalScore,
      query,
    };
  } finally {
    await page.close();
  }
}

function buildSearchQueries(product) {
  const base = product.title;
  const simple = simplifyTitle(product.title);
  const brand = extractBrand(product.title) || "";
  const categoryHints = {
    Clavier: "clavier",
    Casque: "casque",
    Micro: "micro",
    Webcam: "webcam",
    Chaise: "chaise",
    Bureau: "bureau",
  };

  const cat = categoryHints[product.category] || "";

  return uniq(
    [
      `${base} ${cat}`,
      `${simple} ${cat}`,
      base,
      simple,
      brand && simple ? `${brand} ${simple}` : "",
    ]
      .map((q) => q.trim())
      .filter(Boolean)
  );
}

async function processProductOnce(context, product) {
  const queries = buildSearchQueries(product);
  let bestRejected = null;

  for (const query of queries) {
    const result = await trySearchQuery(context, product, query);

    if (!result) continue;
    if (result.status === "matched") return result;

    if (!bestRejected || (result.score || 0) > (bestRejected.score || 0)) {
      bestRejected = result;
    }

    await randomDelay(2500, 5000);
  }

  return (
    bestRejected || {
      id: product.id,
      category: product.category,
      title: product.title,
      status: "rejected",
      reason: "aucune requête n'a trouvé un bon produit",
      score: 0,
    }
  );
}

async function processProduct(context, product) {
  for (let attempt = 1; attempt <= SETTINGS.retryCount + 1; attempt++) {
    try {
      return await processProductOnce(context, product);
    } catch (err) {
      const isLast = attempt === SETTINGS.retryCount + 1;
      console.log(`⚠️ Retry ${attempt}/${SETTINGS.retryCount + 1} pour ${product.id}: ${err.message}`);
      if (isLast) {
        return {
          id: product.id,
          category: product.category,
          title: product.title,
          status: "rejected",
          reason: `erreur: ${err.message}`,
          score: 0,
        };
      }
      await randomDelay(4000, 8000);
    }
  }
}

async function runPool(items, limit, worker) {
  let index = 0;

  async function next() {
    while (true) {
      const current = index++;
      if (current >= items.length) return;
      await worker(items[current], current);
    }
  }

  await Promise.all(Array.from({ length: limit }, () => next()));
}

async function main() {
  await ensureDirs();

  const existingCache = await loadJsonSafe(cacheJson, { processedIds: [] });
  const alreadyDone = new Set(existingCache.processedIds || []);

  const previousMatched = await loadJsonSafe(matchedJson, []);
  const previousRejected = await loadJsonSafe(rejectedJson, []);

  const allProducts = loadProductsFromTs();

  const state = {
    total: allProducts.length,
    matched: [...previousMatched],
    rejected: [...previousRejected],
    processedIds: uniq([
      ...previousMatched.map((x) => x.id),
      ...previousRejected.map((x) => x.id),
      ...(existingCache.processedIds || []),
    ]),
  };

  const products = allProducts.filter((p) => !alreadyDone.has(p.id)).slice(0, SETTINGS.batchSize);

  console.log(`🚫 Catégories exclues          : ${[...EXCLUDED_CATEGORIES].join(", ")}`);
  console.log(`📦 Produits incomplets détectés : ${state.total}`);
  console.log(`⏭️ Déjà traités                : ${alreadyDone.size}`);
  console.log(`🧱 Lot traité cette fois       : ${products.length}`);

  if (products.length === 0) {
    console.log("✅ Rien à faire");
    return;
  }

  const browser = await chromium.launch({
    headless: SETTINGS.headless,
    slowMo: SETTINGS.slowMo,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    locale: "fr-FR",
    viewport: { width: 1400, height: 1000 },
  });

  let processedSinceSave = 0;

  try {
    await runPool(products, SETTINGS.concurrency, async (product, idx) => {
      const data = await processProduct(context, product);

      state.matched = state.matched.filter((x) => x.id !== product.id);
      state.rejected = state.rejected.filter((x) => x.id !== product.id);

      if (data.status === "matched") state.matched.push(data);
      else state.rejected.push(data);

      state.processedIds = uniq([...state.processedIds, product.id]);
      processedSinceSave++;

      console.log(`[${idx + 1}/${products.length}] ${product.id} -> ${data.status.toUpperCase()}`);

      if (processedSinceSave >= SETTINGS.saveEvery) {
        processedSinceSave = 0;
        await saveOutputs(state);
        console.log("💾 Sauvegarde intermédiaire");
      }

      await randomDelay(3000, 6000);
    });
  } finally {
    await saveOutputs(state);
    await context.close();
    await browser.close();
  }

  console.log("\n✅ Terminé");
  console.log(`📄 Tous résultats : ${outputJson}`);
  console.log(`✅ Matchés        : ${matchedJson}`);
  console.log(`❌ Rejetés        : ${rejectedJson}`);
  console.log(`📊 Rapport        : ${reportJson}`);
  console.log(`🧩 Overrides      : ${overridesJson}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});