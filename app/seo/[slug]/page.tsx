import fs from "fs"
import path from "path"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type FaqItem = {
  question: string
  answer: string
}

type Section = {
  title: string
  content: string
}

type SeoPage = {
  slug: string
  keyword: string
  title: string
  description: string
  h1: string
  intro: string
  sections: Section[]
  faq: FaqItem[]
  relatedSlugs: string[]
}

function getPages(): SeoPage[] {
  const filePath = path.join(process.cwd(), "data", "seo-pages.json")

  if (!fs.existsSync(filePath)) {
    return []
  }

  const raw = fs.readFileSync(filePath, "utf8")
  return JSON.parse(raw)
}

function getPageBySlug(slug: string) {
  return getPages().find((page) => page.slug === slug)
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return {
      title: "Page introuvable | NexusGamingFR",
    }
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://www.nexusgamingfr.com/seo/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://www.nexusgamingfr.com/seo/${page.slug}`,
      siteName: "NexusGamingFR",
      type: "article",
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const allPages = getPages()
  const relatedPages = allPages.filter((p) =>
    page.relatedSlugs.includes(p.slug)
  )

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-6 text-4xl font-bold">{page.h1}</h1>

      <p className="mb-10 text-lg leading-8">{page.intro}</p>

      <div className="space-y-10">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>
            <p className="leading-8 text-neutral-300">{section.content}</p>
          </section>
        ))}
      </div>

      {relatedPages.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Pages liées</h2>
          <ul className="space-y-2">
            {relatedPages.map((item) => (
              <li key={item.slug}>
                <Link className="underline" href={`/seo/${item.slug}`}>
                  {item.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {page.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">FAQ</h2>
          <div className="space-y-4">
            {page.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border p-4">
                <h3 className="mb-2 text-lg font-medium">{item.question}</h3>
                <p className="text-neutral-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}