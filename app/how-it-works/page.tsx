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

      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Where JSON TO TOON fits in your stack</h2>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            JSON TO TOON sits between your existing data sources and your LLM prompts. You keep producing JSON the way
            you do today, then convert it to TOON only for the parts that go into prompts. This keeps your databases,
            APIs, and logs unchanged while making your LLM usage more efficient.
          </p>

          <ul className="space-y-3 text-gray-700 text-sm md:text-base list-disc list-inside mb-5">
            <li>
              <span className="font-semibold">Upstream:</span> your app, API, or data pipeline still emits structured JSON
              for events, analytics, or user data.
            </li>
            <li>
              <span className="font-semibold">Middle:</span> before calling an LLM, you convert that JSON to TOON (using
              the patterns you tested in the converter) and include TOON in the prompt instead of raw JSON.
            </li>
            <li>
              <span className="font-semibold">Downstream:</span> the LLM reads TOON just like any other text, but you pay
              for fewer tokens and can often fit more context into each request.
            </li>
          </ul>

          <p className="text-gray-700 text-sm md:text-base">
            All of this can be done without sending your real data to external services: the homepage converter runs fully
            in your browser, and production conversions can run inside your own backend or internal tools.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Real example: from JSON to TOON in a prompt</h2>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            This example shows how a small JSON analytics payload turns into TOON and how you might include it in an LLM
            prompt. The structure stays the same—the only change is how compact the representation is.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Original JSON</h3>
              <pre className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto">
{`{
  "sessions": [
    {"userId": 1, "page": "pricing", "duration": 42},
    {"userId": 1, "page": "docs", "duration": 18},
    {"userId": 2, "page": "home", "duration": 33}
  ]
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Converted TOON</h3>
              <pre className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto">
{`sessions[3]{userId,page,duration}:
  1,pricing,42
  1,docs,18
  2,home,33`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How it appears in a prompt</h3>
              <pre className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto">
{`You are a product analyst. Summarize key insights from the following session data.

sessions[3]{userId,page,duration}:
  1,pricing,42
  1,docs,18
  2,home,33`}
              </pre>
            </div>

            <p className="text-gray-700 text-sm md:text-base">
              In practice, you can paste your own JSON into the converter on the homepage, review the TOON output and
              token counts, and then wire the TOON version into prompts like this in your own code.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Implementation checklist (5 quick steps)</h2>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            When you are ready to move from experimenting in the converter to using TOON in your own product, this
            simple checklist can help you roll it out safely.
          </p>

          <ol className="space-y-4 text-gray-700 text-sm md:text-base list-decimal list-inside mb-2">
            <li>
              <span className="font-semibold">Identify high‑impact prompts.</span> Start with a few prompts that send
              large, repetitive JSON payloads to GPT‑4, Claude, or Gemini and that you call frequently.
            </li>
            <li>
              <span className="font-semibold">Design and test TOON formats.</span> Paste those JSON payloads into the
              homepage converter, review the TOON output and token counts, and agree on a stable column order and naming
              convention.
            </li>
            <li>
              <span className="font-semibold">Add conversion in code.</span> In your backend or prompt‑building layer,
              convert JSON to the agreed TOON format and swap the JSON block in your prompts for the TOON block.
            </li>
            <li>
              <span className="font-semibold">Monitor behavior and savings.</span> Compare token usage, latency, and
              response quality before and after TOON. Keep the old JSON path available as a temporary fallback.
            </li>
            <li>
              <span className="font-semibold">Standardize and document.</span> Once TOON works well, document the
              pattern in your internal docs or prompt libraries so other features and teams can reuse the same
              token‑efficient structure.
            </li>
          </ol>
        </div>
      </section>

      <section className="py-16 bg-primary-600 mt-4">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to try JSON TO TOON on your own data?</h2>
          <p className="text-lg text-primary-100 mb-8">
            Head back to the converter, paste a real JSON payload from your product, and see how much you can save in
            tokens in just a few seconds.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-primary-600 font-semibold hover:bg-gray-100 transition-colors"
          >
            Open JSON TO TOON Converter
          </a>
        </div>
      </section>
    </div>
  )
}
