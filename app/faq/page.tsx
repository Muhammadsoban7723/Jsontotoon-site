import type { Metadata } from 'next'
import FAQPage from '@/components/FAQPage'

export const metadata: Metadata = {
  title: 'FAQs – JSON to TOON Converter & LLM Token Reduction Guide',
  description:
    'Find answers about converting JSON into TOON format, reducing LLM tokens, supported structures, usage tips, and optimizing your JSON for efficient model prompts.',
}

export default function FAQ() {
  return <FAQPage />
}
