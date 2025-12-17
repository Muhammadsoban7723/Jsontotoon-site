import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const siteName = 'JSON to TOON Converter'

const defaultTitle =
  'JSON to TOON Converter Online - Free TOON Format Tool | jsontotoon'
const defaultDescription =
  'Convert JSON to TOON online for free! Best JSON to TOON converter - reduce LLM token usage 30-60%. Fast jsontotoon converter for GPT-4, Claude & Gemini. No signup, 100% private, instant results.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jsontotoon.site'),
  title: {
    default: defaultTitle,
    template: '%s | JSON to TOON Converter'
  },
  description: defaultDescription,
  keywords: [
    'json to toon',
    'jsontotoon',
    'json to toon online',
    'json to toon converter',
    'jsontoon',
    'json to toon converter online',
    'json toon converter',
    'json toon',
    'toon format converter',
    'llm token reduction',
    'gpt-4 token savings',
    'claude api optimizer',
    'free json converter',
    'json optimization tool',
    'reduce ai costs'
  ],
  applicationName: siteName,
  authors: [{ name: 'Abu Baker', url: 'https://www.jsontotoon.site/about' }],
  creator: 'Abu Baker',
  publisher: 'JSON to TOON Converter',
  alternates: {
    canonical: 'https://www.jsontotoon.site/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jsontotoon.site/',
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON to TOON Converter - Reduce LLM Token Usage by 30-60%',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-image.png'],
    creator: '@jsontotoon',
  },
  verification: {
    google: 'f79ea97f12ae275f',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://www.jsontotoon.site/#organization',
                name: siteName,
                url: 'https://www.jsontotoon.site/',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.jsontotoon.site/favicon-512.png',
                  width: 512,
                  height: 512,
                },
                founder: {
                  '@type': 'Person',
                  name: 'Abu Baker',
                },
                sameAs: [
                  'https://www.jsontotoon.site',
                ],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://www.jsontotoon.site/#website',
                name: siteName,
                url: 'https://www.jsontotoon.site/',
                description: defaultDescription,
                publisher: {
                  '@id': 'https://www.jsontotoon.site/#organization',
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://www.jsontotoon.site/?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'WebApplication',
                '@id': 'https://www.jsontotoon.site/#webapp',
                name: 'JSON to TOON Converter',
                url: 'https://www.jsontotoon.site/',
                description: 'Free online JSON to TOON converter that reduces LLM token usage by 30-60%. Convert JSON to token-optimized TOON format instantly.',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Any (Web Browser)',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                featureList: [
                  '30-60% token reduction',
                  '100% client-side processing',
                  'No registration required',
                  'Unlimited conversions',
                  'Privacy guaranteed',
                  'Instant results',
                ],
                browserRequirements: 'Requires JavaScript',
              },
              {
                '@type': 'SoftwareApplication',
                '@id': 'https://www.jsontotoon.site/#software',
                name: 'JSON to TOON Converter Online',
                applicationCategory: 'Utility',
                operatingSystem: 'Web Browser',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  ratingCount: '127',
                  bestRating: '5',
                  worstRating: '1',
                },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.jsontotoon.site/#faq',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is JSON to TOON converter?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'JSON to TOON converter is a free online tool that transforms JSON data into Token-Oriented Object Notation (TOON) format. This reduces LLM token usage by 30-60% for GPT-4, Claude, and Gemini, saving API costs while preserving data integrity.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is jsontotoon converter free?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes! Our JSON to TOON converter is 100% free with no registration, no credit card required, and unlimited conversions. All processing happens in your browser, ensuring complete privacy.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How much can I save with json to toon online?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The JSON to TOON converter typically reduces token usage by 30-60% on average. For repetitive JSON structures, savings can be even higher, directly reducing your GPT-4, Claude, and Gemini API costs.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is my data safe with json toon converter?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Absolutely. All JSON to TOON conversion happens entirely in your browser. Your data never leaves your device and is not stored on any server, ensuring 100% privacy and security.',
                    },
                  },
                ],
              },
              {
                '@type': 'HowTo',
                '@id': 'https://www.jsontotoon.site/#howto',
                name: 'How to Convert JSON to TOON Online',
                description: 'Step-by-step guide to convert JSON to TOON format and reduce LLM token usage',
                step: [
                  {
                    '@type': 'HowToStep',
                    name: 'Paste JSON',
                    text: 'Copy your JSON data and paste it into the jsontotoon converter input box',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Click Convert',
                    text: 'Press the Convert to TOON button to transform your JSON instantly',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'View Token Savings',
                    text: 'See the exact token reduction percentage and compare JSON vs TOON token counts',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Copy TOON Output',
                    text: 'Copy the TOON format and use it in your GPT-4, Claude, or Gemini prompts',
                  },
                ],
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://www.jsontotoon.site/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.jsontotoon.site/',
                  },
                ],
              },
            ],
          })}
        </Script>
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
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/693fc86c18f23b1985eda50e/1jcgidq53';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        <Header />
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
