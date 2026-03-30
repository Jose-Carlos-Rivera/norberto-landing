import content from "@/content/site-content.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-dark text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-tan-light mb-4">
              {content.brand.name}
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed mb-4">
              {content.brand.tagline}
            </p>
            <p className="text-cream/40 text-xs">
              {content.brand.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-tan-light text-sm tracking-widest uppercase mb-4">
              Enlaces
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#productos" className="text-cream/60 hover:text-tan-light transition-colors text-sm">
                  Colección
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-cream/60 hover:text-tan-light transition-colors text-sm">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-cream/60 hover:text-tan-light transition-colors text-sm">
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href={content.kickstarter.campaignUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 hover:text-tan-light transition-colors text-sm"
                >
                  Kickstarter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-tan-light text-sm tracking-widest uppercase mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-cream/60 text-sm">
              <li>
                <a href={`mailto:${content.contact.email}`} className="hover:text-tan-light transition-colors">
                  {content.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${content.contact.phone.replace(/\s/g, "")}`} className="hover:text-tan-light transition-colors">
                  {content.contact.phone}
                </a>
              </li>
              <li>{content.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Legal divider */}
        <div className="border-t border-brown-light/20 mt-10 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-cream/40 text-xs">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-cream/60 mb-1">
                {content.legal.companyName}
              </p>
              <p>{content.legal.legalType}</p>
              {content.legal.rfc && <p>RFC: {content.legal.rfc}</p>}
              <p>{content.legal.address}</p>
            </div>
            <div className="text-center sm:text-right">
              <p>&copy; {currentYear} {content.brand.name}. Todos los derechos reservados.</p>
              <p className="mt-1">
                Desarrollado por{" "}
                <a
                  href="https://bolt.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tan/60 hover:text-tan transition-colors"
                >
                  Bolt.dev
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
