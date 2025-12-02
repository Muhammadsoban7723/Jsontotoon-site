'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Converter' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-start px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-wide text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm">
            {'{'}⇄{'}'}
          </span>
          <span className="text-base font-semibold tracking-tight">JSON to TOON</span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4 text-base font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? 'rounded-full bg-blue-50 px-3 py-1 text-blue-600'
                      : 'px-3 py-1 text-slate-700 hover:text-blue-600'
                  }
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-700 hover:text-blue-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-3 text-sm">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? 'rounded-full bg-blue-50 px-3 py-2 text-blue-600'
                      : 'px-3 py-2 text-slate-700 hover:text-blue-600'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
