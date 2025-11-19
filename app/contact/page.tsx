import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact JSON TO TOON Converter | Support & Help Center Team',
  description:
    'Reach the JSON TO TOON Converter team for support, feature ideas, feedback, or token-optimization questions. We respond quickly to every request.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Contact() {
  return <ContactPage />
}
