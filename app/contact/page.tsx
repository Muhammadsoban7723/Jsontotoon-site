import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us – Support for JSON to TOON Conversion',
  description:
    'Have questions about JSON to TOON conversions or LLM token optimization? Contact our support team for help, feedback, or feature requests.',
}

export default function Contact() {
  return <ContactPage />
}
