import fs from "fs"
import path from "path"
import Link from "next/link"

function getPosts() {
  const filePath = path.join(process.cwd(), "data", "blog-posts.json")

  if (!fs.existsSync(filePath)) {
    return []
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

export default function BlogIndexPage() {
  const posts = getPosts()

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-4xl font-bold">Blog gaming</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post: { slug: string; title: string; description: string }) => (
          <article key={post.slug} className="rounded-2xl border p-4">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-neutral-400">{post.description}</p>
          </article>
        ))}
      </div>
    </main>
  )
}