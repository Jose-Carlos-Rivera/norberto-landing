import Image from "next/image";
import content from "@/content/site-content.json";

export default function About() {
  return (
    <section id="nosotros" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Workshop image */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-brown/10 to-tan/10 rounded-lg overflow-hidden">
            <Image
              src={content.about.workshopImage}
              alt="Taller artesanal - 611 Design"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text content */}
          <div>
            <p className="text-tan text-sm tracking-[0.3em] uppercase mb-3">
              Nuestra Historia
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-dark mb-6">
              Tradición Artesanal Mexicana
            </h2>
            <div className="w-16 h-0.5 bg-tan mb-8" />
            <p className="text-brown-light leading-relaxed mb-6">
              {content.brand.description}
            </p>
            <p className="text-brown-light leading-relaxed mb-8">
              Cada par de zapatos y sandalias es cuidadosamente elaborado por
              manos artesanas que preservan técnicas heredadas por generaciones.
              Trabajamos con pieles de ternera, cocodrilo y materiales de la más
              alta calidad. Nuestras suelas combinan tecnología de bota militar
              con materiales reciclados: resistentes, ligeras y responsables.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-tan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brown-dark text-sm">100% Piel</h4>
                  <p className="text-brown-light text-xs">Materiales premium seleccionados</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-tan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brown-dark text-sm">Hecho a Mano</h4>
                  <p className="text-brown-light text-xs">Artesanía mexicana tradicional</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-tan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brown-dark text-sm">Envío Global</h4>
                  <p className="text-brown-light text-xs">Desde México al mundo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-tan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brown-dark text-sm">Diseño Único</h4>
                  <p className="text-brown-light text-xs">Contemporáneo con raíces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
