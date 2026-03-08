import fs from "fs"
import path from "path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type BlogPost = {
  slug: string
  title: string
  description: string
  intro: string
  sections: { title: string; content: string }[]
}

function getPosts(): BlogPost[] {
  const filePath = path.join(process.cwd(), "data", "blog-posts.json")
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function getPostBySlug(slug: string) {
  return getPosts().find((post) => post.slug === slug)
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return { title: "Article introuvable | NexusGamingFR" }

  return {
    title: `${post.title} | NexusGamingFR`,
    description: post.description,
    alternates: {
      canonical: `https://www.nexusgamingfr.com/blog/${post.slug}`
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>
      <p className="mb-10 text-lg leading-8">{post.intro}</p>
      <div className="space-y-10">
        {post.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>
            <p className="leading-8 text-neutral-300">{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  )
}