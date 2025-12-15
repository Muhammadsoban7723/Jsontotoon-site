import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const siteName = 'JSON to TOON'

const defaultTitle =
  'JSON TO TOON Converter | Reduce LLM Token Usage by 30-60%'
const defaultDescription =
  'Convert JSON to TOON to shrink LLM prompts by 30-60%. Fast, private, browser-based converter that lowers API costs and keeps every token counted.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jsontotoon.site'),
  title: defaultTitle,
  description: defaultDescription,
  keywords: 'JSON to TOON, TOON format, token reduction, LLM optimization, GPT token savings, Claude API costs',
  applicationName: siteName,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-favicon.png',
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    locale: 'en_US',
    siteName,
    url: 'https://www.jsontotoon.site/',
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
                  url: 'https://www.jsontotoon.site/logo-favicon.png',
                },
              },
              {
                '@type': 'WebSite',
                '@id': 'https://www.jsontotoon.site/#website',
                name: siteName,
                url: 'https://www.jsontotoon.site/',
                publisher: {
                  '@id': 'https://www.jsontotoon.site/#organization',
                },
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
