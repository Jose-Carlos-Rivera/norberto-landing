"use client";

import { useState, useEffect, useRef } from "react";

const LANGUAGES = [
  { code: "es", name: "Español", flag: "🇲🇽" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
];

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function triggerTranslation(langCode: string) {
  if (langCode === "es") {
    // Restore original language
    setCookie("googtrans", "", -1);
    setCookie("googtrans", "", -1);
    // Also clear on .vercel.app domain
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.vercel.app";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return;
  }

  const value = `/es/${langCode}`;
  setCookie("googtrans", value, 365);
  // Set on both root and domain
  document.cookie = `googtrans=${value}; path=/; domain=.vercel.app`;

  // Try to use the Google Translate select element programmatically
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
}

export default function LanguageSelector({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current language from cookie
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/es\/([^;]+)/);
    if (match) {
      const found = LANGUAGES.find((l) => l.code === match[1]);
      if (found) setCurrentLang(found);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: typeof LANGUAGES[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);
    triggerTranslation(lang.code);
  };

  const isMobile = variant === "mobile";

  return (
    <div ref={dropdownRef} className="relative notranslate">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-all duration-200 ${
          isMobile
            ? "text-cream/80 hover:text-tan text-sm tracking-widest uppercase py-2 w-full"
            : "bg-brown/60 hover:bg-brown/80 text-cream/90 hover:text-cream px-3 py-1.5 rounded-full text-xs tracking-wider border border-cream/10 hover:border-cream/20"
        }`}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute z-[9999] bg-brown-dark/95 backdrop-blur-md border border-cream/10 rounded-xl shadow-2xl overflow-hidden ${
            isMobile
              ? "left-0 right-0 mt-2 max-h-60"
              : "right-0 mt-2 w-52 max-h-80"
          }`}
        >
          {/* Search-like header */}
          <div className="px-3 py-2.5 border-b border-cream/10">
            <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase">
              Selecciona tu idioma
            </p>
          </div>

          {/* Language list */}
          <div className="overflow-y-auto max-h-64 custom-scrollbar">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150 ${
                  currentLang.code === lang.code
                    ? "bg-tan/20 text-tan-light"
                    : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                }`}
              >
                <span className="text-lg leading-none flex-shrink-0">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {currentLang.code === lang.code && (
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-tan flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-cream/10">
            <p className="text-cream/30 text-[10px] text-center">
              Traducción automática
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
