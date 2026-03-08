import fs from "fs"
import path from "path"

export default function sitemap() {
  const baseUrl = "https://www.nexusgamingfr.com"
  const seoFilePath = path.join(process.cwd(), "data", "seo-pages.json")
  const blogFilePath = path.join(process.cwd(), "data", "blog-posts.json")

  const seoPages = fs.existsSync(seoFilePath)
    ? JSON.parse(fs.readFileSync(seoFilePath, "utf8"))
    : []

  const blogPosts = fs.existsSync(blogFilePath)
    ? JSON.parse(fs.readFileSync(blogFilePath, "utf8"))
    : []

  const staticPages = ["", "/blog", "/a-propos", "/contact", "/mentions-legales"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }))

  const seoRoutes = seoPages.map((page: { slug: string }) => ({
    url: `${baseUrl}/seo/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9
  }))

  const blogRoutes = blogPosts.map((post: { slug: string }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }))

  return [...staticPages, ...seoRoutes, ...blogRoutes]
}