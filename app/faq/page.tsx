import type { Metadata } from 'next'
import FAQPage from '@/components/FAQPage'

export const metadata: Metadata = {
  title: 'FAQ | JSON TO TOON Converter Token Reduction Tips Guide',
  description:
    'Browse answers about converting JSON to TOON, reducing tokens, supported data shapes, privacy guarantees, and best practices for writing efficient prompts.',
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQ() {
  return <FAQPage />
}
