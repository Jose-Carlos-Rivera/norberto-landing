"use client";

import { useState } from "react";
import Image from "next/image";
import content from "@/content/site-content.json";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-cream border-b border-tan/20 sticky top-0 z-50 shadow-sm">
      {/* Top bar — teal/aqua strip with tagline */}
      <div className="bg-tan text-white text-xs py-2 px-4 text-center tracking-widest uppercase font-medium">
        {content.brand.tagline}
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src={content.brand.logo}
              alt={content.brand.name}
              width={64}
              height={64}
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain notranslate"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#productos"
              className="text-brown-dark/70 hover:text-tan transition-colors text-sm tracking-widest uppercase font-medium"
            >
              Colección
            </a>
            <a
              href="#nosotros"
              className="text-brown-dark/70 hover:text-tan transition-colors text-sm tracking-widest uppercase font-medium"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-brown-dark/70 hover:text-tan transition-colors text-sm tracking-widest uppercase font-medium"
            >
              Contacto
            </a>
            <LanguageSelector variant="desktop" />
          </div>

          {/* Mobile: language selector + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSelector variant="desktop" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-brown-dark p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-cream-dark">
            <div className="flex flex-col gap-1 pt-4">
              <a
                href="#productos"
                onClick={() => setMenuOpen(false)}
                className="text-brown-dark/70 hover:text-tan transition-colors text-sm tracking-widest uppercase font-medium py-2.5"
              >
                Colección
              </a>
              <a
                href="#nosotros"
                onClick={() => setMenuOpen(false)}
                className="text-brown-dark/70 hover:text-tan transition-colors text-sm tracking-widest uppercase font-medium py-2.5"
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="text-brown-dark/70 hover:text-tan transition-colors text-sm tracking-widest uppercase font-medium py-2.5"
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
