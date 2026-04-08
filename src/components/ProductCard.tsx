"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  images?: string[];
  type: "shoe" | "sandal";
  category: string;
  kickstarterUrl?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const isSandal = product.type === "sandal";
  const images = product.images && product.images.length > 0 ? product.images : [];
  const hasImages = images.length > 0;
  const [currentImage, setCurrentImage] = useState(0);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        {hasImages ? (
          <>
            {/* Real product image */}
            <Image
              src={images[currentImage]}
              alt={`${product.name} - vista ${currentImage + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Carousel controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <svg className="w-4 h-4 text-brown-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <svg className="w-4 h-4 text-brown-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImage(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImage
                          ? "bg-tan w-4"
                          : "bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* Placeholder for products without images */
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
                Próximamente
              </p>
            </div>
          </div>
        )}

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
