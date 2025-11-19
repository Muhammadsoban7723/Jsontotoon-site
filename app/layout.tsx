import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const defaultTitle =
  'JSON TO TOON Converter | Reduce LLM Token Usage by 30-60%'
const defaultDescription =
  'Convert JSON to TOON to shrink LLM prompts by 30-60%. Fast, private, browser-based converter that lowers API costs and keeps every token counted.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jsontotoon.site'),
  title: defaultTitle,
  description: defaultDescription,
  keywords: 'JSON to TOON, TOON format, token reduction, LLM optimization, GPT token savings, Claude API costs',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4PSKX5EG6M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4PSKX5EG6M');
          `}
        </Script>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
