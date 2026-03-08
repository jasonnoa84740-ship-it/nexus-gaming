import fs from "node:fs/promises";
import path from "node:path";

const AMAZON_TAG = "nexusgamingfr-21";

const productsFile = path.join(process.cwd(), "lib", "amazonProducts.ts");
const dataFile = path.join(process.cwd(), "scripts", "output", "all-product-data.json");
const backupFile = path.join(process.cwd(), "lib", "amazonProducts.backup.ts");
const logFile = path.join(process.cwd(), "scripts", "output", "apply-report.json");

function extractAsin(url) {
  if (!url || typeof url !== "string") return null;

  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/product\/([A-Z0-9]{10})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1].toUpperCase();
  }

  return null;
}

function normalizeAmazonUrl(url) {
  const asin = extractAsin(url);
  if (!asin) return null;
  return `https://www.amazon.fr/dp/${asin}?tag=${AMAZON_TAG}`;
}

function isValidImage(image) {
  return typeof image === "string" && image.trim().startsWith("/");
}

function findObjectBounds(content, id) {
  const idRegex = new RegExp(`id:\\s*["']${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`);
  const match = idRegex.exec(content);

  if (!match) return null;

  let start = content.lastIndexOf("{", match.index);
  if (start === -1) return null;

  let depth = 0;
  let end = -1;

  for (let i = start; i < content.length; i++) {
    const ch = content[i];
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) return null;

  return {
    start,
    end: end + 1,
    block: content.slice(start, end + 1),
  };
}

function replaceField(block, fieldName, newValue) {
  const regex = new RegExp(`(${fieldName}:\\s*["'])([^"']*)(["'])`);
  if (!regex.test(block)) return block;
  return block.replace(regex, `$1${newValue}$3`);
}

async function main() {
  const [tsContent, jsonContent] = await Promise.all([
    fs.readFile(productsFile, "utf8"),
    fs.readFile(dataFile, "utf8"),
  ]);

  const rawData = JSON.parse(jsonContent);
  const data = rawData.filter((item) => item?.id && item.status === "matched");

  let updated = tsContent;

  let imageUpdates = 0;
  let urlUpdates = 0;
  let invalidImages = 0;
  let invalidUrls = 0;
  let missingIds = 0;
  let unchanged = 0;

  const report = {
    totalInput: rawData.length,
    matchedInput: data.length,
    imageUpdates: [],
    urlUpdates: [],
    invalidImages: [],
    invalidUrls: [],
    missingIds: [],
    unchanged: [],
  };

  await fs.writeFile(backupFile, tsContent, "utf8");
  console.log(`🗂️ Backup créé: ${backupFile}`);
  console.log(`✅ Produits matched à appliquer: ${data.length}`);

  for (const item of data) {
    const found = findObjectBounds(updated, item.id);

    if (!found) {
      console.log(`⚠️ ID introuvable: ${item.id}`);
      missingIds++;
      report.missingIds.push(item.id);
      continue;
    }

    let block = found.block;
    const originalBlock = block;

    if (item.image) {
      if (isValidImage(item.image)) {
        const newBlock = replaceField(block, "image", item.image);
        if (newBlock !== block) {
          block = newBlock;
          imageUpdates++;
          report.imageUpdates.push({ id: item.id, image: item.image });
          console.log(`🖼️ Image mise à jour: ${item.id}`);
        }
      } else {
        invalidImages++;
        report.invalidImages.push({ id: item.id, image: item.image });
      }
    }

    if (item.amazonUrl) {
      const normalizedUrl = normalizeAmazonUrl(item.amazonUrl);
      if (normalizedUrl) {
        const newBlock = replaceField(block, "amazonUrl", normalizedUrl);
        if (newBlock !== block) {
          block = newBlock;
          urlUpdates++;
          report.urlUpdates.push({ id: item.id, amazonUrl: normalizedUrl });
          console.log(`🔗 URL mise à jour: ${item.id}`);
        }
      } else {
        invalidUrls++;
        report.invalidUrls.push({ id: item.id, amazonUrl: item.amazonUrl });
      }
    }

    if (block !== originalBlock) {
      updated =
        updated.slice(0, found.start) +
        block +
        updated.slice(found.end);
    } else {
      unchanged++;
      report.unchanged.push(item.id);
    }
  }

  await fs.writeFile(productsFile, updated, "utf8");

  const summary = {
    totalInput: rawData.length,
    matchedInput: data.length,
    imageUpdates,
    urlUpdates,
    invalidImages,
    invalidUrls,
    missingIds,
    unchanged,
    timestamp: new Date().toISOString(),
  };

  await fs.writeFile(
    logFile,
    JSON.stringify({ summary, report }, null, 2),
    "utf8"
  );

  console.log("\n✅ amazonProducts.ts mis à jour");
  console.log("—— Résumé ——");
  console.log(`✅ Matchés lus         : ${data.length}`);
  console.log(`🖼️ Images mises à jour : ${imageUpdates}`);
  console.log(`🔗 URLs mises à jour   : ${urlUpdates}`);
  console.log(`⚠️ IDs introuvables    : ${missingIds}`);
  console.log(`➖ Inchangés            : ${unchanged}`);
  console.log(`📄 Rapport             : ${logFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});