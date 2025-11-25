import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | JSON TO TOON',
  description: 'Read latest articles and updates on JSON TO TOON.',
  alternates: {
    canonical: '/blog',
  },
}

const posts = [
  {
    slug: '#',
    title: 'Using TOON to cut LLM token costs',
    date: '2025-01-01',
    excerpt:
      'Learn practical techniques for shrinking prompts with TOON and keeping responses accurate.',
  },
  {
    slug: '#',
    title: 'When to convert JSON to TOON',
    date: '2025-01-10',
    excerpt:
      'See common scenarios where JSON TO TOON provides the biggest savings on API usage.',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-left">
            Blog
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Articles and updates about JSON TO TOON, prompt optimization, and
            reducing LLM token usage.
          </p>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                <p className="text-sm text-gray-700 mb-3">{post.excerpt}</p>
                <Link
                  href={post.slug}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
