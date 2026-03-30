import content from "@/content/site-content.json";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="productos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-tan text-sm tracking-[0.3em] uppercase mb-3">
            Nuestra Colección
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brown-dark mb-4">
            Hecho a Mano, Hecho con Alma
          </h2>
          <div className="w-20 h-0.5 bg-tan mx-auto mb-6" />
          <p className="text-brown-light text-base sm:text-lg max-w-2xl mx-auto">
            Cada par es una obra maestra artesanal. Dos líneas, una misma
            pasión por la excelencia.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product as Parameters<typeof ProductCard>[0]["product"]}
            />
          ))}
        </div>

        {/* Kickstarter CTA */}
        <div className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-brown-dark to-brown rounded-lg p-8 sm:p-12">
          <p className="text-tan-light text-sm tracking-[0.3em] uppercase mb-3">
            {content.kickstarter.badge}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-4">
            Apoya nuestras sandalias en Kickstarter
          </h3>
          <p className="text-cream/70 max-w-xl mx-auto mb-6 text-sm sm:text-base">
            Sé parte de los primeros en tener nuestras sandalias artesanales.
            Tu apoyo hace posible llevar la artesanía mexicana al mundo.
          </p>
          <a
            href={content.kickstarter.campaignUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold hover:bg-gold-light text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors rounded-sm"
          >
            Ir a Kickstarter &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
