"use client";

import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  type: "shoe" | "sandal";
  category: string;
  kickstarterUrl?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const isSandal = product.type === "sandal";

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        {/* Placeholder image with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brown-light/20 to-tan/20 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-tan/40 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-brown-light/50 text-xs uppercase tracking-wider">
              {product.category}
            </p>
          </div>
        </div>

        {/* Badge */}
        {isSandal && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Kickstarter
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/40 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {isSandal ? (
              <a
                href={product.kickstarterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold-light text-white px-6 py-3 text-xs tracking-widest uppercase rounded-sm transition-colors"
              >
                Apoyar en Kickstarter
              </a>
            ) : (
              <Link
                href={`/cart?product=${product.id}`}
                className="bg-tan hover:bg-tan-dark text-white px-6 py-3 text-xs tracking-widest uppercase rounded-sm transition-colors"
              >
                Agregar al Carrito
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <p className="text-tan text-xs tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-brown-dark mb-2">
          {product.name}
        </h3>
        <p className="text-brown-light text-sm leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream-dark">
          <span className="font-serif text-xl sm:text-2xl font-bold text-brown-dark">
            {formatPrice(product.price, product.currency)}
          </span>
          {isSandal ? (
            <a
              href={product.kickstarterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-white px-4 py-2 text-xs tracking-widest uppercase rounded-sm transition-colors"
            >
              Kickstarter
            </a>
          ) : (
            <Link
              href={`/cart?product=${product.id}`}
              className="bg-tan hover:bg-tan-dark text-white px-4 py-2 text-xs tracking-widest uppercase rounded-sm transition-colors"
            >
              Comprar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
