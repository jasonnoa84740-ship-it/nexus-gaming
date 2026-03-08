import fs from "fs"
import path from "path"
import Link from "next/link"

type SeoPage = {
  slug: string
  h1: string
  description: string
}

function getPages(): SeoPage[] {
  const filePath = path.join(process.cwd(), "data", "seo-pages.json")

  if (!fs.existsSync(filePath)) {
    return []
  }

  const raw = fs.readFileSync(filePath, "utf8")
  return JSON.parse(raw)
}

export default function SeoIndexPage() {
  const pages = getPages()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-6 text-4xl font-bold">Guides gaming</h1>

      <div className="space-y-4">
        {pages.map((page) => (
          <article key={page.slug} className="rounded-2xl border p-4">
            <h2 className="text-2xl font-semibold">
              <Link href={`/seo/${page.slug}`}>{page.h1}</Link>
            </h2>

            <p className="mt-2 text-neutral-400">
              {page.description}
            </p>
          </article>
        ))}
      </div>
    </main>
  )
}