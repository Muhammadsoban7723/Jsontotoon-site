import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works | JSON TO TOON',
  description: 'Learn how JSON TO TOON works in 3 simple steps.',
  alternates: {
    canonical: '/how-it-works',
  },
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-left">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            JSON TO TOON converts verbose JSON into a compact TOON format so your
            prompts use fewer tokens while keeping the same structure and
            meaning. Everything runs in your browser, so your data stays private.
          </p>

          <ol className="space-y-6">
            <li className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. Paste your JSON
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                Copy any JSON payload you currently send to LLMs or APIs and
                paste it into the converter on the homepage.
              </p>
            </li>

            <li className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Convert to TOON
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                With a single click, JSON TO TOON rewrites keys and structure
                into a shorter, token-efficient TOON representation directly in
                your browser.
              </p>
            </li>

            <li className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Use in your prompts
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                Copy the TOON output into your prompts or applications to reduce
                token usage, cut API costs, and keep responses aligned with your
                original JSON structure.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}
