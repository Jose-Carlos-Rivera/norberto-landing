"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

function translatePage(langCode: string) {
  if (langCode === "es") {
    // Clear cookies and reload to get original
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.vercel.app";
    localStorage.removeItem("selectedLang");
    window.location.reload();
    return;
  }

  localStorage.setItem("selectedLang", langCode);

  // Set the googtrans cookie
  const value = `/es/${langCode}`;
  document.cookie = `googtrans=${value}; path=/;`;
  document.cookie = `googtrans=${value}; path=/; domain=.vercel.app`;

  // Load Google Translate script dynamically if not loaded
  const existing = document.getElementById("google-translate-script");
  if (existing) {
    // Script already loaded, try to use the combo
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      return;
    }
  }

  // Load fresh - set cookie and reload so Google picks it up
  window.location.reload();
}

export default function LanguageSelector({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current language
  useEffect(() => {
    const saved = localStorage.getItem("selectedLang");
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setCurrentLang(found);
    }
  }, []);

  // Load Google Translate only if a non-Spanish language is saved
  useEffect(() => {
    const saved = localStorage.getItem("selectedLang");
    if (saved && saved !== "es") {
      // Set cookie before loading script
      const value = `/es/${saved}`;
      document.cookie = `googtrans=${value}; path=/;`;

      // Create hidden container
      let container = document.getElementById("google_translate_element");
      if (!container) {
        container = document.createElement("div");
        container.id = "google_translate_element";
        container.style.position = "absolute";
        container.style.top = "-9999px";
        container.style.left = "-9999px";
        document.body.appendChild(container);
      }

      // Define the callback
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).googleTranslateInit = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "es", autoDisplay: false },
          "google_translate_element"
        );
      };

      // Load the script
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  // Close on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = (lang: typeof LANGUAGES[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);
    translatePage(lang.code);
  };

  const isMobile = variant === "mobile";

  return (
    <div ref={dropdownRef} className="relative notranslate">
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

      {isOpen && (
        <div
          className={`absolute z-[9999] bg-brown-dark/95 backdrop-blur-md border border-cream/10 rounded-xl shadow-2xl overflow-hidden ${
            isMobile
              ? "left-0 right-0 mt-2 max-h-60"
              : "right-0 mt-2 w-52 max-h-80"
          }`}
        >
          <div className="px-3 py-2.5 border-b border-cream/10">
            <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase">
              Selecciona tu idioma
            </p>
          </div>

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
