import content from "@/content/site-content.json";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient - will be replaced with image when available */}
      <div className="absolute inset-0 bg-gradient-to-br from-brown-dark via-brown to-tan-dark" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(201,169,110,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(201,169,110,0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-tan-light/90 text-sm sm:text-base tracking-[0.3em] uppercase mb-4 sm:mb-6 animate-fade-in-up">
          {content.brand.tagline}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-cream mb-4 sm:mb-6 leading-tight animate-fade-in-up animate-delay-100">
          {content.hero.headline}
        </h1>
        <p className="text-cream/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up animate-delay-200">
          {content.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <a
            href="#productos"
            className="inline-block bg-tan hover:bg-tan-dark text-white px-8 py-3 sm:py-4 text-sm tracking-widest uppercase transition-all duration-300 rounded-sm"
          >
            {content.hero.ctaText}
          </a>
          <a
            href={content.kickstarter.campaignUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-tan-light text-tan-light hover:bg-tan-light hover:text-brown-dark px-8 py-3 sm:py-4 text-sm tracking-widest uppercase transition-all duration-300 rounded-sm"
          >
            {content.kickstarter.ctaText}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <svg
          className="w-6 h-6 text-tan-light/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
