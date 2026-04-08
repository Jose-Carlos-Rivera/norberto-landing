"use client";

import { useState } from "react";
import content from "@/content/site-content.json";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brown-dark text-cream sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-brown text-cream/80 text-xs py-2 px-4 text-center tracking-widest uppercase">
        {content.brand.razónSocial} &mdash; {content.brand.tagline}
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-tan-light notranslate">
              {content.brand.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#productos"
              className="text-cream/80 hover:text-tan transition-colors text-sm tracking-widest uppercase"
            >
              Colección
            </a>
            <a
              href="#nosotros"
              className="text-cream/80 hover:text-tan transition-colors text-sm tracking-widest uppercase"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-cream/80 hover:text-tan transition-colors text-sm tracking-widest uppercase"
            >
              Contacto
            </a>
            <LanguageSelector variant="desktop" />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSelector variant="desktop" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-cream p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-brown-light/30">
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="#productos"
                onClick={() => setMenuOpen(false)}
                className="text-cream/80 hover:text-tan transition-colors text-sm tracking-widest uppercase py-2"
              >
                Colección
              </a>
              <a
                href="#nosotros"
                onClick={() => setMenuOpen(false)}
                className="text-cream/80 hover:text-tan transition-colors text-sm tracking-widest uppercase py-2"
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="text-cream/80 hover:text-tan transition-colors text-sm tracking-widest uppercase py-2"
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
