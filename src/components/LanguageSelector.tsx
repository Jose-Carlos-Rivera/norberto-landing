"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface Language {
  code: string;
  name: string;       // Native name (shown in dropdown)
  englishName: string; // English name (used for search)
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "es", name: "Español", englishName: "Spanish", flag: "🇲🇽" },
  { code: "af", name: "Afrikaans", englishName: "Afrikaans", flag: "🇿🇦" },
  { code: "ak", name: "Twi", englishName: "Twi", flag: "🇬🇭" },
  { code: "am", name: "አማርኛ", englishName: "Amharic", flag: "🇪🇹" },
  { code: "ar", name: "العربية", englishName: "Arabic", flag: "🇸🇦" },
  { code: "as", name: "অসমীয়া", englishName: "Assamese", flag: "🇮🇳" },
  { code: "ay", name: "Aymar aru", englishName: "Aymara", flag: "🇧🇴" },
  { code: "az", name: "Azərbaycan", englishName: "Azerbaijani", flag: "🇦🇿" },
  { code: "be", name: "Беларуская", englishName: "Belarusian", flag: "🇧🇾" },
  { code: "bg", name: "Български", englishName: "Bulgarian", flag: "🇧🇬" },
  { code: "bho", name: "भोजपुरी", englishName: "Bhojpuri", flag: "🇮🇳" },
  { code: "bm", name: "Bamanankan", englishName: "Bambara", flag: "🇲🇱" },
  { code: "bn", name: "বাংলা", englishName: "Bengali", flag: "🇧🇩" },
  { code: "bs", name: "Bosanski", englishName: "Bosnian", flag: "🇧🇦" },
  { code: "ca", name: "Català", englishName: "Catalan", flag: "🇪🇸" },
  { code: "ceb", name: "Cebuano", englishName: "Cebuano", flag: "🇵🇭" },
  { code: "ckb", name: "کوردی", englishName: "Kurdish Sorani", flag: "🌐" },
  { code: "co", name: "Corsu", englishName: "Corsican", flag: "🇫🇷" },
  { code: "cs", name: "Čeština", englishName: "Czech", flag: "🇨🇿" },
  { code: "cy", name: "Cymraeg", englishName: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "da", name: "Dansk", englishName: "Danish", flag: "🇩🇰" },
  { code: "de", name: "Deutsch", englishName: "German", flag: "🇩🇪" },
  { code: "doi", name: "डोगरी", englishName: "Dogri", flag: "🇮🇳" },
  { code: "dv", name: "ދިވެހި", englishName: "Dhivehi", flag: "🇲🇻" },
  { code: "ee", name: "Eʋegbe", englishName: "Ewe", flag: "🇬🇭" },
  { code: "el", name: "Ελληνικά", englishName: "Greek", flag: "🇬🇷" },
  { code: "en", name: "English", englishName: "English", flag: "🇺🇸" },
  { code: "eo", name: "Esperanto", englishName: "Esperanto", flag: "🌐" },
  { code: "et", name: "Eesti", englishName: "Estonian", flag: "🇪🇪" },
  { code: "eu", name: "Euskara", englishName: "Basque", flag: "🇪🇸" },
  { code: "fa", name: "فارسی", englishName: "Persian", flag: "🇮🇷" },
  { code: "fi", name: "Suomi", englishName: "Finnish", flag: "🇫🇮" },
  { code: "fr", name: "Français", englishName: "French", flag: "🇫🇷" },
  { code: "fy", name: "Frysk", englishName: "Frisian", flag: "🇳🇱" },
  { code: "ga", name: "Gaeilge", englishName: "Irish", flag: "🇮🇪" },
  { code: "gd", name: "Gàidhlig", englishName: "Scottish Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { code: "gl", name: "Galego", englishName: "Galician", flag: "🇪🇸" },
  { code: "gn", name: "Avañeʼẽ", englishName: "Guarani", flag: "🇵🇾" },
  { code: "gom", name: "Konkani", englishName: "Konkani", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", englishName: "Gujarati", flag: "🇮🇳" },
  { code: "ha", name: "Hausa", englishName: "Hausa", flag: "🇳🇬" },
  { code: "haw", name: "ʻŌlelo Hawaiʻi", englishName: "Hawaiian", flag: "🌺" },
  { code: "hi", name: "हिन्दी", englishName: "Hindi", flag: "🇮🇳" },
  { code: "hmn", name: "Hmong", englishName: "Hmong", flag: "🌐" },
  { code: "hr", name: "Hrvatski", englishName: "Croatian", flag: "🇭🇷" },
  { code: "ht", name: "Kreyòl ayisyen", englishName: "Haitian Creole", flag: "🇭🇹" },
  { code: "hu", name: "Magyar", englishName: "Hungarian", flag: "🇭🇺" },
  { code: "hy", name: "Հայերեն", englishName: "Armenian", flag: "🇦🇲" },
  { code: "id", name: "Bahasa Indonesia", englishName: "Indonesian", flag: "🇮🇩" },
  { code: "ig", name: "Igbo", englishName: "Igbo", flag: "🇳🇬" },
  { code: "ilo", name: "Ilokano", englishName: "Ilocano", flag: "🇵🇭" },
  { code: "is", name: "Íslenska", englishName: "Icelandic", flag: "🇮🇸" },
  { code: "it", name: "Italiano", englishName: "Italian", flag: "🇮🇹" },
  { code: "iw", name: "עברית", englishName: "Hebrew", flag: "🇮🇱" },
  { code: "ja", name: "日本語", englishName: "Japanese", flag: "🇯🇵" },
  { code: "jv", name: "Basa Jawa", englishName: "Javanese", flag: "🇮🇩" },
  { code: "ka", name: "ქართული", englishName: "Georgian", flag: "🇬🇪" },
  { code: "kk", name: "Қазақша", englishName: "Kazakh", flag: "🇰🇿" },
  { code: "km", name: "ខ្មែរ", englishName: "Khmer", flag: "🇰🇭" },
  { code: "kn", name: "ಕನ್ನಡ", englishName: "Kannada", flag: "🇮🇳" },
  { code: "ko", name: "한국어", englishName: "Korean", flag: "🇰🇷" },
  { code: "kri", name: "Krio", englishName: "Krio", flag: "🇸🇱" },
  { code: "ku", name: "Kurdî", englishName: "Kurdish", flag: "🌐" },
  { code: "ky", name: "Кыргызча", englishName: "Kyrgyz", flag: "🇰🇬" },
  { code: "la", name: "Latina", englishName: "Latin", flag: "🏛️" },
  { code: "lb", name: "Lëtzebuergesch", englishName: "Luxembourgish", flag: "🇱🇺" },
  { code: "lg", name: "Luganda", englishName: "Luganda", flag: "🇺🇬" },
  { code: "ln", name: "Lingála", englishName: "Lingala", flag: "🇨🇩" },
  { code: "lo", name: "ລາວ", englishName: "Lao", flag: "🇱🇦" },
  { code: "lt", name: "Lietuvių", englishName: "Lithuanian", flag: "🇱🇹" },
  { code: "lus", name: "Mizo tawng", englishName: "Mizo", flag: "🇮🇳" },
  { code: "lv", name: "Latviešu", englishName: "Latvian", flag: "🇱🇻" },
  { code: "mai", name: "मैथिली", englishName: "Maithili", flag: "🇮🇳" },
  { code: "mg", name: "Malagasy", englishName: "Malagasy", flag: "🇲🇬" },
  { code: "mi", name: "Te Reo Māori", englishName: "Maori", flag: "🇳🇿" },
  { code: "mk", name: "Македонски", englishName: "Macedonian", flag: "🇲🇰" },
  { code: "ml", name: "മലയാളം", englishName: "Malayalam", flag: "🇮🇳" },
  { code: "mn", name: "Монгол", englishName: "Mongolian", flag: "🇲🇳" },
  { code: "mni-Mtei", name: "ꯃꯩꯇꯩꯂꯣꯟ", englishName: "Meitei", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", englishName: "Marathi", flag: "🇮🇳" },
  { code: "ms", name: "Bahasa Melayu", englishName: "Malay", flag: "🇲🇾" },
  { code: "mt", name: "Malti", englishName: "Maltese", flag: "🇲🇹" },
  { code: "my", name: "မြန်မာ", englishName: "Burmese", flag: "🇲🇲" },
  { code: "ne", name: "नेपाली", englishName: "Nepali", flag: "🇳🇵" },
  { code: "nl", name: "Nederlands", englishName: "Dutch", flag: "🇳🇱" },
  { code: "no", name: "Norsk", englishName: "Norwegian", flag: "🇳🇴" },
  { code: "nso", name: "Sepedi", englishName: "Sepedi", flag: "🇿🇦" },
  { code: "ny", name: "Chichewa", englishName: "Chichewa", flag: "🇲🇼" },
  { code: "om", name: "Oromoo", englishName: "Oromo", flag: "🇪🇹" },
  { code: "or", name: "ଓଡ଼ିଆ", englishName: "Odia", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", englishName: "Punjabi", flag: "🇮🇳" },
  { code: "pl", name: "Polski", englishName: "Polish", flag: "🇵🇱" },
  { code: "ps", name: "پښتو", englishName: "Pashto", flag: "🇦🇫" },
  { code: "pt", name: "Português", englishName: "Portuguese", flag: "🇧🇷" },
  { code: "qu", name: "Runasimi", englishName: "Quechua", flag: "🇵🇪" },
  { code: "ro", name: "Română", englishName: "Romanian", flag: "🇷🇴" },
  { code: "ru", name: "Русский", englishName: "Russian", flag: "🇷🇺" },
  { code: "rw", name: "Kinyarwanda", englishName: "Kinyarwanda", flag: "🇷🇼" },
  { code: "sa", name: "संस्कृतम्", englishName: "Sanskrit", flag: "🇮🇳" },
  { code: "sd", name: "سنڌي", englishName: "Sindhi", flag: "🇵🇰" },
  { code: "si", name: "සිංහල", englishName: "Sinhala", flag: "🇱🇰" },
  { code: "sk", name: "Slovenčina", englishName: "Slovak", flag: "🇸🇰" },
  { code: "sl", name: "Slovenščina", englishName: "Slovenian", flag: "🇸🇮" },
  { code: "sm", name: "Gagana Samoa", englishName: "Samoan", flag: "🇼🇸" },
  { code: "sn", name: "ChiShona", englishName: "Shona", flag: "🇿🇼" },
  { code: "so", name: "Soomaali", englishName: "Somali", flag: "🇸🇴" },
  { code: "sq", name: "Shqip", englishName: "Albanian", flag: "🇦🇱" },
  { code: "sr", name: "Српски", englishName: "Serbian", flag: "🇷🇸" },
  { code: "st", name: "Sesotho", englishName: "Sesotho", flag: "🇱🇸" },
  { code: "su", name: "Basa Sunda", englishName: "Sundanese", flag: "🇮🇩" },
  { code: "sv", name: "Svenska", englishName: "Swedish", flag: "🇸🇪" },
  { code: "sw", name: "Kiswahili", englishName: "Swahili", flag: "🇰🇪" },
  { code: "ta", name: "தமிழ்", englishName: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", englishName: "Telugu", flag: "🇮🇳" },
  { code: "tg", name: "Тоҷикӣ", englishName: "Tajik", flag: "🇹🇯" },
  { code: "th", name: "ไทย", englishName: "Thai", flag: "🇹🇭" },
  { code: "ti", name: "ትግርኛ", englishName: "Tigrinya", flag: "🇪🇷" },
  { code: "tk", name: "Türkmen", englishName: "Turkmen", flag: "🇹🇲" },
  { code: "tl", name: "Filipino", englishName: "Filipino", flag: "🇵🇭" },
  { code: "tr", name: "Türkçe", englishName: "Turkish", flag: "🇹🇷" },
  { code: "ts", name: "Xitsonga", englishName: "Tsonga", flag: "🇿🇦" },
  { code: "tt", name: "Татар", englishName: "Tatar", flag: "🇷🇺" },
  { code: "ug", name: "ئۇيغۇرچە", englishName: "Uyghur", flag: "🇨🇳" },
  { code: "uk", name: "Українська", englishName: "Ukrainian", flag: "🇺🇦" },
  { code: "ur", name: "اردو", englishName: "Urdu", flag: "🇵🇰" },
  { code: "uz", name: "Oʻzbekcha", englishName: "Uzbek", flag: "🇺🇿" },
  { code: "vi", name: "Tiếng Việt", englishName: "Vietnamese", flag: "🇻🇳" },
  { code: "xh", name: "isiXhosa", englishName: "Xhosa", flag: "🇿🇦" },
  { code: "yi", name: "ייִדיש", englishName: "Yiddish", flag: "🌐" },
  { code: "yo", name: "Yorùbá", englishName: "Yoruba", flag: "🇳🇬" },
  { code: "zh-CN", name: "中文 (简体)", englishName: "Chinese Simplified", flag: "🇨🇳" },
  { code: "zh-TW", name: "中文 (繁體)", englishName: "Chinese Traditional", flag: "🇹🇼" },
  { code: "zu", name: "isiZulu", englishName: "Zulu", flag: "🇿🇦" },
];

function translatePage(langCode: string) {
  if (langCode === "es") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.vercel.app";
    localStorage.removeItem("selectedLang");
    window.location.reload();
    return;
  }

  localStorage.setItem("selectedLang", langCode);

  const value = `/es/${langCode}`;
  document.cookie = `googtrans=${value}; path=/;`;
  document.cookie = `googtrans=${value}; path=/; domain=.vercel.app`;

  const existing = document.getElementById("google-translate-script");
  if (existing) {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      return;
    }
  }

  window.location.reload();
}

export default function LanguageSelector({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Detect current language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedLang");
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setCurrentLang(found);
    }
  }, []);

  // Load Google Translate on mount if a non-Spanish language is saved
  useEffect(() => {
    const saved = localStorage.getItem("selectedLang");
    if (saved && saved !== "es") {
      const value = `/es/${saved}`;
      document.cookie = `googtrans=${value}; path=/;`;

      let container = document.getElementById("google_translate_element");
      if (!container) {
        container = document.createElement("div");
        container.id = "google_translate_element";
        container.style.position = "absolute";
        container.style.top = "-9999px";
        container.style.left = "-9999px";
        document.body.appendChild(container);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).googleTranslateInit = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "es", autoDisplay: false },
          "google_translate_element"
        );
      };

      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  // Auto-focus search input when dropdown opens; clear on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

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

  // Filtered language list based on search query
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return LANGUAGES;
    const q = searchQuery.toLowerCase().trim();
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.englishName.toLowerCase().includes(q) ||
        l.code.toLowerCase() === q
    );
  }, [searchQuery]);

  const handleSelect = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
    translatePage(lang.code);
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
            : "bg-brown-dark hover:bg-brown text-cream/90 hover:text-cream px-3 py-1.5 rounded-full text-xs tracking-wider border border-transparent hover:border-tan/30 transition-colors"
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
          className={`absolute z-[9999] bg-brown-dark/95 backdrop-blur-md border border-tan/20 rounded-xl shadow-2xl overflow-hidden flex flex-col ${
            isMobile
              ? "left-0 right-0 mt-2"
              : "right-0 mt-2 w-64"
          }`}
          style={{ maxHeight: "420px" }}
        >
          {/* Header */}
          <div className="px-3 py-2.5 border-b border-cream/10 flex-shrink-0">
            <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase">
              Selecciona tu idioma
            </p>
          </div>

          {/* Search input */}
          <div className="px-3 py-2 border-b border-cream/10 flex-shrink-0">
            <div className="flex items-center gap-2 bg-white/5 border border-cream/10 rounded-lg px-2.5 py-1.5 focus-within:border-tan/50 transition-colors">
              <svg className="w-3.5 h-3.5 text-cream/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar idioma..."
                className="bg-transparent text-cream/80 text-xs placeholder-cream/25 outline-none w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-cream/30 hover:text-cream/60 flex-shrink-0 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Language list */}
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {filteredLanguages.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-cream/30 text-xs">Sin resultados para &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150 ${
                    currentLang.code === lang.code
                      ? "bg-tan/20 text-tan-light"
                      : "text-cream/70 hover:bg-white/5 hover:text-cream"
                  }`}
                >
                  <span className="text-base leading-none flex-shrink-0 w-6 text-center">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm block truncate">{lang.name}</span>
                    {lang.name !== lang.englishName && (
                      <span className="text-[10px] text-cream/30 block truncate">{lang.englishName}</span>
                    )}
                  </div>
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
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-cream/10 flex-shrink-0">
            <p className="text-cream/25 text-[10px] text-center">
              {LANGUAGES.length} idiomas disponibles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
